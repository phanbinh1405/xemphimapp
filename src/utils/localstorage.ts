import { UserData } from '../constants/types/userType'

export const LocalStorageEventTarget = new EventTarget()

export const setAccessTokenToLS = (session_id: string) => {
  localStorage.setItem('access_token', session_id)
}

export const clearLS = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('profile')
  const clearLSEvent = new Event('clearLS')
  LocalStorageEventTarget.dispatchEvent(clearLSEvent)
}

export const getAccessTokenFromLS = () => localStorage.getItem('access_token') || ''

export const getProfileFromLS = () => {
  const result = localStorage.getItem('profile')
  return result ? JSON.parse(result) : null
}

export const setProfileToLS = (profile: UserData) => {
  localStorage.setItem('profile', JSON.stringify(profile))
}
