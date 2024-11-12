import React, { useState, useEffect } from 'react';
import { Clock, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { getAllEmployees, getEmployeeAttendance } from '../lib/api';
import type { Employee, AttendanceRecord } from '../lib/types';
import ErrorMessage from '../components/ErrorMessage';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorBoundary from '../components/ErrorBoundary';

const DAYS_OF_WEEK = ['пн.', 'вт.', 'ср.', 'чт.', 'пт.', 'сб.', 'вс.'];

const Timesheet = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const startDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
        const endDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
        
        const [employeesData, attendanceData] = await Promise.all([
          getAllEmployees(),
          getEmployeeAttendance(
            startDate.toISOString().split('T')[0],
            endDate.toISOString().split('T')[0]
          )
        ]);

        if (Array.isArray(employeesData)) {
          setEmployees(employeesData);
        }

        if (Array.isArray(attendanceData)) {
          setAttendance(attendanceData);
        }
      } catch (err) {
        setError('Ошибка при загрузке данных. Пожалуйста, попробуйте позже.');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentMonth]);

  const getDaysInMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getDayOfWeek = (date: Date): string => {
    const day = date.getDay();
    return DAYS_OF_WEEK[day === 0 ? 6 : day - 1];
  };

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getEmployeeAttendanceForDay = (employeeId: number, date: string): number | null => {
    const record = attendance.find(a => 
      a.employee_id === employeeId && a.date === date
    );
    return record ? record.hours_worked : null;
  };

  const calculateTotalHours = (employeeId: number): number => {
    return attendance
      .filter(a => a.employee_id === employeeId)
      .reduce((total, record) => total + record.hours_worked, 0);
  };

  const renderTableHeader = () => {
    const days = getDaysInMonth(currentMonth);
    const headers = [];
    
    for (let i = 1; i <= days; i++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i);
      const dayOfWeek = getDayOfWeek(date);
      const isWeekend = dayOfWeek === 'сб.' || dayOfWeek === 'вс.';
      
      headers.push(
        <th 
          key={i}
          className={`px-2 py-2 text-center border-r border-gray-200 min-w-[40px] ${
            isWeekend ? 'bg-yellow-50' : ''
          }`}
        >
          <div className="text-xs font-medium text-gray-500">{i}</div>
          <div className="text-xs text-gray-400">{dayOfWeek}</div>
        </th>
      );
    }
    return headers;
  };

  return (
    <ErrorBoundary>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Табель учета рабочего времени</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={previousMonth}
              className="p-2 hover:bg-gray-100 rounded-full"
              disabled={loading}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="font-medium">
              {currentMonth.toLocaleString('ru', { month: 'long', year: 'numeric' })}
            </span>
            <button
              onClick={nextMonth}
              className="p-2 hover:bg-gray-100 rounded-full"
              disabled={loading}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Поиск по ФИО..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {error && (
            <div className="p-4">
              <ErrorMessage message={error} />
            </div>
          )}

          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2 text-left border-r border-gray-200 min-w-[250px] sticky left-0 bg-gray-50">
                      <div className="text-xs font-medium text-gray-500 uppercase">Ф.И.О.</div>
                    </th>
                    {renderTableHeader()}
                    <th className="px-4 py-2 text-center border-l border-gray-200 min-w-[100px]">
                      <div className="text-xs font-medium text-gray-500 uppercase">Отработано часов</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredEmployees.map((employee) => (
                    <tr key={employee.id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 border-r border-gray-200 sticky left-0 bg-white">
                        <div className="font-medium text-gray-900">{employee.name}</div>
                        <div className="text-sm text-gray-500">{employee.position}</div>
                        <div className="text-xs text-gray-400">{employee.department}</div>
                      </td>
                      {Array.from({ length: getDaysInMonth(currentMonth) }).map((_, index) => {
                        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), index + 1);
                        const dateStr = date.toISOString().split('T')[0];
                        const dayOfWeek = getDayOfWeek(date);
                        const isWeekend = dayOfWeek === 'сб.' || dayOfWeek === 'вс.';
                        const hours = getEmployeeAttendanceForDay(employee.id, dateStr);
                        
                        return (
                          <td 
                            key={index}
                            className={`px-2 py-2 text-center border-r border-gray-200 ${
                              isWeekend ? 'bg-yellow-50' : ''
                            }`}
                          >
                            <div className="text-sm">{hours ?? '—'}</div>
                          </td>
                        );
                      })}
                      <td className="px-4 py-2 text-center border-l border-gray-200">
                        <div className="text-sm font-medium">
                          {calculateTotalHours(employee.id)}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredEmployees.length === 0 && (
                    <tr>
                      <td 
                        colSpan={getDaysInMonth(currentMonth) + 2}
                        className="px-4 py-8 text-center text-gray-500"
                      >
                        Сотрудники не найдены
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Timesheet;