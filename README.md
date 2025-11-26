# User Management Table

A modern, responsive user management application built with React, TypeScript, and Bootstrap. This application provides a clean interface for viewing, searching, editing, and deleting user records with advanced features like pagination and bulk operations.

## 🚀 Features

- **User Data Display**: Clean, responsive table layout with striped rows and hover effects
- **Search Functionality**: Real-time search across name, email, and role fields
- **Pagination**: Automatic pagination with 10 users per page (hidden when only one page)
- **Row Selection**: 
  - Individual row selection with checkboxes
  - Select/deselect all rows on current page
  - Indeterminate checkbox state for partial selections
- **CRUD Operations**:
  - ✏️ Edit user details (name, email, role) via modal
  - 🗑️ Delete individual users
  - 🗑️ Bulk delete selected users
- **Responsive Design**: Mobile-friendly interface using Bootstrap
- **TypeScript**: Full type safety throughout the application
- **Clean Code**: Refactored with reusable functions and best practices

## 🛠️ Tech Stack

- **React** 19.2.0 - UI library
- **TypeScript** 5.9.3 - Type safety
- **Vite** 7.2.2 - Build tool and dev server
- **Bootstrap** 5.3.8 - UI framework
- **React Bootstrap** 2.10.10 - Bootstrap components for React
- **Bootstrap Icons** 1.13.1 - Icon library
- **Axios** 1.13.2 - HTTP client for API requests

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Frontend_Task
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173/`

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🏗️ Project Structure

```
Frontend_Task/
├── src/
│   ├── components/
│   │   ├── Usertable.tsx      # Main table component with user management logic
│   │   ├── SearchBox.tsx      # Search input component
│   │   ├── EditModal.tsx      # Modal for editing user details
│   │   └── TablePagination.tsx # Pagination controls
│   ├── types.ts               # TypeScript interfaces
│   ├── App.tsx                # Root component
│   ├── main.tsx               # Application entry point
│   └── index.css              # Global styles
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🎨 UI/UX Features

- **Hover Effects**: Smooth color transitions on table rows (`#e3f2fd`)
- **Icons**: Bootstrap Icons for Edit (pencil) and Delete (trash) actions
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile
- **Smart Pagination**: Automatically hides when data fits on one page
- **Persistent State**: Maintains current page after single row operations

## 🔧 Key Components

### Usertable
Main component handling:
- User data fetching from API
- Search filtering
- Pagination logic
- Row selection state management
- Edit and delete operations

### SearchBox
- Real-time search input
- Enter key support
- Clear functionality

### EditModal
- Form validation
- User data editing
- Bootstrap modal integration

### TablePagination
- First, Previous, Next, Last navigation
- Dynamic page number generation
- Disabled states for boundary pages

## 🚦 Usage

1. **Search Users**: Type in the search box to filter by name, email, or role
2. **Select Rows**: Click checkboxes to select individual rows or use the header checkbox for all
3. **Edit User**: Click the Edit button (✏️) to modify user details
4. **Delete User**: Click the Delete button (🗑️) to remove a single user
5. **Bulk Delete**: Select multiple rows and click "Delete Selected"
6. **Navigate Pages**: Use pagination controls at the bottom


