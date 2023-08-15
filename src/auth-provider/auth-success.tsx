import { useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'

function AuthSuccess() {
  const { search } = useLocation()

  useEffect(() => {
    // Notify other tabs of successful sign in
    window.localStorage.setItem('signIn', 'trigger')
    window.localStorage.removeItem('signIn')

    // Force redirect after 3s
    const redirectTimeout = setTimeout(() => {
      window.location.href = '/'
    }, 3000)

    return () => {
      clearTimeout(redirectTimeout)
    }
  }, [])

  return (
    <div>
      <h3>Authentication successful</h3>
      <div>You will be redirected shortly.</div>
    </div>
  )
}

export default AuthSuccess
