import * as core from '@actions/core';

async function main() {
    try {
        core.startGroup('Starting...');
        const input = {
            region: core.getInput('region'),
            table: core.getInput('table'),
            partitionKey: core.getInput('partition-key'),
            sortKey: core.getInput('sort-key'),
            sortKeyAction: core.getInput('sort-key-action'),
        }
        console.log(input)
    } catch (error) {
        core.setFailed('Error!!!');
    } finally {
        core.endGroup();
    }
}

main();