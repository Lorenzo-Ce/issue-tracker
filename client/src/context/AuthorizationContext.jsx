import { useState, createContext} from "react";

const AuthorizationContext = createContext()

const AuthorizationContextProvider = (props) => {
    const [Authorization, setAuthorization] = useState('')

    return (
        <AuthorizationContext.Provider value=''>
            {props.children}
        </AuthorizationContext.Provider>
    )
}

export default {AuthorizationContext, AuthorizationContextProvider}