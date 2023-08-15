import { useOidc } from '@axa-fr/react-oidc'
import noop from 'lodash.noop'

function AuthError() {
  const { login } = useOidc()
  const handleSignIn = () => {
    login().then(noop).catch(noop)
  }

  return (
    <div>
      <h3>Authentication error</h3>
      <div>There was an issue with the authentication process. Please try again.</div>
      <button onClick={handleSignIn}>Sign in</button>
    </div>
  )
}

export default AuthError
