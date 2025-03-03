import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { XCircle } from "lucide-react";

interface ErrorAlertProps {
  title?: string;
  message: string;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({
  title = "Error",
  message,
}) => {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <Alert
        variant="destructive"
        className="flex items-center gap-4 p-6 max-w-lg w-full shadow-lg border border-red-400"
      >
        <XCircle className="h-8 w-8 text-red-500" />
        <div>
          <AlertTitle className="text-lg">{title}</AlertTitle>
          <AlertDescription className="text-base">{message}</AlertDescription>
        </div>
      </Alert>
    </div>
  );
};

export default ErrorAlert;
