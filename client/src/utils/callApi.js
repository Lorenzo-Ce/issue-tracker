import ApiCallError from './apiCallError'
import { post, get } from './requestMethods'

const BASE_URL = 'http://localhost:3500'

const callApi = (domain, methodSettings) => {
    return async function (path, options = {}){
        try{
            const response = await fetch(`${domain}${path}`, methodSettings(options))
            const responseBody = await response.json()
            if(!response.ok){
                throw new ApiCallError(response, responseBody)
            }
            return {response, responseBody}
        }catch(error){     
            if(error instanceof ApiCallError){
                throw error
            }
            else throw new Error(error)            
        }
    }
}

const postData = callApi(BASE_URL, post)
const getData = callApi(BASE_URL, get)

const refresh = async () => { 
    try{
      const {response, responseBody} = await getData('/refresh')
      return responseBody?.accessToken   
    }catch(err){
      console.log(err)
    }
}

export {postData, getData, refresh, BASE_URL}