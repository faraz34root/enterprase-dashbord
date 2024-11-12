import React, { useState, useEffect } from 'react';
import { Users, Clock, Search, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { getEmployeeAttendance, getAllEmployees } from '../lib/db';

interface Employee {
  id: number;
  name: string;
  position: string;
  department: string;
}

interface AttendanceRecord {
  date: string;
  time_in: string;
}

interface EmployeeAttendance extends Employee {
  attendance: Record<string, AttendanceRecord>;
}

const Employees = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [employees, setEmployees] = useState<EmployeeAttendance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const startDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
        const endDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
        
        const [employeesData, attendanceData] = await Promise.all([
          getAllEmployees(),
          getEmployeeAttendance(
            startDate.toISOString().split('T')[0],
            endDate.toISOString().split('T')[0]
          )
        ]);

        const employeesWithAttendance = employeesData.map((emp: Employee) => ({
          ...emp,
          attendance: (attendanceData as AttendanceRecord[])
            .filter(a => a.id === emp.id)
            .reduce((acc, curr) => ({
              ...acc,
              [curr.date]: { date: curr.date, time_in: curr.time_in }
            }), {})
        }));

        setEmployees(employeesWithAttendance);
        setError(null);
      } catch (err) {
        setError('Ошибка при загрузке данных. Пожалуйста, попробуйте позже.');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentMonth]);

  const departments = ['all', ...new Set(employees.map(emp => emp.department))];
  
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || employee.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-red-600 text-center">
          <p className="text-xl font-semibold mb-2">Ошибка подключения</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Users className="h-8 w-8 text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-900">Сотрудники</h1>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-semibold">Табель учета рабочего времени</h2>
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

          <div className="mt-4 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Поиск по имени или должности..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>
                  {dept === 'all' ? 'Все отделы' : dept}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center p-12">
            <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
            <span className="ml-2">Загрузка данных...</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50">
                    Сотрудник
                  </th>
                  {[...Array(getDaysInMonth(currentMonth))].map((_, index) => (
                    <th
                      key={index}
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                    >
                      {index + 1}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id}>
                    <td className="px-6 py-4 whitespace-nowrap sticky left-0 bg-white">
                      <div className="flex flex-col">
                        <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                        <div className="text-sm text-gray-500">{employee.position}</div>
                        <div className="text-xs text-gray-400">{employee.department}</div>
                      </div>
                    </td>
                    {[...Array(getDaysInMonth(currentMonth))].map((_, index) => {
                      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), index + 1)
                        .toISOString().split('T')[0];
                      const attendance = employee.attendance[date];
                      
                      return (
                        <td key={index} className="px-6 py-4 text-center whitespace-nowrap">
                          <span className={`text-sm ${attendance ? 'text-green-600' : 'text-red-600'}`}>
                            {attendance ? attendance.time_in : '—'}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Employees;