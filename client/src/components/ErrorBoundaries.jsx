import { Component } from "react";
import { Error } from "./Alerts/Error";


class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { error: false };
    }

    static getDerivedStateFromError(error) {
        return { error: error };
    }

    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo)
    }

    render() {
        if (this.state.error) {
            return( 
                <Error>
                    There seems to be a problem. 
                    Try to refresh or if the problem persist contact us.
                </Error>
        )}

        return this.props.children;
    }
}

export default ErrorBoundary;