import { Box } from "@chakra-ui/react";
import { Component } from "react";
import { Error } from "./Error";


class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { error: false };
    }

    static getDerivedStateFromError(error) {
        return { error: error };
    }

    componentDidCatch(error, errorInfo) {
        console.log(error.stack, errorInfo)
    }

    render() {
        if (this.state.error) {
            return( 
                <Box placeSelf='center' boxSize={['200px','300px']}>
                    <Error 
                        message='There seems to be a problem. Try to refresh or if the problem persist contact us.'
                    />
                </Box>
        )}

        return this.props.children;
    }
}

export default ErrorBoundary;