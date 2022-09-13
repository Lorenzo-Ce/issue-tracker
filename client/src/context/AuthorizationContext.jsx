import { useState, createContext} from "react";

const AuthorizationContext = createContext()

const AuthorizationContextProvider = (props) => {
    const [Authorization, setAuthorization] = useState({user:'', accessToken: ""})

    return (
        <AuthorizationContext.Provider value={{Authorization, setAuthorization}}>
            {props.children}
        </AuthorizationContext.Provider>
    )
}

export default {AuthorizationContext, AuthorizationContextProvider}