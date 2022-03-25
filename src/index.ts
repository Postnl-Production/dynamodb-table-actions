import * as core from '@actions/core';
import { QueryCommand } from "@aws-sdk/client-dynamodb";
import { ddbDocClient } from "./ddbDocClient";
import { unmarshall } from "@aws-sdk/util-dynamodb";

export const params = {
    region: core.getInput('region'),
    table: core.getInput('table'),
    input: core.getInput('input'),
    action: core.getInput('action'),
    resultSelector: core.getInput('result-selector'),
}

export const REGION = params.region;

export const run = async () => {
    try {
        const data = await ddbDocClient.send(new QueryCommand({
          ...JSON.parse(params.input),
          TableName: params.table,
        }));
        const items = data.Items!.map((record) => unmarshall(record));
        if (!params.resultSelector) {
          console.log(items)
          core.setOutput("output", items);
        } else {
          const itemList: string[] = [];
          items.forEach(function (element) {
              console.log(JSON.stringify(element));
              Object.keys(element).forEach( (key: string) => { 
                if ( key == params.resultSelector) {
                  itemList.push(element[key]);
                }
              } )
            });
            console.log(itemList)
            core.setOutput("output", itemList)
          }
        } catch (err) {
            console.error(err);
          }
        };
run();

