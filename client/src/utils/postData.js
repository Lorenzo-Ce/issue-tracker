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

            if(!response.ok){
                throw Error(response.status)
            }
            const data = await response.json()
            return data
        }catch(error){
            console.error('Error', error)
        }
    }
}

export default postData('http://localhost:3500/')