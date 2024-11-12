import React from 'react';
import { BookOpen } from 'lucide-react';

const Reference = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <BookOpen className="h-8 w-8 text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-900">Справочник</h1>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">Справочная информация будет доступна после подключения к базе данных.</p>
      </div>
    </div>
  );
};

export default Reference;