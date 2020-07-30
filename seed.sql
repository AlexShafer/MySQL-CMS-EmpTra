INSERT INTO department (name)
VALUES 
    ("Management"),
    ("Sales"),
    ("IT"),
    ("Developement");

INSERT INTO role (title, salary, department_id)
VALUES
    ("CEO",1000000,1),
    ("CFO",750000,1),

    ("Sales Lead",200000,2),
    ("Sales Assistant",150000,2),

    ("IT Director",200000,3),
    ("IT Specialist",100000,3),

    ("Project Manager",300000,4),
    ("Front End Developer",200000,4),
    ("Back End Developer",200000,4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ("John Paul","Tremblay",1,NULL),
    ("Robb","Wells",2,1),
    ("Mike","Smith", 3,2),
    ("John","Dunsworth",4,3),
    ("Patrick","Roach",5,1),
    ("Sarah E.","Dunsworth",6,5),
    ("Tyrone","Parsons",7,1),
    ("Shelly","Thompson",8,7),
    ("Cory","Bowles",9,7)
