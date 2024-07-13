

module.exports.resolve = function (instanceUrl) {

  let parsedUrl;
  try {
    parsedUrl = new URL(instanceUrl);
  } catch (err) {
    throw new Error(`Unable to parse provided URL '${isntanceUrl}'; ${err.message}`);
  }

  const result = {
    type: 'dotcom',
    base_url: 'https://github.com',
    api_url: 'https://api.github.com',
    container_registry_url: 'ghcr.io',
  };

  let baseUrl, apiUrl, type;
    if (instanceUrl.hostname === 'github.com') {
      // We are on dotcom, but could be an EMU or standard dotcom
      if (instanceUrl.pathname?.startsWith('/enterprises/')) {
        type = 'emu';
      }
    } else if (instanceUrl.hostname.endsWith('ghe.com')) {
      // We have a Proxima tenant
      result.type = 'proxima';
      result.base_url = `https://${instanceUrl.hostname}`;
      result.api_url = `https://api.${instanceUrl.hostname}`;
    } else {
      // We have a GHES instance
      type = 'ghes';
      baseUrl = `${}://${instanceUrl.origin}`;
      apiUrl = `https://api.${instanceUrl.hostname}/api/v3`;
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