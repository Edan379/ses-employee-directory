# Architecture Diagram

```text
+--------------------------------------------------+
|                 React Frontend                   |
|               Vite + TypeScript                  |
|                                                  |
|  - Employee list                                 |
|  - Employee creation form                        |
|  - Loading & error feedback                      |
+------------------------+-------------------------+
                         |
                         | HTTP / JSON API
                         v
+--------------------------------------------------+
|                NestJS Backend API                |
|                                                  |
|  Employees Module                                |
|  - Controller                                    |
|  - Service                                       |
|  - DTO Validation                                |
|  - Business Rule Validation                      |
|                                                  |
|  Main business rule:                             |
|  Active employee work emails must be unique      |
+------------------------+-------------------------+
                         |
                         | Mongoose ODM
                         v
+--------------------------------------------------+
|                 MongoDB Database                 |
|                                                  |
|  Database: ses_employee_directory                |
|  Collection: employees                           |
|                                                  |
|  - Employee persistence                          |
|  - Soft delete support                           |
+--------------------------------------------------+