import React from 'react';
import { BarChart3, Users, Package, Database } from 'lucide-react';

const DashboardCard = ({ icon: Icon, title, value, change }: { 
  icon: React.ElementType, 
  title: string, 
  value: string, 
  change: string 
}) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-2xl font-semibold mt-1">{value}</p>
      </div>
      <Icon className="h-8 w-8 text-blue-600" />
    </div>
    <p className="text-sm text-green-600 mt-2">{change}</p>
  </div>
);

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Панель управления</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard 
          icon={Package}
          title="Готовые изделия"
          value="1,234"
          change="+12.5% с прошлого месяца"
        />
        <DashboardCard 
          icon={Users}
          title="Активные сотрудники"
          value="156"
          change="+3 новых сотрудника"
        />
        <DashboardCard 
          icon={Database}
          title="Склад деталей"
          value="8,567"
          change="92% заполненность"
        />
        <DashboardCard 
          icon={BarChart3}
          title="Общая эффективность"
          value="94.2%"
          change="+2.3% с прошлой недели"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Статус баз данных</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5 text-blue-600" />
                <span>База данных производства</span>
              </div>
              <span className="px-2 py-1 rounded-full text-sm bg-yellow-100 text-yellow-800">
                Ожидание подключения
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5 text-blue-600" />
                <span>База данных персонала</span>
              </div>
              <span className="px-2 py-1 rounded-full text-sm bg-yellow-100 text-yellow-800">
                Ожидание подключения
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Последние действия</h2>
          <div className="space-y-4">
            <p className="text-gray-600">История действий появится после подключения к базам данных.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;