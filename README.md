# 🌸 TaskFlow

> ***A production-style task management app built with the MEAN stack — featuring JWT auth, user-isolated tasks, and a sleek dark/pink UI.***

---

## 🛠️ Tech Stack

### 🖥️ *Frontend*

| 💡 Technology | 🎯 Purpose |
|---|---|
| **Angular 17+** *(Standalone)* | UI Framework |
| **TypeScript** | Type-safe JavaScript |
| **RxJS** | Reactive HTTP & state |
| **Angular Router** | Routing & route guards |
| **Bootstrap Icons** | UI iconography |
| **Syne + DM Sans** *(Google Fonts)* | Typography |

### ⚙️ *Backend*

| 💡 Technology | 🎯 Purpose |
|---|---|
| **Node.js + Express.js** | Server & routing |
| **MongoDB + Mongoose** | Database & ODM |
| **JWT** *(jsonwebtoken)* | Stateless authentication |
| **bcryptjs** | Password hashing |
| **dotenv** | Environment variables |
| **CORS** | Cross-origin handling |

---

## 🏗️ Architecture

### 🔷 *Backend — 4-Layer Architecture*

> ***Each layer has one job and only speaks to the layer directly below it.***

```
📥  HTTP Request
        │
        ▼
🔐  Middleware        →  Verifies JWT · Attaches req.user
        │
        ▼
🎮  Controller        →  Handles req & res
        │
        ▼
⚙️   Service          →  Business logic & validation
        │
        ▼
🗄️   Repository       →  All DB queries (scoped to userId)
        │
        ▼
🍃  MongoDB
```

**`authMiddleware.js`** → verifies token on every protected route  
**`authController.js`** → handles register & login HTTP logic  
**`taskController.js`** → handles task req/res lifecycle  
**`taskService.js`** → validates inputs, enforces rules  
**`taskRepository.js`** → all Mongoose queries in one place  

---

### 🔶 *Frontend — Service-Based Architecture*

```
🛡️  Router + Auth Guard
           │
           ▼
🧩  Components
    ├── LoginComponent
    ├── RegisterComponent
    ├── DashboardComponent
    ├── NavbarComponent
    └── TaskListComponent
           │
           ▼
🔧  Services
    ├── AuthService       →  Auth state & API calls
    ├── TaskService       →  Task CRUD API calls
    └── LoadingService    →  Global loading stream
           │
           ▼
🌐  HTTP Client
    ├── loadingInterceptor   →  Shows/hides spinner
    └── errorInterceptor     →  Catches errors & 401s
```

---

### 🔑 *Authentication Flow*

```
1. 📝  Register    →  password hashed with bcrypt  →  saved to MongoDB
2. 🔓  Login       →  bcrypt.compare()  →  JWT token signed & returned
3. 💾  Frontend    →  token saved to localStorage
4. 📡  API Calls   →  Authorization: Bearer <token> sent in every header
5. ✅  Backend     →  jwt.verify()  →  req.user.userId attached
6. 🔒  DB Queries  →  ALL scoped to userId  →  users only see their data
7. ⏰  Expiry      →  isLoggedIn() checks exp  →  auto logout if expired
8. 🚨  401 Error   →  errorInterceptor  →  logout() + redirect to /login
```

---

## 🧱 SOLID Principles

### ❌ *What Was Wrong Before*

> ***All business logic, database queries, and HTTP handling were crammed into route files.***

- 🔴 Routes were doing **too many things at once**
- 🔴 **Direct dependency** on MongoDB models everywhere  
- 🔴 **No separation of concerns** — impossible to scale
- 🔴 **Poor folder structure** — hard to read, test, or maintain

---

### ✅ *What Was Refactored*

| 📁 Layer | ✅ Responsibility |
|---|---|
| **Routes** | Define API endpoints *only* |
| **Controllers** | Handle HTTP request & response |
| **Services** | Business logic & validation |
| **Repositories** | All database operations |
| **Models** | Data schema definitions |
| **Config** | Database connection |

---

### 📐 *Principles Applied*

#### ***S — Single Responsibility Principle***
> *"Every file has **one job** and **one reason to change**."*

| 📄 File | ✅ Single Job |
|---|---|
| `authController.js` | Only handles register/login HTTP logic |
| `taskService.js` | Only handles task business rules |
| `taskRepository.js` | Only runs database queries |
| `authMiddleware.js` | Only verifies JWT tokens |
| `LoadingService` | Only manages loading state |
| `errorInterceptor` | Only catches HTTP errors |
| `authGuard` | Only checks route access |

---

#### ***D — Dependency Inversion Principle***
> *"**High-level modules** depend on **abstractions**, not low-level details."*

- 🔵 `taskController.js` calls **`taskService`** → has **zero knowledge** of the database
- 🔵 `taskService.js` calls **`taskRepository`** → never imports Mongoose directly
- 🔵 Angular components call **`AuthService`** → never touch `HttpClient` directly
- 🔵 The entire database layer can be **swapped** without touching controllers or services

---

#### ***O — Open/Closed Principle***
> *"**Open** for extension · **Closed** for modification."*

- 🟢 New interceptors can be added **without touching existing ones**
- 🟢 New routes added as **separate files** — `server.js` never changes
- 🟢 New repository methods added **without changing** the service layer

---

## 📁 Project Structure

```
🗂️  TaskFlow/
│
├── 📂 backend/
│   ├── 📂 config/
│   │   └── 📄 db.js                   # MongoDB connection
│   ├── 📂 controllers/
│   │   ├── 📄 authController.js        # Register & login
│   │   └── 📄 taskController.js        # Task CRUD handlers
│   ├── 📂 middleware/
│   │   └── 📄 authMiddleware.js        # JWT verification
│   ├── 📂 models/
│   │   ├── 📄 User.js                  # User schema
│   │   └── 📄 Task.js                  # Task schema + userId
│   ├── 📂 repositories/
│   │   └── 📄 taskRepository.js        # All DB queries
│   ├── 📂 routes/
│   │   ├── 📄 auth.js                  # /api/auth
│   │   └── 📄 tasks.js                 # /api/tasks (protected)
│   ├── 📂 services/
│   │   └── 📄 taskService.js           # Business logic
│   ├── 📄 .env                         # Environment variables
│   └── 📄 server.js                    # App entry point
│
└── 📂 frontend/src/app/
    ├── 📂 components/
    │   ├── 📂 navbar/
    │   └── 📂 task-list/
    |   └── 📂 task-form/
    ├── 📂 guards/
    │   └── 📄 auth.guard.ts            # Route protection
    ├── 📂 interceptors/
    │   ├── 📄 error.interceptor.ts     # Global error handler
    │   └── 📄 loading.interceptor.ts   # Global loading state
    ├── 📂 pages/
    │   ├── 📂 login/
    │   ├── 📂 register/
    │   └── 📂 dashboard/
    └── 📂 services/
        ├── 📄 auth.service.ts
        ├── 📄 task.service.ts
        └── 📄 loading.service.ts
```

---

## 🚀 Getting Started

### *Backend Setup*

```bash
cd backend
npm install
```

Create your **`.env`** file:

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/taskflow
JWT_SECRET=your_super_secret_key
```

Start the server:

```bash
node server.js
```

You should see:
```
✅ authController loaded
🚀 Server running on port 3000
🍃 Connected to MongoDB
```

### *Frontend Setup*

```bash
cd frontend
npm install
npm install jwt-decode
ng serve
```

> ***Open `http://localhost:4200` in your browser***

---

## 📡 API Reference

### 🔓 *Auth Routes — Public*

| Method | Endpoint | Body |
|---|---|---|
| `POST` | **`/api/auth/register`** | `{ email, password }` |
| `POST` | **`/api/auth/login`** | `{ email, password }` |

### 🔐 *Task Routes — Protected*
> ***All require `Authorization: Bearer <token>` header***

| Method | Endpoint | Body |
|---|---|---|
| `GET` | **`/api/tasks`** | — |
| `POST` | **`/api/tasks`** | `{ title, description? }` |
| `PUT` | **`/api/tasks/:id`** | `{ status }` |
| `DELETE` | **`/api/tasks/:id`** | — |

### *Example Login Response*
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64a1b2c3d4e5f6a7b8c9d0e1",
    "email": "user@example.com"
  }
}
```

---

## ✨ Features

- 🔐 **JWT Authentication** — stateless auth with 1-day token expiry
- 🔒 **Password Hashing** — bcrypt with 10 salt rounds
- 👤 **User-Specific Tasks** — every task scoped to its owner via `userId`
- 🛡️ **Route Guards** — unauthenticated users redirected to `/login`
- 🚪 **Auto-Logout** — expired tokens and 401 responses trigger instant logout
- ⏳ **Global Loading States** — spinner on every API call via interceptor
- 🚨 **Global Error Handling** — HTTP errors caught, app never crashes
- ✅ **Input Validation** — enforced on both frontend and backend
- 🌐 **CORS Protection** — backend only accepts requests from `localhost:4200`
- ⚠️ **Env Validation** — server refuses to start if `.env` vars are missing

---



# WEEK-BY-WEEK Breakdown

# PulseQ - Week 1 (TaskFlow)

This is **Week 1 task** of the PulseQ project. The goal is to create a simple **Angular application** that displays a list of tasks using static data, with the ability to toggle their status (UI only).

---

## 🚀 Project Setup

Follow these steps to run the project locally:

1. **Install Angular CLI v17**
```bash
npm install -g @angular/cli@17
```
2. **Clone the repository**

```bash
git clone https://github.com/shamaiem10/PulseQ-W1.git
cd PulseQ-W1
```

3. **Install dependencies**

```bash
npm install
```

4. ** Run the project**

```bash
ng serve
```

```bash
Open your browser at http://localhost:4200/ to see the application.
```

📂 Folder Structure
```bash
PulseQ-W1/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── navbar/          # Navbar component
│   │   │   ├── task-list/       # Task List component
│   │   │   └── task-card/       # Task Card component
│   │   ├── app-routing.module.ts # Routing setup
│   │   └── app.module.ts        # Angular root module
│   ├── assets/                  # Static assets (images, icons)
│   └── index.html               # Main HTML entry
├── angular.json                 # Angular project configuration
├── package.json                 # Project dependencies
└── README.md                    # Project setup & overview
```


 - components/:Contains all UI components for the app.

 - task-list/: Displays the list of tasks using static data.

 - task-card/: Represents individual tasks (title, description, status, toggle button).

 - navbar/: Top navigation bar for the app.

All data lives inside components; no services or backend are used yet.

📝 Features

 - Display tasks with Title, Description, and Status (Pending / Completed)

 - Toggle button to change task status (UI only)

 - Routing enabled in Angular project

🎥 Demo & Screenshots

You can view a working demo of this project here:
[Demo](https://drive.google.com/file/d/1U-sqgQCD8rUlh-XvwgWLILRmNIX6B5uz/view?usp=sharing)


![Setup](https://github.com/shamaiem10/PulseQ-W1/blob/main/CLI-SS1.png)


![Setup](https://github.com/shamaiem10/PulseQ-W1/blob/main/CLI-SS2.png)


![Setup](https://github.com/shamaiem10/PulseQ-W1/blob/main/ProjectStartup.png)


-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
# PulseQ - Week 2: Component Communication & State Handling

## Overview
In Week 2, the focus was on making the UI **modular and interactive** using Angular's component-based architecture.  
The goal was to ensure **proper data flow** between components and clean, maintainable code.


## Objective
Make the UI modular and interactive using proper Angular **data flow** and **component communication**.


## Task Description
- Componentize the UI into reusable components.
- Ensure tasks flow from **parent to child** and actions bubble **back up**.
- Implement event handling and state updates in a **clean Angular way**.


## Requirements Implemented
1. **Task Data Management**
   - Moved all task data to `TaskListComponent`.
   - Defined a `Task` interface to ensure type safety:
     ```ts
     export interface Task {
       id: number;
       title: string;
       completed: boolean;
     }
     ```

2. **Parent → Child Communication**
   - Passed task data from `TaskListComponent` to `TaskCardComponent` using `@Input()`.
     ```ts
     @Input() task!: Task;
     ```

3. **Child → Parent Communication**
   - Emitted events from `TaskCardComponent` to `TaskListComponent` using `@Output()`:
     ```ts
     @Output() markComplete = new EventEmitter<number>();
     @Output() deleteTask = new EventEmitter<number>();
     ```

4. **UI Rendering**
   - Used `*ngFor` to loop through tasks and render each `TaskCardComponent`.
   - Used `*ngIf` to conditionally display UI elements based on task state.

5. **Action Handling**
   - Mark task complete → updates task state in `TaskListComponent`.
   - Delete task → removes the task from the task list.


## Constraints Followed
- No direct DOM manipulation (used Angular bindings only).
- No duplicated UI logic (logic handled in parent component, presentation in child).
- Code is clean, modular, and readable.


## How Components Communicate
1. **Parent → Child**: via `@Input()`
2. **Child → Parent**: via `@Output()` and `EventEmitter`
3. **State Updates**: managed in the parent (`TaskListComponent`) and reflected in the child (`TaskCardComponent`).


## Folder Structure
```bash
taskflow/
├─ task-list/
│ ├─ task-list.component.ts
│ ├─ task-list.component.html
│ └─ task-list.component.css
├─ task-card/
│ ├─ task-card.component.ts
│ ├─ task-card.component.html
│ └─ task-card.component.css
├─ models/
│ └─ task.model.ts
└─ README.md
```


# PulseQ - Week 3: Routing & Forms (UX Flow)

## Overview
In Week 3, the app was converted into a **multi-page Angular SPA** with routing and a task creation form.  
Users can navigate between pages, create tasks, and see updates instantly.

---

## Pages & Routing
- `/dashboard` → Landing page with navigation buttons  
- `/tasks` → Task list  
- `/tasks/new` → Task creation form  

**Routing configured in `app.routes.ts`** and rendered via `<router-outlet>`.

---

## Task Form
- Template-driven form with **Title** and **Description** (both required).  
- Validation prevents submission of empty fields.  
- On submit:
  - Task added to shared `TaskService`
  - Redirect to `/tasks`
  - Newly created task appears immediately

---

## Task Management
- `TaskService` holds all tasks for persistent SPA state.
- `TaskListComponent` displays tasks using `TaskCardComponent`.
- Users can:
  - Toggle task status (Pending/Completed)  
  - Delete tasks

---

## UI Theme
- Professional **black + pastel pink** design  
- Dark background, soft card shadows, smooth hover effects  
- Responsive, clean layout

---

## Folder Structure
```bash
taskflow/
├─ app/
│  ├─ components/
│  │  ├─ navbar/
│  │  ├─ task-card/
│  │  └─ task-list/
│  ├─ pages/
│  │  ├─ dashboard/
│  │  └─ task-form/
│  ├─ services/
│  │  └─ task.service.ts
│  ├─ models/
│  │  └─ task.model.ts
│  ├─ app.routes.ts
│  └─ app.component.ts
├─ main.ts
└─ styles.css
```
You can view a working demo of this task here:
[Demo](https://drive.google.com/file/d/1dJTpSXuTyHt2xd6fvUJqfBJPDLu0dk8G/view?usp=sharing)

----
# PulseQ - Week 4: MEAN Stack


## API Endpoints

Base URL: `http://localhost:3000/api`

| Method | Endpoint | Description | Body |
|---|---|---|---|
| GET | `/tasks` | Get all tasks | — |
| POST | `/tasks` | Create a task | `{ title, description, status }` |
| PUT | `/tasks/:id` | Update a task | `{ title?, description?, status? }` |
| DELETE | `/tasks/:id` | Delete a task | — |

### Example Task Object
```json
{
  "_id": "64abc123...",
  "title": "Fix login bug",
  "description": "Users cant log in on mobile",
  "status": "Pending",
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

## Data Flow
```
User Action (click/submit)
        ↓
Angular Component (task-list / task-form)
        ↓
TaskService — HTTP call via HttpClient
        ↓
Express Route (/api/tasks)
        ↓
Mongoose Model (Task.js)
        ↓
MongoDB Database
        ↓
Response flows back up the chain
        ↓
Component updates the UI
```
You can view a working demo of this task here:
[Demo](https://drive.google.com/file/d/1iyKAvhvIYeDkrL-evygmJjWxQKw3nafF/view?usp=sharing)
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
# PulseQ - Week 5: SOLID Application and Code Refactoring

## Folder Structure
```bash
backend/
├── controllers/
│    taskController.js
├── services/
│    taskService.js
├── repositories/
│    taskRepository.js
├── routes/
│    tasks.js
├── models/
│    Task.js
├── config/
│    db.js
└── server.js
```

## Description:

- Routes: Only define endpoints

- Controllers: Handle request and response

- Services: Contain business logic

- Repositories: Handle database queries

- Models: Define schema

- Config: DB connection

This setup applies SRP and DIP, reduces logic in routes, and ensures maintainable, scalable backend architecture.
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------



