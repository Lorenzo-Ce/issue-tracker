import axios from '../utils/axios'
import { useAuthorization } from './useAuthorization'

function useRefreshToken() {
    const { authorization, setAuthorization } = useAuthorization()
    const refreshAccessToken = async () => { 

      try{
        const response = await axios.get('refresh', 
          { 
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json' },
            withCredentials: true
          }
        )
        const accessToken = response?.data?.accessToken
        const username = response?.data?.username
        setAuthorization(prevAuth => ({...prevAuth, accessToken, username}))
        return accessToken
      }catch(err){
        console.error(err)
      }
    }
  
  return {refreshAccessToken}
}

export default useRefreshToken