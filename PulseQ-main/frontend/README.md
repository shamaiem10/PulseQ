<<<<<<< HEAD
# Taskflow

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.17.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
=======
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
>>>>>>> cce0adf492e3f0101cee3e3182d0ab8104357712
