// index.js
const inquirer = require('inquirer');
const queries = require('./queries');

async function mainMenu() {
  const { action } = await inquirer.prompt({
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices: [
      'View all departments',
      'View all roles',
      'View all employees',
      'Add a department',
      'Add a role',
      'Add an employee',
      'Update employee manager',
      'View employees by manager',
      'View employees by department',
      'Delete department',
      'Delete role',
      'Delete employee',
      'View total budget for a department',
      'Exit'
    ]
  });

  switch (action) {
    case 'View all departments':
      await queries.viewDepartments();
      break;
    case 'View all roles':
      await queries.viewRoles();
      break;
    case 'View all employees':
      await queries.viewEmployees();
      break;
    case 'Add a department':
      const { departmentName } = await inquirer.prompt({
        type: 'input',
        name: 'departmentName',
        message: 'Enter the department name:'
      });
      await queries.addDepartment(departmentName);
      break;
    case 'Add a role':
      const { roleTitle, salary, departmentId } = await inquirer.prompt([
        { type: 'input', name: 'roleTitle', message: 'Enter the role title:' },
        { type: 'input', name: 'salary', message: 'Enter the salary:' },
        { type: 'input', name: 'departmentId', message: 'Enter the department ID:' }
      ]);
      await queries.addRole(roleTitle, salary, departmentId);
      break;
    case 'Add an employee':
      const { firstName, lastName, roleId } = await inquirer.prompt([
        { type: 'input', name: 'firstName', message: 'Enter the first name of the employee:' },
        { type: 'input', name: 'lastName', message: 'Enter the last name of the employee:' },
        { type: 'input', name: 'roleId', message: 'Enter the role ID of the employee:' },
        { type: 'input', name: 'roleId', message: 'Enter the manager ID of the employee (optional):' }
      ]);
      await queries.addEmployee(firstName, lastName, roleId, managerId || null);
      break;
    case 'Update employee manager':
      const { employeeId, newManagerId } = await inquirer.prompt([
        { type: 'input', name: 'employeeId', message: 'Enter the employee ID:' },
        { type: 'input', name: 'newManagerId', message: 'Enter the new manager ID:' }
      ]);
      await queries.updateEmployeeManager(employeeId, newManagerId);
      break;
    case 'View employees by manager':
      const { managerId } = await inquirer.prompt({
        type: 'input',
        name: 'managerId',
        message: 'Enter the manager ID:'
      });
      await queries.viewEmployeesByManager(managerId);
      break;
    case 'View employees by department':
      const { departmentIdView } = await inquirer.prompt({
        type: 'input',
        name: 'departmentIdView',
        message: 'Enter the department ID:'
      });
      await queries.viewEmployeesByDepartment(departmentIdView);
      break;
    case 'Delete department':
      const { departmentIdDelete } = await inquirer.prompt({
        type: 'input',
        name: 'departmentIdDelete',
        message: 'Enter the department ID to delete:'
      });
      await queries.deleteDepartment(departmentIdDelete);
      break;
    case 'Delete role':
      const { roleIdDelete } = await inquirer.prompt({
        type: 'input',
        name: 'roleIdDelete',
        message: 'Enter the role ID to delete:'
      });
      await queries.deleteRole(roleIdDelete);
      break;
    case 'Delete employee':
      const { employeeIdDelete } = await inquirer.prompt({
        type: 'input',
        name: 'employeeIdDelete',
        message: 'Enter the employee ID to delete:'
      });
      await queries.deleteEmployee(employeeIdDelete);
      break;
    case 'View total budget for a department':
      const { departmentIdBudget } = await inquirer.prompt({
        type: 'input',
        name: 'departmentIdBudget',
        message: 'Enter the department ID to view the budget:'
      });
      await queries.calculateDepartmentBudget(departmentIdBudget);
      break;
    case 'Exit':
      console.log('Goodbye!');
      process.exit();
  }
  mainMenu();
}

mainMenu();
