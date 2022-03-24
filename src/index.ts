import * as core from '@actions/core';

async function main() {
    try {
        core.startGroup('Starting...');
    } catch (error) {
        core.setFailed(error.message);
    } finally {
        core.endGroup();
    }
}

main();