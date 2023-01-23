import LocalStorageKeys from '../constants/localStorageKeys'

export const isLocalStorageAccess = () => {
  try {
    return !!(window && window.localStorage)
  } catch (error) {
    return false
  }
}

export const getToken = () => {
  // @ts-ignore
  return (
    isLocalStorageAccess() && JSON.parse(window.localStorage.getItem(LocalStorageKeys.LOCAL_STORAGE_USER_DATA) || '')
  )
}

export const setGetToken = (data: any) => {
  isLocalStorageAccess() && window.localStorage.setItem(LocalStorageKeys.LOCAL_STORAGE_USER_DATA, JSON.stringify(data))
}

export const clearTokenLocalStorage = () => {
  // @ts-ignore
  isLocalStorageAccess() && window.localStorage.clear(LocalStorageKeys.LOCAL_STORAGE_USER_DATA)
}
