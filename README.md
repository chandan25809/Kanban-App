# Kanban-App

### Installation
1. Clone this repository to your local machine
2. Change to the project directory:
    
    ```bash
    cd kanban-app
    ```
3. Install the project dependencies:

    ```bash
    npm install
    ```

4. Create a .env file in the project root directory and set the MONGODB_URI variable. You can use a locally running MongoDB server or a cloud-hosted service like MongoDB Atlas. If you don't have a .env file, you can create one and add your URI like this:

    ```bash
    MONGODB_URI=mongodb://localhost/kanban-app
    ```
    Replace mongodb://localhost/kanban-app with your actual MongoDB URI.

### Usage

1. Start the Node.js server:

    ```bash
    npm start
    ```
2. Your Kanban app should now be accessible at http://localhost:8000.