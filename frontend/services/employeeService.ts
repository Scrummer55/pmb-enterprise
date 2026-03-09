const API_BASE_URL = 'http://localhost:8080/api/employees';

export interface EmployeeDTO {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: string;
  department: string;
}

export const employeeService = {
  // Get all employees
  getAllEmployees: async (): Promise<EmployeeDTO[]> => {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch employees');
    }
    return response.json();
  },

  // Get employee by ID
  getEmployeeById: async (id: number): Promise<EmployeeDTO> => {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch employee with id ${id}`);
    }
    return response.json();
  },

  // Create new employee
  createEmployee: async (employee: Omit<EmployeeDTO, 'id'>): Promise<EmployeeDTO> => {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employee),
    });
    if (!response.ok) {
      throw new Error('Failed to create employee');
    }
    return response.json();
  },

  // Update employee
  updateEmployee: async (id: number, employee: Omit<EmployeeDTO, 'id'>): Promise<EmployeeDTO> => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employee),
    });
    if (!response.ok) {
      throw new Error(`Failed to update employee with id ${id}`);
    }
    return response.json();
  },

  // Delete employee
  deleteEmployee: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Failed to delete employee with id ${id}`);
    }
  },
};
