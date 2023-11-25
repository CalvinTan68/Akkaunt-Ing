# About Project

So this is a bookkeeping web-app, based on Laravel (PHP) on the backend and ReactJS on the frontend.

Check the live site <a href="https://akkaunt-ing.rf.gd" target="_blank">here</a>. It might load/run a bit slow, because it's hosted on free server (InfinityFree), but it's enough to having "it works well" principles.

# How to use this project

1. Of course, you need to clone the repo
2. Make sure you have all of this dependencies
    ```
    - PHP Version >= 8.0.0
    - Composer
    - MySQL Database or Docker
    - Node.js and NPM >= 16.0.0
    ```
3. If you choose to use docker, then run this in your terminal
    ```
    docker compose up -d
    ```
4. Rename `.env.example` file to `.env` and configure database URL, and create a table first on your SQL with the same name you configured in the `.env` file
5. Run this command
    ```
    composer install && npm install
    ```
6. You need to generate the APP_KEY with this command
    ```
    php artisan key:generate
    ```
7. Then, migrate database tables with this command in your terminal
    ```
    php artisan migrate:fresh
    ```
8. Start the server with
    ```
    php artisan serve
    ```

If you want to change something on the `/resources/js`, run `npm run watch` so you can see the changes, otherwise nothing will happen

# Future Plan

-   Laravel (PHP) version of this project will be deprecated and replaced with other framework like React / others
