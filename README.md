# github-url-resolver-action

An action that can resolve the type and associated URLs for a GitHub instance.

## Parameters

* `github_base_url`: The base URL of the GitHub instance to get the type and URLs for

## Outputs

* `github_type`: The type of GitHub instance
* `base_url`: The BASE URL for accessing the instance
* `api_url`: The API URL for the instance
* `terraform_api_url`: The API URL to leverage for terraform github provider to access the APIs
* `container_registry_url`: The URL for the GitHub Container Registry for the instance

## Examples

```
- name: Get Urls
  uses: octodemo-resources/github-url-resolver-action@v1
```

```
- name: Get Urls
  uses: octodemo-resources/github-url-resolver-action@v1
  with:
    github_base_url: 'https://github.com'
```