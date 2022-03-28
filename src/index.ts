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

(async() => {
  try {
    let result: any[];
    const data = await ddbDocClient.send(new QueryCommand({
      ...JSON.parse(params.input),
      TableName: params.table,
    }));
    result = data.Items!.map((record) => unmarshall(record));
    if (params.resultSelector) {
      const itemList: string[] = [];
      result.forEach(function (element) {
        Object.keys(element).forEach((key: string) => {
          if (key == params.resultSelector) {
            itemList.push(element[key]);
          }
        })
      });
      result = itemList;
    }
    core.setOutput("output", JSON.stringify({ "result": result }))
  } catch (err) {
    console.error(err);
  }
})();

