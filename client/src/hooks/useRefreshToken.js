import axios from '../utils/axios'
import { setGetHeader } from '../utils/requestMethods'
import { useAuthorization } from './useAuthorization'

function useRefreshToken() {
    const { authorization, setAuthorization } = useAuthorization()
    const refreshAccessToken = async () => { 

      
      const logReq = axios.interceptors.request.use(function (config) {
        console.log(config)
        return config;
      }, function (error) {
        return Promise.reject(error);
      });


      try{
        const response = await axios.get('refresh', 
          { 
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json' },
            withCredentials: true
          }
        )
        const accessToken = response?.data?.accessToken
        setAuthorization(prevAuth => ({...prevAuth, accessToken}))
        return accessToken
      }catch(err){
        console.log(err)
      }
      finally{
        axios.interceptors.request.eject(logReq)
      }
    }
  
  return {refreshAccessToken}
}

export default useRefreshToken