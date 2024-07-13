const core = require('@actions/core')


async function run() {
    try {
        const instanceUrl = new URL(process.env.instance_url);
        
        let baseUrl, apiUrl, type;
        if (instanceUrl.hostname === 'github.com') {
            // We are on dotcom, but could be an EMU or standard dotcom
            baseUrl = 'https://github.com';
            apiUrl = 'https://api.github.com';

            if (instanceUrl.pathname?.startsWith('/enterprises/')) {
                type = 'emu';
            } else {
                type = 'dotcom';
            }
        } else if (instanceUrl.hostname.endsWith('ghe.com')) {
            // We have a Proxima tenant
            type = 'proxima';
            baseUrl = `https://${instanceUrl.hostname}`;
            apiUrl = `https://api.${instanceUrl.hostname}`;
        } else {
            // We have a GHES instance
            type = 'ghes';
            baseUrl = `https://${instanceUrl.hostname}`;
            apiUrl = `https://api.${instanceUrl.hostname}`;
        }

        core.info(`Provided URL: ${process.env.instance_url}`);
        core.info(`  github_type:   ${type}`);
        core.info(`  base_url:      ${baseUrl}`);
        core.info(`  api_url:       ${apiUrl}`);

        core.setOutput(`github_type`, type);
        core.setOutput(`base_url`, baseUrl);
        core.setOutput(`api_url`, apiUrl);
    } catch (err) {
        core.setFailed(err);
    }
}
run();