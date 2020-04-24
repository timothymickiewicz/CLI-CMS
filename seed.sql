INSERT INTO department (name, dptid)
VALUES ("Finance", 01);
INSERT INTO department (name, dptid)
VALUES ("Human Resources", 02);
INSERT INTO department (name, dptid)
VALUES ("Sales", 03);
INSERT INTO department (name, dptid)
VALUES ("Research", 04);
INSERT INTO department (name, dptid)
VALUES ("Development", 05);
INSERT INTO department (name, dptid)
VALUES ("IT", 06);
INSERT INTO department (name, dptid)
VALUES ("Dev Ops", 07);

INSERT INTO role (title, salary, department_id, role_id)
VALUES ("Finance", 75000, 01, 10);
INSERT INTO role (title, salary, department_id, role_id)
VALUES ("Human Resources", 60000, 02, 11);
INSERT INTO role (title, salary, department_id, role_id)
VALUES ("Sales", 80000, 03, 12);
INSERT INTO role (title, salary, department_id, role_id)
VALUES ("Research", 150000, 04, 13);
INSERT INTO role (title, salary, department_id, role_id)
VALUES ("Development", 100000, 05, 14);
INSERT INTO role (title, salary, department_id, role_id)
VALUES ("IT", 75000, 06, 15);
INSERT INTO role (title, salary, department_id, role_id)
VALUES ("Dev Ops", 100000, 07, 16);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Timothy", "Mickiewicz", 01, 01);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Anthony", "WertHeimer", 02, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Whatcha", "MaCallit", 03, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Whatsie", "Hoosit", 04, 02);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mr", "Incredible", 05, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Brett", "Smitt", 06, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Smith", "Worcestshire", 07, null);
