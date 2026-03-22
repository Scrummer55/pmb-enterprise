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
  // Get all employees with fallback to mock data
  getAllEmployees: async (): Promise<EmployeeDTO[]> => {
    try {
      console.log('🧪 DEBUG: Attempting to call backend API for getAllEmployees:', API_BASE_URL);

      // Create AbortController for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout

      const response = await fetch(API_BASE_URL, {
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error('Backend not available');
      }
      const result = await response.json();
      console.log('🧪 DEBUG: Backend API call successful for getAllEmployees:', result);
      return result;
    } catch (error) {
      console.warn('🧪 DEBUG: Backend not available for getAllEmployees, falling back to mock data');
      console.log('🧪 DEBUG: Error details:', error);
      // Fallback to mock data
      try {
        const { getMockEmployees } = await import('../data/mockData');
        console.log('🧪 DEBUG: Imported getMockEmployees function');
        const mockEmployees = getMockEmployees();
        console.log('🧪 DEBUG: Retrieved mock employees:', mockEmployees.length, 'employees');

        const dtoEmployees = mockEmployees.map(emp => ({
          id: emp.id.includes('mock') ? parseInt(emp.id.replace('emp-mock-', '')) || undefined : parseInt(emp.id.replace('emp-', '')) || undefined,
          firstName: emp.firstName,
          lastName: emp.lastName,
          email: emp.email,
          phone: emp.phone,
          role: emp.role,
          department: emp.department
        }));

        console.log('🧪 DEBUG: Transformed to DTO format:', dtoEmployees);
        return dtoEmployees;
      } catch (mockError) {
        console.error('🧪 DEBUG: Mock data fallback failed for getAllEmployees:', mockError);
        throw mockError;
      }
    }
  },

  // Get employee by ID
  getEmployeeById: async (id: number): Promise<EmployeeDTO> => {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch employee with id ${id}`);
    }
    return response.json();
  },

  // Create new employee with fallback to mock data
  createEmployee: async (employee: Omit<EmployeeDTO, 'id'>): Promise<EmployeeDTO> => {
    try {
      console.log('🧪 DEBUG: Attempting to call backend API:', API_BASE_URL);

      // Remove any accidental id property from the payload
      const { id, ...employeeData } = employee as any;

      // Create AbortController for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout

      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeData),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error('Backend not available');
      }
      const result = await response.json();
      console.log('🧪 DEBUG: Backend API call successful:', result);
      return result;
    } catch (error) {
      console.warn('🧪 DEBUG: Backend not available, falling back to mock data');
      console.log('🧪 DEBUG: Error details:', error);
      // Fallback to mock data
      try {
        const { addEmployeeToMockData } = await import('../data/mockData');
        console.log('🧪 DEBUG: Imported addEmployeeToMockData function');
        const newEmployee = addEmployeeToMockData({
          firstName: employee.firstName,
          lastName: employee.lastName,
          email: employee.email,
          phone: employee.phone,
          role: employee.role,
          department: employee.department,
          availabilityHours: 40, // Default value - backend doesn't have this field
          hourlyRate: 0 // Default value - backend doesn't have this field
        });
        console.log('🧪 DEBUG: Created mock employee:', newEmployee);

        // Return as DTO format
        const dtoResult = {
          id: parseInt(newEmployee.id.replace('emp-', '').replace('mock-', '')) || undefined,
          firstName: newEmployee.firstName,
          lastName: newEmployee.lastName,
          email: newEmployee.email,
          phone: newEmployee.phone,
          role: newEmployee.role,
          department: newEmployee.department
        };
        console.log('🧪 DEBUG: Returning DTO result:', dtoResult);
        return dtoResult;
      } catch (mockError) {
        console.error('🧪 DEBUG: Mock data fallback failed:', mockError);
        throw mockError;
      }
    }
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
