# public-dynamodb-query-action
GitHub Action to query a DynamoDB table.

## Goal
The goal of this action is to simplify doing Query actions on a Dynamodb Table.
This useful for assisting with reading shared data from your GitHub Actions workloads.

## Requirements
This action assumes you to have AWS Credentials prepared in your workflow. You also need access to a DynamoDB table which is configured with a partition key and a sort key.

## Usage

Required Parameters:
- table
- region
- partition-key
- partition-key-value
- sort-key
- sort-key-value
- sort-key-action

The action returns a JSON document with the query result.


