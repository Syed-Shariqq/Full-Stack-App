# Assignment Reminder System

A full-stack application designed to help teachers and students manage assignments, track deadlines, and stay organized through automated reminders and notifications. Built with Spring Boot and React, this system supports role-based access for teachers and students with a centralized MySQL database.

## 📋 Overview

The Assignment Reminder System is an institutional tool that bridges the gap between teachers and students by providing:
- **Teachers**: A dashboard to create assignments, set deadlines, and track student completion
- **Students**: A dashboard to view assigned tasks, track completion status, and receive reminders
- **System-wide**: Automated notifications and reminders to ensure no deadline is missed

This is **not** a personal productivity app—it is purpose-built for educational institutions.

## ✨ Features

### Core Features
- **Role-Based Access Control**: Separate dashboards for Teachers and Students
- **Assignment Management**: Create, update, and delete assignments with deadlines
- **Completion Tracking**: Mark assignments as complete and track submission status
- **Automated Reminders**: Scheduled reminders before assignment deadlines
- **Notifications**: Real-time alerts for assignment updates and reminders
- **Dashboard Analytics**: Teachers can view overall completion statistics
- **User Authentication**: JWT-based secure authentication

### Technical Features
- Stateless REST API with JWT token validation
- Scheduled background tasks for reminder notifications
- CORS-enabled for frontend integration
- Exception handling and logging
- Entity-based data modeling with Hibernate ORM

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, Vite, Tailwind CSS |
| **Backend** | Spring Boot 4.0.0, Spring Security, Spring Data JPA |
| **Database** | MySQL 8.0+ |
| **ORM** | Hibernate |
| **Build** | Maven |
| **Java Version** | 21 |
| **Authentication** | JWT (JSON Web Tokens) |

## 📁 Project Structure

```
Assignment-Reminder/
├── Assignment-Reminder-BackEnd/
│   └── Assignment/
│       ├── src/main/java/com/web/Assignment/
│       │   ├── Config/                # Security & JWT Configuration
│       │   │   ├── JwtFilter.java
│       │   │   ├── JwtUtil.java
│       │   │   └── SecurityConfig.java
│       │   ├── Controllers/           # REST API Endpoints
│       │   │   ├── AuthController.java
│       │   │   ├── AssignmentController.java
│       │   │   ├── UserController.java
│       │   │   ├── TeacherController.java
│       │   │   ├── AdminController.java
│       │   │   ├── ReminderController.java
│       │   │   └── NotificationController.java
│       │   ├── Entity/                # JPA Entities
│       │   │   ├── User.java
│       │   │   ├── Assignment.java
│       │   │   ├── Reminder.java
│       │   │   ├── Notification.java
│       │   │   ├── Role.java
│       │   │   └── AssignmentStatus.java
│       │   ├── Repository/            # Data Access Layer
│       │   │   ├── UserRepository.java
│       │   │   ├── AssignmentRepository.java
│       │   │   └── ...
│       │   ├── Services/              # Business Logic
│       │   │   └── ...
│       │   ├── DTO/                   # Data Transfer Objects
│       │   │   ├── AssignmentResponseDto.java
│       │   │   ├── AssignmentTableDTO.java
│       │   │   ├── DashboardStatsDTO.java
│       │   │   └── ReminderRequest.java
│       │   └── Schedulers/            # Scheduled Tasks
│       ├── src/main/resources/
│       │   └── application.properties
│       ├── pom.xml
│       └── mvnw / mvnw.cmd
├── Assignment-Reminder-FrontEnd/
│   ├── src/
│   │   ├── Components/          # Reusable UI Components
│   │   ├── Pages/               # Page Components
│   │   ├── Context/             # Global State Management
│   │   ├── api/                 # API Integration Layer
│   │   └── assets/
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Java 21+
- Maven 3.8+
- MySQL 8.0+
- Node.js 16+ & npm 8+
- Git

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Assignment-Reminder/Assignment-Reminder-BackEnd/Assignment
   ```

2. **Configure MySQL Database**
   ```sql
   CREATE DATABASE assignment_db;
   ```

3. **Update application.properties** (if needed)
   Edit `src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/assignment_db
   spring.datasource.username=root
   spring.datasource.password=root
   ```

4. **Build and Run**
   ```bash
   # Using Maven Wrapper (Windows)
   mvnw.cmd spring-boot:run

   # Using Maven Wrapper (Linux/Mac)
   ./mvnw spring-boot:run

   # Using Maven (if installed globally)
   mvn spring-boot:run
   ```
   
   The backend will start on `http://localhost:8080`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd Assignment-Reminder-FrontEnd
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:5173` (or the port shown in terminal)

## ⚙️ Configuration

### application.properties

Key configuration properties in `src/main/resources/application.properties`:

```properties
# Server Configuration
spring.application.name=Assignment
server.port=8080

# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/assignment_db
spring.datasource.username=root
spring.datasource.password=root
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA / Hibernate Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
```

**Note**: For production, use environment variables or external configuration instead of hardcoding credentials.

### JWT Configuration

JWT tokens are configured in `JwtUtil.java`:
- **Algorithm**: HMAC-SHA256
- **Expiration**: 30 days
- **Secret Key**: Stored in code (configure externally in production)

## 🔐 Security

### Authentication & Authorization

- **Type**: JWT (JSON Web Tokens)
- **Flow**: 
  1. User signs up or logs in via `/auth/signup` or `/auth/login`
  2. Backend generates a JWT token
  3. Client includes token in `Authorization: Bearer <token>` header for protected endpoints
  4. `JwtFilter` validates token before processing requests

### Protected Endpoints

- `/assignments/**` - Requires authentication
- `/admin/**` - Requires ADMIN role
- `/notifications/**` - Requires authentication
- `/auth/**` - Public endpoints (signup, login)

### Security Best Practices

- ✅ Passwords are hashed using BCrypt
- ✅ CSRF protection disabled (stateless API)
- ✅ CORS configured for frontend integration
- ✅ Session creation set to STATELESS for REST API
- ⚠️ **TODO**: Move JWT secret key to environment variables
- ⚠️ **TODO**: Implement token refresh mechanism
- ⚠️ **TODO**: Add rate limiting for auth endpoints

## 📡 API Endpoints

### Authentication (`/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/signup` | Register a new user | No |
| POST | `/auth/login` | Authenticate user and get JWT token | No |

**Example Login Request**:
```bash
curl -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"teacher1","password":"pass123"}'
```

**Example Response**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "username": "teacher1",
  "role": "TEACHER"
}
```

### Assignments (`/assignments`)

| Method | Endpoint | Description | Role |
|--------|----------|-------------|------|
| GET | `/assignments` | Get all assignments | Authenticated |
| POST | `/assignments` | Create new assignment | Teacher |
| GET | `/assignments/{id}` | Get assignment by ID | Authenticated |
| PUT | `/assignments/{id}` | Update assignment | Teacher |
| DELETE | `/assignments/{id}` | Delete assignment | Teacher |

### Users (`/users`)

| Method | Endpoint | Description | Role |
|--------|----------|-------------|------|
| GET | `/users` | Get all users | Admin |
| GET | `/users/{id}` | Get user by ID | Authenticated |
| PUT | `/users/{id}` | Update user profile | User (own) or Admin |

### Reminders (`/reminders`)

| Method | Endpoint | Description | Role |
|--------|----------|-------------|------|
| GET | `/reminders` | Get user reminders | Authenticated |
| POST | `/reminders` | Create reminder | Authenticated |
| DELETE | `/reminders/{id}` | Delete reminder | Owner or Admin |

### Notifications (`/notifications`)

| Method | Endpoint | Description | Role |
|--------|----------|-------------|------|
| GET | `/notifications` | Get user notifications | Authenticated |
| PUT | `/notifications/{id}` | Mark as read | Authenticated |

### Admin (`/admin`)

| Method | Endpoint | Description | Role |
|--------|----------|-------------|------|
| GET | `/admin/users` | Get all users | Admin |
| GET | `/admin/statistics` | View system statistics | Admin |

## 🧪 Testing

Run unit tests with Maven:
```bash
mvn test
```

Test files are located in `src/test/java/com/web/Assignment/`

**Current Test Suite**:
- `AssignmentApplicationTests.java` - Spring Boot context tests

## 📝 Entity Models

### User
- `id` (Long, Primary Key)
- `username` (String, Unique)
- `email` (String)
- `password` (String, Hashed)
- `role` (Enum: ADMIN, TEACHER, STUDENT)
- `createdAt` (Timestamp)

### Assignment
- `id` (Long, Primary Key)
- `title` (String)
- `description` (String)
- `dueDate` (LocalDateTime)
- `createdBy` (User - Teacher)
- `status` (Enum: PENDING, IN_PROGRESS, COMPLETED)
- `createdAt` (Timestamp)

### Reminder
- `id` (Long, Primary Key)
- `assignment` (Assignment)
- `reminderTime` (LocalDateTime)
- `createdAt` (Timestamp)

### Notification
- `id` (Long, Primary Key)
- `user` (User)
- `message` (String)
- `isRead` (Boolean)
- `createdAt` (Timestamp)

## 🔄 Development Workflow

1. **Backend Development**
   - Create entities in `Entity/`
   - Add repositories in `Repository/`
   - Implement services in `Services/`
   - Expose endpoints in `Controllers/`

2. **Frontend Development**
   - Create components in `Components/`
   - Add page components in `Pages/`
   - Integrate with backend via `api/`
   - Manage state using Context API

3. **Testing**
   - Write unit tests in `src/test/`
   - Test API endpoints with Postman or cURL

## 🚧 Future Improvements

- [ ] Add email notifications for reminders
- [ ] Implement refresh token mechanism
- [ ] Add file attachment support for assignments
- [ ] Create mobile app (React Native)
- [ ] Add assignment submission tracking
- [ ] Implement grades/marks system
- [ ] Add discussion/comment feature
- [ ] Integrate calendar view for deadlines
- [ ] Add bulk operations for teachers
- [ ] Implement analytics dashboard
- [ ] Add support for group assignments
- [ ] Implement audit logging

## 📄 License

This project is open source. See LICENSE file for details (if applicable).

## 👤 Author

**Syed Shariq**
- GitHub: [@Syed-Shariqq](https://github.com/Syed-Shariqq)

## 📞 Support

For issues, questions, or contributions, please open an issue or contact the development team.
