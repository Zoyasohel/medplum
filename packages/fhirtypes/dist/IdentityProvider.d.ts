/*
 * This is a generated file
 * Do not edit manually.
 */

/**
 * External Identity Provider (IdP) configuration details.
 */
export interface IdentityProvider {

  /**
   * Remote URL for the external Identity Provider authorize endpoint.
   */
  authorizeUrl: string;

  /**
   * Remote URL for the external Identity Provider token endpoint.
   */
  tokenUrl: string;

  /**
   * Client Authentication method used by Clients to authenticate to the
   * Authorization Server when using the Token Endpoint. If no method is
   * registered, the default method is client_secret_basic.
   */
  tokenAuthMethod?: 'client_secret_basic' | 'client_secret_post';

  /**
   * Remote URL for the external Identity Provider userinfo endpoint.
   */
  userInfoUrl: string;

  /**
   * External Identity Provider client ID.
   */
  clientId: string;

  /**
   * External Identity Provider client secret.
   */
  clientSecret: string;

  /**
   * Optional flag to use PKCE in the token request.
   */
  usePkce?: boolean;

  /**
   * Optional flag to use the subject field instead of the email field.
   */
  useSubject?: boolean;
}
