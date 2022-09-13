import { useState, createContext} from "react";

const AuthorizationContext = createContext()

const AuthorizationContextProvider = (props) => {
    const [authorization, setAuthorization] = useState({username:'', accessToken: ""})
    
    return (
        <AuthorizationContext.Provider value={{authorization, setAuthorization}}>
            {props.children}
        </AuthorizationContext.Provider>
    )
}

export {AuthorizationContext, AuthorizationContextProvider}