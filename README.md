<p align="center">
  <img src="https://github.com/mauroviniciussilva/Proffy/blob/master/docs/logo.png" alt="Proffy" width="280"/>
</p>

<p align="center">	
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/mauroviniciussilva/proffy?color=774DD6">
  <a aria-label="Completed" href="https://nextlevelweek.com/episodios/omnistack/edicao/2">
    <img src="https://img.shields.io/badge/Proffy-NLW 2.0-8257E5?logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAALVBMVEVHcExxWsF0XMJzXMJxWcFsUsD///9jRrzY0u6Xh9Gsn9n39fyMecy0qd2bjNJWBT0WAAAABHRSTlMA2Do606wF2QAAAGlJREFUGJVdj1cWwCAIBLEsRU3uf9xobDH8+GZwUYi8i6ucJwrxKE+7D0G9Q4vlYqtmCSjndr4CgCgzlyFgfKfKCVO0LrPKjmiqMxGXkJwNnXskqWG+1oSM+BSwD8f29YLNjvx/OQrn+g99oQSoNmt3PgAAAABJRU5ErkJggg=="></img>
  </a>
  <a href="https://github.com/mauroviniciussilva/proffy/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/mauroviniciussilva/proffy?color=774DD6">
  </a> 
  <img alt="License" src="https://img.shields.io/badge/license-MIT-8257E5">
  <a href="https://github.com/mauroviniciussilva/proffy/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/mauroviniciussilva/proffy?color=8257E5&logo=github">
  </a>
</p>

<div align="center">Project made to connect teachers to students, inspired by Next Level Week #2 @Rocketseat</div>

### Web Screenshot
<div style="display: flex; flex-direction: 'row'; align-items: 'center';">
  <img src="https://github.com/mauroviniciussilva/proffy/blob/master/docs/web-landing.png" width="400px">
  <img src="https://github.com/mauroviniciussilva/proffy/blob/master/docs/list-classes.png" width="400px">
</div>
<div style="display: flex; flex-direction: 'row'; align-items: 'center';">
  <img src="https://github.com/mauroviniciussilva/proffy/blob/master/docs/give-classes-1.png" width="400px">
  <img src="https://github.com/mauroviniciussilva/proffy/blob/master/docs/give-classes-2.png" width="400px">
</div>

# Technologies
This project was made using the follow technologies:
<ul>
  <li><a href="https://nodejs.org/en/">NodeJS</a></li>
  <li><a href="https://www.typescriptlang.org/">Typescript</a></li>
  <li><a href="https://expressjs.com/en/api.html#express">Express</a></li>
  <li><a href="https://reactjs.org/">React</a></li>
  <li><a href="https://www.mysql.com/">MySQL</a></li>
</ul>

---
# API

The API was built with the following functionalities:

### Connections
- Create connection;
- List the total of connections made;

### Users
- Create user

### Classes
- Create class;
- List classes (filtered per subject, week day and time);

> NOTE: you can find a [Postman](https://www.postman.com/) Collection at the `server/postman` folder, with examples of all the requests.

---

# DataBase

Although the original project opted for SQLite, I used MySQL, because I already have the entire environment configured on my machine and because I'm more familiar with it. To run the project, then, it will be necessary to have MySQL running. If you don't have it, you can [make the dowload](https://dev.mysql.com/downloads/).

## Setup

As I'm using MySQL, I opted for using [dotenv](https://github.com/motdotla/dotenv#readme) module, so I can save my credentials without publishing them on GitHub. So, to set up the environment create a `.env` file in the root directory of your project. Add environment-specific variables on new lines in the form of NAME=VALUE. I'm using the following variables:

```dosini
DB_USER=<database_user>
DB_PASS=<database_password>
DB_NAME=<database_name>
DB_HOST=<database_host>
```

Follow these steps to get everything ready before running the API:

1. Create Databse

```SQL
CREATE DATABASE proffy
```

2. Run Migrations

```
npm run knex:migrate
```

3. Run the Seed

```
npm run knex:seed
```

---

# How to run

1. Clone Repository

```bash
git clone https://github.com/mauroviniciussilva/proffy.git
```

2. Run API

#### Go to server folder
```
cd server
```

#### Install dependencies
```
npm install
```

#### Run application
```
npm start
```

> NOTE: API will run at port 3333

3. Run WEB Project

#### Go to web folder
```bash
cd web
```

#### Install dependencies
```
npm install
```

#### Run application
```
npm start
```

> NOTE: WEB Application will run at port 3000
