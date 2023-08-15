import { useOidc } from '@axa-fr/react-oidc'
import noop from 'lodash.noop'
import { useEffect } from 'react'

function AuthListener() {
  const { isAuthenticated, login } = useOidc()

  useEffect(() => {
    function onStorage(event: StorageEvent) {
      // Force reload page if not signed in and received sign in notification
      if (event.key === 'signIn' && event.newValue === 'trigger' && !isAuthenticated) {
        login(undefined, undefined, true).catch(noop)
      }
    }

    window.addEventListener('storage', onStorage)

    return () => {
      window.removeEventListener('storage', onStorage)
    }
  }, [isAuthenticated, login])
  return null
}

export default AuthListener
