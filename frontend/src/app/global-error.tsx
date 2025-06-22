'use client' // Error boundaries must be Client Components

import { AlertTriangle, RefreshCw } from 'lucide-react'

export default function GlobalError({
    error,
}: {
    error: Error & { digest?: string }
}) {

    return (
        <html>
            <body>
                <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
                        <div className="flex justify-center mb-6">
                            <div className="bg-red-100 p-3 rounded-full">
                                <AlertTriangle className="w-8 h-8 text-red-600" />
                            </div>
                        </div>

                        <h1 className="text-2xl font-bold text-gray-900 mb-4">
                            Something went wrong!
                        </h1>

                        <p className="text-gray-600 mb-6">
                            We encountered an unexpected error. Please try refreshing the page or contact support if the problem persists.
                        </p>

                        <div className="space-y-3">
                            <button
                                onClick={() => window.location.reload()}
                                className="w-full bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
                            >
                                <RefreshCw className="w-4 h-4" />
                                Refresh Page
                            </button>
                        </div>

                        {process.env.NODE_ENV === 'development' && (
                            <details className="mt-6 text-left">
                                <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                                    Error Details (Development)
                                </summary>
                                <pre className="mt-2 p-3 bg-gray-100 rounded text-xs text-gray-800 overflow-auto">
                                    {error.message}
                                    {error.stack && `\n\n${error.stack}`}
                                </pre>
                            </details>
                        )}
                    </div>
                </div>
            </body>
        </html>
    )
}