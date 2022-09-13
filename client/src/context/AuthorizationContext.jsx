import { useState, createContext} from "react";

const AuthorizationContext = createContext()

const AuthorizationContextProvider = (props) => {
    const [Authorization, setAuthorization] = useState({username:'', accessToken: ""})
    
    return (
        <AuthorizationContext.Provider value={{Authorization, setAuthorization}}>
            {props.children}
        </AuthorizationContext.Provider>
    )
}

export {AuthorizationContext, AuthorizationContextProvider}