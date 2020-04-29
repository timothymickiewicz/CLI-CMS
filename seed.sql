INSERT INTO department (name)
VALUES ("Finance");
INSERT INTO department (name)
VALUES ("Human Resources");
INSERT INTO department (name)
VALUES ("Sales");
INSERT INTO department (name)
VALUES ("Research");
INSERT INTO department (name)
VALUES ("Development");
INSERT INTO department (name)
VALUES ("IT");
INSERT INTO department (name)
VALUES ("Dev Ops");

INSERT INTO role (title, salary, department_id)
VALUES ("Finance", 75000, 01);
INSERT INTO role (title, salary, department_id)
VALUES ("Human Resources", 60000, 02);
INSERT INTO role (title, salary, department_id)
VALUES ("Sales", 80000, 03);
INSERT INTO role (title, salary, department_id)
VALUES ("Research", 150000, 04);
INSERT INTO role (title, salary, department_id)
VALUES ("Development", 100000, 05);
INSERT INTO role (title, salary, department_id)
VALUES ("IT", 75000, 06);
INSERT INTO role (title, salary, department_id)
VALUES ("Dev Ops", 100000, 07);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mr", "Research", 04, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Timothy", "Mickiewicz", 04, 01);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mr", "Finance", 01, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Anthony", "WertHeimer", 01, 03);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mr", "HR", 02, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Whatcha", "MaCallit", 02, 05);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mr", "Sales", 03, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Whatsie", "Hoosit", 03, 07);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mr", "IT", 06, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mr", "Incredible", 06, 09);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mr", "Development", 05, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Brett", "Smitt", 05, 11);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mr", "DevOps", 07, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Smith", "Worcestshire", 07, 13);
