import {AuthorizationContext} from "../context/AuthorizationContext"
import { useContext } from "react"

const useAuthorization = () => {
    const context = useContext(AuthorizationContext)
    if(!context) throw new Error("useAuthorization must be used in a child of a component wrapped by AuthorizationContext.Provider")
    return context
}

export default useAuthorization