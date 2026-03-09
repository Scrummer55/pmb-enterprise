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
    public ResponseEntity<Map<String, Object>> getAllEmployees() {
        List<Employee> employees = employeeRepository.findAll();

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("count", employees.size());
        response.put("data", employees);

        return ResponseEntity.ok(response);
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

        Employee savedEmployee = employeeRepository.save(employee);

        response.put("success", true);
        response.put("message", "Employee created successfully");
        response.put("data", savedEmployee);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
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
