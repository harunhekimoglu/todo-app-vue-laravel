# Todo App

This is a simple todo application built with Laravel 10 in the backend and Vue.js 3 (Composition API) in the frontend. The application is containerized using Docker for easy deployment and development.

## Prerequisites

Before you begin, ensure you have the following tools installed on your machine:

- Docker: [Install Docker](https://docs.docker.com/get-docker/)
- Docker Compose: [Install Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

1. **Clone the repository:**

    ```bash
    git clone https://github.com/harunhekimoglu/todo-app-vue-laravel.git
    ```

2. **Navigate to the project directory:**

    ```bash
    cd todo-app-vue-laravel
    ```

3. **Build and run the Docker containers:**

    ```bash
    docker-compose up -d --build
    ```

4. **Access the application:**

    - Backend: [http://localhost:8000](http://localhost:8000)
    - Frontend: [http://localhost:3000](http://localhost:3000)

## License

This project is licensed under the [MIT License](LICENSE).
