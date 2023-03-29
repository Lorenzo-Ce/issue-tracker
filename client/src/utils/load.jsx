import { Suspense } from "react";
import { Grid, Spinner } from "@chakra-ui/react";

const load = (Component, props = {}) =>{
    
    return () => <Suspense fallback={
            <Grid
                placeContent='center'
                height='80vh'
            >
                <Spinner/>
            </Grid>
        }>
        <Component {...props}/>
    </Suspense>
}


export default load