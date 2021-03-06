DROP DATABASE IF EXISTS employee_trackerDB;

CREATE database employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE department (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (department_id)
);

CREATE TABLE role (
  role_id INT NOT NULL AUTO_INCREMENT,
  role_title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (role_id),
  FOREIGN KEY (department_id) REFERENCES department(department_id)
);

CREATE TABLE employee (
  employee_id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT,
  PRIMARY KEY (employee_id),
  FOREIGN KEY (role_id) REFERENCES role(role_id),
  FOREIGN KEY (manager_id) REFERENCES employee(employee_id)
);