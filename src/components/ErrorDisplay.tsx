interface ErrorDisplayProps {
    error: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error }) => {
    return <div className="error">{error}</div>;
};

export default ErrorDisplay;