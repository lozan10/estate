import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // You can log this to an error reporting service
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="pt-24 min-h-screen flex items-center justify-center">
          <div className="max-w-xl text-center">
            <h2 className="text-2xl font-semibold mb-3">Something went wrong.</h2>
            <p className="text-stone-600 mb-4">Please refresh the page or go back to the home page.</p>
            <div className="flex justify-center gap-3">
              <a href="/" className="px-4 py-2 border rounded-md">Home</a>
              <button className="px-4 py-2 border rounded-md" onClick={() => this.setState({ hasError: false, error: null })}>Try Again</button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children; 
  }
}
