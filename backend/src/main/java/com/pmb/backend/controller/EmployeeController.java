package com.pmb.backend.controller;

import com.pmb.backend.model.Employee;
import com.pmb.backend.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "*")
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;

    // GET all employees
    @GetMapping
    public List<Employee> getAllEmployees() {
        // Geef direct de lijst terug, zodat de frontend een array ontvangt
        return employeeRepository.findAll();
    }

    // GET single employee by ID
    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getEmployeeById(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();

        return employeeRepository.findById(id)
                .map(employee -> {
                    response.put("success", true);
                    response.put("data", employee);
                    return ResponseEntity.ok(response);
                })
                .orElseGet(() -> {
                    response.put("success", false);
                    response.put("message", "Employee with id " + id + " not found");
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
                });
    }

    // POST new employee
    @PostMapping
    public ResponseEntity<Map<String, Object>> createEmployee(@RequestBody Employee employee) {
        Map<String, Object> response = new HashMap<>();

        // Validation
        if (employee.getFirstName() == null || employee.getLastName() == null || employee.getEmail() == null) {
            response.put("success", false);
            response.put("message", "firstName, lastName, and email are required");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        try {
            Employee savedEmployee = employeeRepository.save(employee);

            response.put("success", true);
            response.put("message", "Employee created successfully");
            response.put("data", savedEmployee);

            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            String errorMessage = e.getMessage();
            
            // Check for unique constraint violation (duplicate email)
            if (errorMessage != null && (errorMessage.contains("UNIQUE constraint failed") || 
                errorMessage.contains("Unique index or primary key violation") ||
                errorMessage.contains("unique constraint"))) {
                response.put("success", false);
                response.put("message", "Email '" + employee.getEmail() + "' is already in use");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }
            
            // Generic database error
            response.put("success", false);
            response.put("message", "Failed to create employee: " + errorMessage);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    // PUT update employee
    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> updateEmployee(@PathVariable Long id, @RequestBody Employee employee) {
        Map<String, Object> response = new HashMap<>();

        return employeeRepository.findById(id)
                .map(existingEmployee -> {
                    // Update fields
                    existingEmployee.setFirstName(employee.getFirstName());
                    existingEmployee.setLastName(employee.getLastName());
                    existingEmployee.setEmail(employee.getEmail());
                    existingEmployee.setPhone(employee.getPhone());
                    existingEmployee.setRole(employee.getRole());
                    existingEmployee.setDepartment(employee.getDepartment());

                    Employee updatedEmployee = employeeRepository.save(existingEmployee);

                    response.put("success", true);
                    response.put("message", "Employee updated successfully");
                    response.put("data", updatedEmployee);

                    return ResponseEntity.ok(response);
                })
                .orElseGet(() -> {
                    response.put("success", false);
                    response.put("message", "Employee with id " + id + " not found");
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
                });
    }

    // DELETE employee
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteEmployee(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();

        return employeeRepository.findById(id)
                .map(employee -> {
                    employeeRepository.delete(employee);

                    response.put("success", true);
                    response.put("message", "Employee deleted successfully");

                    return ResponseEntity.ok(response);
                })
                .orElseGet(() -> {
                    response.put("success", false);
                    response.put("message", "Employee with id " + id + " not found");
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
                });
    }
}
