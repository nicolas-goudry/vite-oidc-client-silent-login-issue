import { useEffect } from 'react'

function AuthCallback() {
  useEffect(() => {
    // Force redirect after 3s
    const timeout = setTimeout(() => {
      window.location.href = window.location.origin
    }, 3000)

    return () => {
      clearTimeout(timeout)
    }
  })

  return <span>Auth success, will redirect in a bit...</span>
}

export default AuthCallback
