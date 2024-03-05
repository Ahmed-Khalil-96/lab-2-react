import React, { Component } from "react";
import ErrorPage from "./ErrorPage";

export default class StandardErrorBoundary extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hasError: false,
            error: null,
        };
    }

    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            error: error,
        };
    }

    componentDidCatch(error, errorInfo) {
        console.log("Error caught by boundary:", error, errorInfo);
    }

    render() {
        const { hasError } = this.state;

        return (
            <div>
                {hasError ? (
                    <ErrorPage />
                ) : (
                    this.props.children
                )}
            </div>
        );
    }
}
