import * as core from '@actions/core';
import { QueryCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

export const input = {
    region: core.getInput('region'),
    table: core.getInput('table'),
    partitionKey: core.getInput('partition-key'),
    sortKey: core.getInput('sort-key'),
    partitionKeyValue: core.getInput('partition-key-value'),
    sortKeyValue: core.getInput('sort-key-value'),
    sortKeyAction: core.getInput('sort-key-action'),
}

export const REGION = input.region;
export const ddbClient = new DynamoDBClient({ region: REGION });

export const params = {
    KeyConditionExpression: `${input.partitionKey} = :p and ${input.sortKeyAction}(${input.sortKey}, :s)`,
    ExpressionAttributeValues: {
      ":p": { S: input.partitionKeyValue },
      ":s": { S: input.sortKeyValue },
    },
    TableName: input.table,
};

export const run = async () => {
    try {
        const data = await ddbClient.send(new QueryCommand(params));
        data.Items!.forEach(function (element) {
            console.log(element);
          });
        } catch (err) {
            console.error(err);
          }
        };
run();

