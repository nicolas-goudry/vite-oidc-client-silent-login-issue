import type { OidcConfiguration } from '@axa-fr/react-oidc'
import { TokenRenewMode } from '@axa-fr/react-oidc'

const OIDC_PROVIDER_CONFIG: OidcConfiguration = {
  authority: import.meta.env.VITE_IDP_URL,
  client_id: import.meta.env.VITE_IDP_CLIENT,
  redirect_uri: `${window.location.origin}/auth-callback`,
  silent_redirect_uri: `${window.location.origin}/auth-silent-callback`,
  scope: 'openid profile email offline_access',
  service_worker_relative_url: '/OidcServiceWorker.js',
  service_worker_only: true,
  token_renew_mode: TokenRenewMode.access_token_invalid,
}

export default OIDC_PROVIDER_CONFIG
