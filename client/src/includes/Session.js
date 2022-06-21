import Cookies from 'js-cookie'

export const setSession = (ID) => {
  ID = Buffer.from(ID).toString('base64')
  Cookies.set('__session_user', ID, { expires: 365 })
}
export const getSession = () => {
  const ID = Cookies.get('__session_user')
  let session
  try {
    if (ID) {
      session = Buffer.from(ID, 'base64').toString('ascii')
    }
  } catch (error) {
    console.log(error)
  }
  return session
}
export const logOut = () => {
  Cookies.remove('__session_user')
}