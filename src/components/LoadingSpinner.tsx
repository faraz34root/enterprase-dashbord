import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message = 'Загрузка данных...' }) => {
  return (
    <div className="flex items-center justify-center p-12">
      <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
      <span className="ml-2">{message}</span>
    </div>
  );
};

export default LoadingSpinner;