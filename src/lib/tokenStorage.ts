export const getAccessToken = ()=>{
    const accessToken =  localStorage.getItem('access_token');
    return accessToken

}

 export const getRefreshToken = () => {
    const refreshToken = localStorage.getItem('refresh_token')
    return refreshToken
}

export const setAccessToken = (token) => {
    localStorage.setItem('access_token',token)
}

export const setRefreshToken=(token) => {
    localStorage.setItem('refresh_token',token)
}