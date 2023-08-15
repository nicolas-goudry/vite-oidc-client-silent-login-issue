import { useEffect } from 'react'

function AuthExpired() {
  useEffect(() => {
    // Force redirect after 5s
    const timeout = setTimeout(() => {
      window.location.href = window.location.origin
    }, 5000)

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  return (
    <div>
      <h3>Your session has expired</h3>
      <div>You will be redirected shortly.</div>
    </div>
  )
}

export default AuthExpired
