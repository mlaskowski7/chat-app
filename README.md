# Real-Time Chat Application

This is a real-time chat application built using Rust with Actix Web for the backend and Next.js with TypeScript for the frontend. The app supports WebSocket connections for real-time messaging.

## Features
- Real-time messaging with WebSockets
- User authentication and chat room management
- Backend built with Rust and Actix Web
- Frontend built with Next.js and TypeScript
- SQLite for database management

## Prerequisites
- [Rust](https://www.rust-lang.org/tools/install)
- [Cargo](https://doc.rust-lang.org/cargo/getting-started/installation.html)
- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/get-npm) or [yarn](https://yarnpkg.com/getting-started/install)


## Getting Started

### Backend Setup

1. **Clone the repository:**

  ```bash
  git clone https://github.com/yourusername/chat-app.git
  cd chat-app
  ```
2. **Create a .env file in the root directory and add the following content, than add following commands to setup the db:**

   ```env
   DATABASE_URL=sqlite://chat.db
   ```

   ```bash
    diesel setup
   ```
3. **Run the backend server:**
  ```bash
  cargo run
  ```

### Frontend Setup

1. **Navigate to frontend dir:**

   ```bash
    cd ui
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the frontend dev server:**
   
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   

