import * as core from '@actions/core'
import { resolve } from './resolver.js'

async function run() {
  try {
    const url = core.getInput('github_base_url', {required: true});
    const result = resolve(url);

    core.info(`Provided URL: ${url}`);
    setOutput('github_type', result.type);
    setOutput('base_url', result.base_url);
    setOutput('api_url', result.api_url);
    setOutput('terraform_api_url', result.terraform_api_url);
    setOutput('container_registry_url', result.container_registry_url);
  } catch (err: any) {
    core.setFailed(err);
  }
}
run();

function setOutput(name: string, value: string) {
  core.info(`  ${name}: ${value}`);
  core.setOutput(name, value);
}