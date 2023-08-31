# Week 11 Individual Assigment Project Milestone 2 - Full-Stack Engineering

This is assigment in week 11 focus about Individual Assigment Project Milestone 2

- A web application with database intergration
- A custom-built API
- Role-Based Access (RBAC)
- Database (SQL or NoSQL)
- Implement CRUD functionality.
- Implement Authentication and Authorization, method of your choice
- A theme of your choice
- Comprehensive API documentation

If you want to follow me on social media, you can directly click the link below.

[![LinkedIn Badge](https://img.shields.io/badge/-Reynaldo_Fang-blue?style=flat&logo=linkedin)](https://www.linkedin.com/in/reynaldo-fang/)
[![Instagram Badge](https://img.shields.io/badge/-reynaldo.fang-white?style=flat&logo=instagram&logoColor=black&color=%2387ceeb)](https://www.instagram.com/reynaldo.fang/)
[![Gmail Badge](https://img.shields.io/badge/-reynaldofang02%40gmail.com-black?style=flat&logo=gmail&color=%23454c53)](mailto:reynaldofang02@gmail.com)

This project about class attedance of student, are you arleady join the class or not.

In This Project Have 3 Roles :

- Student Role
  - Register
  - Login (JWT) -> get token
  - Attendance
  - Can check arleady attendace or not

- Coach Role
  - Register
  - Login (JWT) -> get token
  - Can check student list
  - Can check student Attendance
  - Can change the status Attendance

- Admin Role
  - Register
  - Login (JWT) -> get token
  - Can check student & coach list
  - Can check student Attendance
  - Can delete student & coach user
  - Can change the status Attendance

For the Script Query Database :

Make Table Users :
```
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('student', 'coach', 'admin') NOT NULL
);
```

Make Table attendance
```
CREATE TABLE attendance (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  description VARCHAR(255) NOT NULL,
  status ENUM('present', 'pending', 'absent', 'sick') DEFAULT 'pending' NOT NULL,
  coach_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (coach_id) REFERENCES users(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

I have deploy my API in public so you can try it:

[Trying API With Swagger](https://week11-reynaldofang.cyclic.app/api-docs)


For account you can try this 3 roles:
**Student**
```
{
    "username": "udin"
    "password": "reynaldo88"
}
```

**Coach**
```
{
    "username": "reynaldo"
    "password": "reynaldo88"
}
```

**Admin**
```
{
    "username": "admin"
    "password": "reynaldo88"
}
```

That all!!

I hope the steps I explained above are clear to you.

Hopefully, you can use the website that I provided.

Thankyou.

<img src="https://gifdb.com/images/high/tanjiro-demon-slayer-smile-ug5qxtabnbi4yebd.gif"  width="465px" height="262px"/>
