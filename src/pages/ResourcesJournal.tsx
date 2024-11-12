import React from 'react';
import { ScrollText } from 'lucide-react';

const ResourcesJournal = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <ScrollText className="h-8 w-8 text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-900">Журнал средств и материалов</h1>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">Журнал средств и материалов будет доступен после подключения к базе данных.</p>
      </div>
    </div>
  );
};

export default ResourcesJournal;