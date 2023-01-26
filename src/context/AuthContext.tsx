import { useRouter } from 'next/router'
import { createContext, ReactNode, useEffect, useState } from 'react'
import { UserData } from '../constants/types/userType'
import axiosInstance from '../utils/fetchWithTimeOut'
import { getProfileFromLS, getAccessTokenFromLS, setAccessTokenToLS, clearLS } from '../utils/localstorage'

interface AuthContextInterface {
  profile: UserData | null
  isAuthenticated: boolean
  reset: () => void
}

export const getInitAuthContext: () => AuthContextInterface = () => ({
  profile: getProfileFromLS(),
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  reset: () => null,
})

// export const initAuthContext =
//   typeof window !== 'undefined'
//     ? getInitAuthContext()
//     : {
//         profile: null,
//         isAuthenticated: false,
//         reset: () => null,
//       }

export const AuthContext = createContext<AuthContextInterface>({
  profile: null,
  isAuthenticated: false,
  reset: () => null,
})

function AuthContextProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [initAuthContext, setAuth] = useState<AuthContextInterface>({
    profile: null,
    isAuthenticated: false,
    reset: () => null,
  })
  const [profile, setProfile] = useState<UserData | null>(initAuthContext.profile)
  const [isAuthenticated, setAuthenticated] = useState(initAuthContext.isAuthenticated)
  const [sessionId, setSessionId] = useState('')
  const [requestToken, setRequestToken] = useState<any>('')

  const { request_token, approved } = router?.query

  useEffect(() => {
    const initAuthContext = getInitAuthContext()
    const session = getAccessTokenFromLS()
    setAuth(initAuthContext)
    setSessionId(session)
    setAuthenticated(initAuthContext.isAuthenticated)
  }, [])

  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await axiosInstance(`account?session_id=${sessionId}`)

        if (res.status === 200) {
          setProfile(res.data)
        }
      } catch (err) {
        console.error(err)
      }
    }

    getProfile()
  }, [sessionId])

  useEffect(() => {
    setRequestToken(request_token)
  }, [request_token])

  useEffect(() => {
    async function getSessionId() {
      try {
        const formData = new FormData()
        if (!isAuthenticated && (!requestToken || approved !== 'true')) return

        formData.append('request_token', requestToken)
        const response = await axiosInstance('authentication/session/new', {
          method: 'post',
          data: formData,
        })
        setAccessTokenToLS(response.data.session_id)
        setAuthenticated(true)
        setSessionId(response.data.session_id)
      } catch (error) {
        console.error(error)
      }
    }
    getSessionId()
  }, [requestToken, approved, isAuthenticated])

  const reset = () => {
    setProfile(null)
    clearLS()
    setSessionId('')
    setRequestToken('')
    setAuthenticated(false)
  }

  return <AuthContext.Provider value={{ profile, isAuthenticated, reset }}>{children}</AuthContext.Provider>
}

export default AuthContextProvider
