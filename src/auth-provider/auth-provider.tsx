import { OidcProvider } from '@axa-fr/react-oidc'
import type { PropsWithChildren } from 'react'
import AuthError from './auth-error'
import AuthExpired from './auth-expired'
import AuthSuccess from './auth-success'
import config from './config'
import AuthListener from './auth-listener'

function AuthProvider({ children }: PropsWithChildren) {
  return (
    <OidcProvider
      configuration={config}
      loadingComponent={() => <span>Loading...</span>}
      authenticatingComponent={() => <span>Authenticating...</span>}
      callbackSuccessComponent={AuthSuccess}
      authenticatingErrorComponent={AuthError}
      sessionLostComponent={AuthExpired}
    >
      <AuthListener />
      {children}
    </OidcProvider>
  )
}

export default AuthProvider
