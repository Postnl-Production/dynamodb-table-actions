import * as core from '@actions/core';
import { QueryCommand } from "@aws-sdk/client-dynamodb";
import { ddbDocClient } from "./ddbDocClient";
import { unmarshall } from "@aws-sdk/util-dynamodb";

export const params = {
    region: core.getInput('region'),
    table: core.getInput('table'),
    input: core.getInput('input'),
    resultSelector: core.getInput('result-selector'),
}

export const REGION = params.region;

export const run = async () => {
    try {
        const data = await ddbDocClient.send(new QueryCommand({
          ...JSON.parse(params.input),
          TableName: params.table,
        }));
        const items = data.Items!.map((record) => unmarshall(record))
        items.forEach(function (element) {
            console.log(JSON.stringify(element));
          });
        } catch (err) {
            console.error(err);
          }
        };
run();

