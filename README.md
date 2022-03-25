# dynamodb-actions
GitHub Action to support DynamoDB operations.

## Requirements
This action assumes you to have AWS Credentials prepared in your workflow. 
You also need access to a DynamoDB table.

## Usage

Required Input Parameters:
- table
- region
- input
- action

The query command input should be like https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Query.html

Optional parameters:
- result-selector key

## Output

The "output" key will contain the output of the DynamoDB action as an array.


