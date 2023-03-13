import { Suspense } from "react";
import { Spinner } from "@chakra-ui/react";

const load = (Component, props = {}) =>{
    
    return () => <Suspense fallback={<Spinner/>}>
        <Component {...props}/>
    </Suspense>
}


export default load