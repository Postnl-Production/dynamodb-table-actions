# public-dynamodb-query-action
GitHub Action to query a DynamoDB table.

## Goal
The goal of this action is to simplify doing Query actions on a Dynamodb Table.
This useful for assisting with reading shared data from your GitHub Actions workloads.

## Requirements
This action assumes you to have AWS Credentials prepared in your workflow. You also need access to a DynamoDB table which is configured with a partition key and a sort key.

## Usage

Required Input Parameters:
- table
- region
- input

The query command input should be like https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Query.html

Optional parameters:
- result selector json { .key }

## Output

Array "items", optionally based on provided the result selector.

The action returns a JSON document with the query result.


