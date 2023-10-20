

# Folkus

  - Frontend Folder Structure

    `src`

      - `actions` 

      - `components` 

      - `context` 

      - `images` 

      - `pages` 

        - `CRUD/Users` 

        - `dashboard` 

        - `error`

        - `login` 

        - `reset`

        - `starter`

        - `user`

        - `verify`

      - `reducer` 

    `public` 

  - Backend folder structure: 

    `src` 

      - `auth` 

      - `db` 

        - `api` 

        - `migrations` 

        - `models`

        - `seeders` 

      - `routes` 

      - `services` 

  - Database: PostgreSQL

  -----------------------

## To start the project:

### Project installation prerequisites:

Please ensure you have the following tools installed:
  `npm`
  `yarn`
  `nvm` optional

### Node.js 

If you do not already have a Node.js on your computer, download and install from (https://nodejs/en/download)

If your Node.js version is not v16.x.x, please install the node version manager from either:

  (https://github.com/nvm-sh/nvm) for Linux and Mac

  (https://github.com/coreybutler/nvm-windows) for Windows

Then change to Node.js v16 with:

`nvm install 16`
`nvm use 16`
`node -v`

### Backend:

> Please change current folder: `cd backend`

#### Install local dependencies:
`yarn install`

  ------------

#### Create local db:
##### 1.  Install postgres:
Windows:

Download installer from (https://www.postgresql.org/downloads/windows/) and follow installer instructions

MacOS:

`brew install postgres`

    > if you don’t have ‘brew‘ please install it (https://brew.sh) and repeat step `brew install postgres`.

Ubuntu:

`sudo apt update`

`sudo apt install postgresql`

##### 2. Create db and admin user:
Login to postgres with 'postgres' Superuser with the login password set during installation

`psql -U postgres`

Next, type this command for creating a new user with password then give access for creating the database.

`postgres-# CREATE ROLE admin CREATEDB LOGIN PASSWORD 'admin_pass';`

Quit `psql` then log in again using the new user that previously created.

`postgres-# \q`

`psql postgres -U admin`

Type this command to creating a new database.

`postgres=> CREATE DATABASE db_folkus;`

Then give that new user privileges to the new database then quit the `psql`.

`postgres=> GRANT ALL PRIVILEGES ON DATABASE db_folkus TO admin;`

`postgres=> \q`

  ------------

#### Create database:
`yarn db:create`

#### Start local deployment:
`yarn start`

### Frontend:

> Please change current folder: `cd frontend`

  #### 1. Run `yarn install`

  This will install both run-time project dependencies and developer tools listed
  in [package.json](../project-files/package.json) file.

  #### 2. Run `yarn start`

  Runs the app in the development mode.

  Open http://localhost:3000 to view it in the browser. 

  #### 3. Run `yarn build`

  Builds the app for production to the build folder.

### Docker:

Currently not working for Windows and Mac, please do not use
