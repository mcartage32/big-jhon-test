# Big-Jhon-Test

## General Considerations

1. The frontend will run by default on port 5173 and the backend API will run on port 3000. Make sure you have these ports free or if you wish you can change these ports in the respective files.

Before installing this project, you need to install the following dependencies:

1. **MySQL 9.0.1** or any later version.
2. **Node.js 22.13.1** or any later version.

**Note:** To run this project, you must ensure that MySQL is running on port 3306, the root user is "root", and the corresponding password is "root". You must also create an empty database with the name "domina_test". However, if you want to change the database configuration, remember to modify the file `/backend/app.module.ts` so that the REST API connects correctly with the database.

## Dependencies used

### Backend

1. **npm** 11.0
2. **nestjs** 11.0.1
3. **mysql2** 3.12.0
4. **reflect-metadata** 0.2.2
5. **rxjs** 7.8.1
6. **typeorm** 0.3.20

### Frontend

1. **npm** 11.0
2. **react** 18.3.1
3. **react-dom** 18.3.1
4. **react-router-dom** 7.1.3
5. **material ui** 6.4.1
6. **material ui icons** 6.4.1
7. **axios** 1.7.9
8. **react-query** 5.64.2
9. **react-toastify** 11.0.3
10. **formik** 2.4.6
11. **lodash** 4.17.21
12. **deep-object-diff** 1.1.9

## Installation

### On Linux/macOS

Navigate to the root of the project, give execution permissions to the **setup.sh** file and execute it.

### On Windows

Option 1: You can open the project with GitBash and, from the root of the project, run the **setup.sh** file.

Option 2: Open a terminal located in the **frontend** folder and another in the **backend** folder, and run both projects using npm: for **backend** run **npm install** first and then **npm run start:dev**. And for **frontend** run **npm install** first and then **npm run dev**.
