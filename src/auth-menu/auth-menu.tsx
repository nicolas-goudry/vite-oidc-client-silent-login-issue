import { OidcUserStatus, useOidc, useOidcUser } from '@axa-fr/react-oidc'
import type { ReactNode } from 'react'
import { useEffect } from 'react'
import noop from 'lodash.noop'

function AuthMenu() {
  const { isAuthenticated, login, logout } = useOidc()
  const { oidcUser, oidcUserLoadingState, reloadOidcUser } = useOidcUser()
  let renderAvatar = (): ReactNode | string => <span>ANON</span>
  const handleSignIn = () => {
    login().then(noop).catch(noop)
  }

  const handleSignOut = () => {
    logout().then(noop).catch(noop)
  }

  //useEffect(() => {
  //  if (isAuthenticated && !oidcUser && oidcUserLoadingState !== OidcUserStatus.Loading) {
  //    reloadOidcUser()
  //  }
  //}, [isAuthenticated, oidcUser, reloadOidcUser, oidcUserLoadingState])

  if (oidcUserLoadingState === OidcUserStatus.Loading || oidcUserLoadingState === OidcUserStatus.LoadingError) {
    return null
  }

  if (isAuthenticated && oidcUser) {
    const matchInitials = oidcUser.name?.matchAll(/\b\w/g)

    if (matchInitials) {
      const initialsArray = [...matchInitials]

      renderAvatar = () => ((initialsArray.shift()?.[0] ?? '') + (initialsArray.pop()?.[0] ?? '')).toUpperCase()
    }
  }

  return (
    <div>
      {isAuthenticated && <div>User initials : {renderAvatar()}</div>}
      {!isAuthenticated && <button onClick={handleSignIn}>Sign in</button>}
      {isAuthenticated && <button onClick={handleSignOut}>Sign out</button>}
    </div>
  )
}

export default AuthMenu
