const setPostHeader = ({token = ''} = {}) => ({
        headers: {
            'Authorization' : `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        withCredentials: true,
})

const setGetHeader = ({token = ''} = {}) => ({
        headers: {
            'Authorization' : `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        withCredentials: true,
})

export {setPostHeader, setGetHeader}