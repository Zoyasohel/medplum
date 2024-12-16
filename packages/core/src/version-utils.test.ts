import {
  assertReleaseManifest,
  checkIfValidMedplumVersion,
  fetchVersionManifest,
  isValidMedplumSemver,
  ReleaseManifest,
  VersionsManifest,
} from './version-utils';

test('isValidMedplumSemver', () => {
  expect(isValidMedplumSemver('1.2.3')).toStrictEqual(true);
  expect(isValidMedplumSemver('1.2')).toStrictEqual(false);
  expect(isValidMedplumSemver('1.2.-')).toStrictEqual(false);
  expect(isValidMedplumSemver('.2.3')).toStrictEqual(false);
  expect(isValidMedplumSemver('10.256.121212')).toStrictEqual(true);
  expect(isValidMedplumSemver('10.256.121212-alpha')).toStrictEqual(false);
  expect(isValidMedplumSemver('10.256.121212-1012')).toStrictEqual(false);
});

test('assertReleaseManifest', () => {
  expect(() =>
    assertReleaseManifest({
      version: '3.1.6',
      tag_name: 'v3.1.6',
      assets: [{ name: 'medplum-agent-3.1.6-linux', browser_download_url: 'https://example.com' }],
    } satisfies ReleaseManifest)
  ).not.toThrow();
  expect(() =>
    assertReleaseManifest({
      assets: [{ name: 'medplum-agent-3.1.6-linux', browser_download_url: 'https://example.com' }],
    })
  ).toThrow('Manifest missing tag_name');
  expect(() =>
    assertReleaseManifest({
      tag_name: 'v3.1.6',
    })
  ).toThrow('Manifest missing assets');
  expect(() =>
    assertReleaseManifest({
      tag_name: 'v3.1.6',
      assets: [],
    })
  ).toThrow('Manifest missing assets');
  expect(() =>
    assertReleaseManifest({
      tag_name: 'v3.1.6',
      assets: [{ name: 'medplum-agent-3.1.6-linux' }],
    })
  ).toThrow('Asset missing browser download URL');
  expect(() =>
    assertReleaseManifest({
      tag_name: 'v3.1.6',
      assets: [{ browser_download_url: 'https://example.com' }],
    })
  ).toThrow('Asset missing name');
});

describe('checkIfValidMedplumVersion', () => {
  beforeAll(() => {
    globalThis.fetch = jest.fn();
  });

  test('Invalid version format', async () => {
    await expect(checkIfValidMedplumVersion('3.1.6-alpha')).resolves.toStrictEqual(false);
  });

  test('Version not found', async () => {
    const fetchSpy = jest.spyOn(globalThis, 'fetch').mockImplementation(
      jest.fn(async () => {
        return Promise.resolve({
          status: 404,
          json: async () => {
            return { message: 'Not Found' };
          },
        });
      }) as unknown as typeof globalThis.fetch
    );

    await expect(checkIfValidMedplumVersion('3.1.8')).resolves.toStrictEqual(false);
    fetchSpy.mockRestore();
  });

  test('Version not found', async () => {
    const fetchSpy = jest.spyOn(globalThis, 'fetch').mockImplementation(
      jest.fn(async () => {
        return Promise.resolve({
          status: 404,
          json: async () => {
            return { message: 'Not Found' };
          },
        });
      }) as unknown as typeof globalThis.fetch
    );
    await expect(checkIfValidMedplumVersion('3.1.8')).resolves.toStrictEqual(false);
    fetchSpy.mockRestore();
  });

  test('Network error - fetch throws', async () => {
    const fetchSpy = jest.spyOn(globalThis, 'fetch').mockImplementation(
      jest.fn(async () => {
        return Promise.reject(new Error('Network error'));
      })
    );
    await expect(checkIfValidMedplumVersion('3.1.8')).resolves.toStrictEqual(false);
    fetchSpy.mockRestore();
  });
});

describe('fetchVersionManifest', () => {
  test('Without version specified', async () => {
    const manifest = {
      versions: [
        {
          tag_name: 'v3.1.6',
          assets: [
            {
              name: 'medplum-agent-3.1.6-linux',
              browser_download_url: 'https://example.com',
            },
          ],
        },
      ],
    } as VersionsManifest;
    const fetchSpy = jest.spyOn(globalThis, 'fetch').mockImplementation(
      jest.fn(async () => {
        return Promise.resolve({
          status: 200,
          json: async () => {
            return manifest;
          },
        });
      }) as unknown as typeof globalThis.fetch
    );
    await expect(fetchVersionManifest('test')).resolves.toMatchObject<ReleaseManifest>(manifest.versions[0]);
    // Should be called with latest
    expect(fetchSpy).toHaveBeenLastCalledWith('https://meta.medplum.com/versions.json?v=&s=test');
    fetchSpy.mockRestore();
  });

  test('Fetch throws -- Network error', async () => {
    const fetchSpy = jest.spyOn(globalThis, 'fetch').mockImplementation(
      jest.fn(async () => {
        return Promise.reject(new Error('Network request failed'));
      })
    );
    await expect(fetchVersionManifest('3.1.6')).rejects.toThrow('Network request failed');
    fetchSpy.mockRestore();
  });

  test('Version not found', async () => {
    const fetchSpy = jest.spyOn(globalThis, 'fetch').mockImplementation(
      jest.fn(async () => {
        return Promise.resolve({
          status: 404,
          json: async () => {
            return { message: 'Not Found' };
          },
        });
      }) as unknown as typeof globalThis.fetch
    );
    await expect(fetchVersionManifest('3.1.6')).rejects.toThrow(
      'Received status code 404 while fetching versions manifest. Message: Not Found'
    );
    fetchSpy.mockRestore();
  });
});
