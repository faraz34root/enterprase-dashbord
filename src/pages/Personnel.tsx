import React from 'react';
import { Users } from 'lucide-react';

const Personnel = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Users className="h-8 w-8 text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-900">Кадры</h1>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">Информация о кадрах будет доступна после подключения к базе данных персонала.</p>
      </div>
    </div>
  );
};

export default Personnel;