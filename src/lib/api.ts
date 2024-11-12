import type { Employee, AttendanceRecord } from './types';

const API_BASE_URL = '/api'; // Use relative URL for API endpoints

export async function getAllEmployees(): Promise<Employee[]> {
  try {
    const mockEmployees: Employee[] = [
      { id: 1, name: 'Иванов Иван Иванович', position: 'Инженер', department: 'Производство' },
      { id: 2, name: 'Петров Петр Петрович', position: 'Технолог', department: 'Разработка' },
      { id: 3, name: 'Сидорова Анна Павловна', position: 'Менеджер', department: 'Управление' },
    ];
    
    // Return mock data while API is not available
    return Promise.resolve(mockEmployees);
  } catch (error) {
    console.error('API Error:', error);
    return [];
  }
}

export async function getEmployeeAttendance(
  startDate: string,
  endDate: string
): Promise<AttendanceRecord[]> {
  try {
    // Generate mock attendance data
    const mockAttendance: AttendanceRecord[] = [
      {
        id: 1,
        employee_id: 1,
        date: '2024-03-01',
        time_in: '09:00',
        time_out: '18:00',
        hours_worked: 8
      },
      // Add more mock data as needed
    ];

    return Promise.resolve(mockAttendance);
  } catch (error) {
    console.error('API Error:', error);
    return [];
  }
}