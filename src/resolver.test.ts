import {describe, it, expect} from 'vitest';
import {resolve} from './resolver.js';

describe('#resolve', () => {

  it(`should resolve to dotcom`, () => {
    const result = resolve('https://github.com');

    expect(result.type).toBe('dotcom');
    expect(result.base_url).toBe('https://github.com');
    expect(result.api_url).toBe('https://api.github.com');
    expect(result.terraform_api_url).toBe('https://api.github.com/')
    expect(result.container_registry_url).toBe('https://ghcr.io');
  });

  it(`should resolve proxima tenant`, () => {
    const result = resolve('https://octodemo-staffship.ghe.com');

    expect(result.type).toBe('proxima');
    expect(result.base_url).toBe('https://octodemo-staffship.ghe.com');
    expect(result.api_url).toBe('https://api.octodemo-staffship.ghe.com');
    expect(result.terraform_api_url).toBe('https://api.octodemo-staffship.ghe.com/')
    expect(result.container_registry_url).toBe('https://containers.octodemo-staffship.ghe.com');
  });

  it(`should resolve for an emu enterprise`, () => {
    const result = resolve('https://github.com/enterprises/fabrikam');

    expect(result.type).toBe('emu');
    expect(result.base_url).toBe('https://github.com');
    expect(result.api_url).toBe('https://api.github.com');
    expect(result.terraform_api_url).toBe('https://api.github.com/')
    expect(result.container_registry_url).toBe('https://ghcr.io');
  });

  it(`should resolve fro octodemo.com`, () => {
    const result = resolve('https://octodemo.com');

    expect(result.type).toBe('ghes');
    expect(result.base_url).toBe('https://octodemo.com');
    expect(result.api_url).toBe('https://octodemo.com/api/v3');
    expect(result.terraform_api_url).toBe('https://octodemo.com/api/v3/')
    expect(result.container_registry_url).toBe('https://containers.octodemo.com');
  })
});