export interface Employee {
  id: number;
  name: string;
  position: string;
  department: string;
}

export interface AttendanceRecord {
  id: number;
  employee_id: number;
  date: string;
  time_in: string;
  time_out: string;
  hours_worked: number;
}

export interface EmployeeAttendance extends Employee {
  attendance: Record<string, AttendanceRecord>;
}

export interface ApiError {
  message: string;
  status?: number;
}