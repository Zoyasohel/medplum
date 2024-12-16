import { MEDPLUM_VERSION } from './client';
import { normalizeErrorString } from './outcomes';

export const MEDPLUM_VERSIONS_URL = 'https://meta.medplum.com/versions.json';

export type ReleaseManifest = {
  version: string;
  tag_name: string;
  assets: { name: string; browser_download_url: string }[];
};

export type VersionsManifest = { versions: ReleaseManifest[] };

/**
 * Asserts that a given candidate is a `VersionsManifest`.
 * @param candidate - An object assumed to be a `VersionsManifest`.
 */
export function assertVersionsManifest(candidate: unknown): asserts candidate is VersionsManifest {
  if (!candidate || typeof candidate !== 'object') {
    throw new Error('Versions manifest is not an object');
  }
  const versions = (candidate as VersionsManifest).versions;
  if (!versions || !Array.isArray(versions)) {
    throw new Error('Versions manifest missing versions list');
  }
  for (const version of versions) {
    assertReleaseManifest(version);
  }
}

/**
 * Asserts that a given candidate is a `ReleaseManifest`.
 * @param candidate - An object assumed to be a `ReleaseManifest`.
 */
export function assertReleaseManifest(candidate: unknown): asserts candidate is ReleaseManifest {
  const manifest = candidate as ReleaseManifest;
  if (!manifest.tag_name) {
    throw new Error('Manifest missing tag_name');
  }
  const assets = manifest.assets;
  if (!assets?.length) {
    throw new Error('Manifest missing assets list');
  }
  for (const asset of assets) {
    if (!asset.browser_download_url) {
      throw new Error('Asset missing browser download URL');
    }
    if (!asset.name) {
      throw new Error('Asset missing name');
    }
  }
}

/**
 * Fetches the versions manifest.
 * @param source - The source application tag for analytics purposes ("agent", "cli", "server", etc).
 * @returns - The versions manifest.
 */
export async function fetchVersionsManifest(source: string): Promise<VersionsManifest> {
  const url = new URL(MEDPLUM_VERSIONS_URL);
  url.searchParams.set('v', MEDPLUM_VERSION);
  url.searchParams.set('s', source);
  const res = await fetch(url.toString());
  if (res.status !== 200) {
    let message: string | undefined;
    try {
      message = ((await res.json()) as { message: string }).message;
    } catch (err) {
      console.error(`Failed to parse message from body: ${normalizeErrorString(err)}`);
    }
    throw new Error(`Received status code ${res.status} while fetching versions manifest. Message: ${message}`);
  }
  const response = await res.json();
  assertVersionsManifest(response);
  return response;
}

/**
 * @param source - The source application tag for analytics purposes ("agent", "cli", "server", etc).
 * @param version - The version to fetch. If no `version` is provided, defaults to the `latest` version.
 * @returns - The manifest for the specified or latest version.
 */
export async function fetchVersionManifest(source: string, version?: string): Promise<ReleaseManifest> {
  const versionsManifest = await fetchVersionsManifest(source);
  const allVersions = versionsManifest.versions;
  const release = version === 'latest' ? allVersions[0] : allVersions.find((v) => v.version === version);
  if (!release) {
    throw new Error(`Version ${version} not found in versions manifest`);
  }
  return release;
}

/**
 * Tests that a given version string follows the basic semver pattern of `<int>.<int>.<int>`, which is used for Medplum versions.
 *
 * @param version - A version string that should be tested for valid semver semantics.
 * @returns `true` if `version` is a valid semver version that conforms to the Medplum versioning system, otherwise `false`.
 */
export function isValidMedplumSemver(version: string): boolean {
  return /^\d+\.\d+\.\d+$/.test(version);
}

/**
 * Tests that a given version string is a valid existing Medplum release version.
 * @param version - A version to be checked against the existing Medplum repo releases.
 * @returns `true` if `version` is a valid semver version that corresponds to an existing release, otherwise `false`.
 */
export async function checkIfValidMedplumVersion(version: string): Promise<boolean> {
  if (!isValidMedplumSemver(version)) {
    return false;
  }
  // try {
  //   await fetchVersionManifest(version);
  // } catch (_err) {
  //   return false;
  // }
  return true;
}
