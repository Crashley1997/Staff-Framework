// queries.js
const db = require('./db');

// Function to view all departments
const viewDepartments = async () => {
  const res = await db.query('SELECT * FROM department');
  console.table(res.rows);
};

// Function to view all roles
const viewRoles = async () => {
  const res = await db.query('SELECT * FROM role');
  console.table(res.rows);
};

// Function to view all employees
const viewEmployees = async () => {
  const res = await db.query('SELECT * FROM employee');
  console.table(res.rows);
};

// Function to add a department
const addDepartment = async (name) => {
  const res = await db.query('INSERT INTO department (name) VALUES ($1)', [name]);
  console.log(`Department "${name}" added successfully.`);
};

// Function to add a role
const addRole = async (title, salary, departmentId) => {
  const res = await db.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, departmentId]);
  console.log(`Role "${title}" added successfully.`);
};

// Function to add an employee
const addEmployee = async (firstName, lastName, roleId, managerId) => {
  const res = await db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [firstName, lastName, roleId, managerId]);
  console.log(`Employee "${firstName} ${lastName}" added successfully.`);
};

// Function to update an employee's manager
const updateEmployeeManager = async (employeeId, managerId) => {
  const res = await db.query('UPDATE employee SET manager_id = $1 WHERE id = $2', [managerId, employeeId]);
  console.log(`Employee's manager updated successfully.`);
};

// Function to view employees by manager
const viewEmployeesByManager = async (managerId) => {
  const res = await db.query('SELECT * FROM employee WHERE manager_id = $1', [managerId]);
  console.table(res.rows);
};

// Function to view employees by department
const viewEmployeesByDepartment = async (departmentId) => {
  const res = await db.query('SELECT * FROM employee WHERE role_id IN (SELECT id FROM role WHERE department_id = $1)', [departmentId]);
  console.table(res.rows);
};

// Function to delete a department
const deleteDepartment = async (departmentId) => {
  await db.query('DELETE FROM department WHERE id = $1', [departmentId]);
  console.log(`Department deleted successfully.`);
};

// Function to delete a role
const deleteRole = async (roleId) => {
  await db.query('DELETE FROM role WHERE id = $1', [roleId]);
  console.log(`Role deleted successfully.`);
};

// Function to delete an employee
const deleteEmployee = async (employeeId) => {
  await db.query('DELETE FROM employee WHERE id = $1', [employeeId]);
  console.log(`Employee deleted successfully.`);
};

// Function to calculate the total budget for a department
const calculateDepartmentBudget = async (departmentId) => {
  const res = await db.query('SELECT SUM(salary) AS total_budget FROM role WHERE department_id = $1', [departmentId]);
  console.log(`Total budget for department: $${res.rows[0].total_budget}`);
};

module.exports = {
  viewDepartments,
  viewRoles,
  viewEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeManager,
  viewEmployeesByManager,
  viewEmployeesByDepartment,
  deleteDepartment,
  deleteRole,
  deleteEmployee,
  calculateDepartmentBudget,
};
