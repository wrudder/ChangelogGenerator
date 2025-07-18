interface ErrorMessageProps {
  error: string  
}

const ErrorMessage = (props: ErrorMessageProps) => {
  const { error } = props
    
    return (
      <div
        role="alert"
        className="mb-6 text-red-700 bg-red-100 border border-red-300 px-4 py-3 rounded-md"
      >
        {error}
      </div>
    )
}

export default ErrorMessage