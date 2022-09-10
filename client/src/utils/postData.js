import ApiCallError from "./apiCallError"

const postData = (domain) => {
    return async function (path, payload){
        try{
            const settings = {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  },
                  withCredentials: true,
                  method: 'POST',
                  body: JSON.stringify(payload)
            }

            const response = await fetch(`${domain}${path}`, settings)
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

export default postData('http://localhost:3500/')