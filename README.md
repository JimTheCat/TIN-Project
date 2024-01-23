# Tin project

## Description
This is a project for the course "TIN" at the PJAIT. It's a simple web application that allows you to create an account and reserve a books.

## Installation
Installation can be done by following these steps:

Frontend:
1. Clone the repository
2. Turn on terminal and go to the "frontend" directory
3. Install the dependencies
```
npm install
```
3. Run the server
```
npm start
```
4. Open the browser and go to http://localhost:3000

Database:
- all the necessary data is in the "database" directory

Backend:
1. Go to the "backend" directory
2. Install the dependencies
```
mvn dependency:resolve
```
3. Run the server
```
mvn spring-boot:run
```

## Usage
The application allows you to:
- register a new user
- log in
- log out
- reserve a book
- return a book
- see the list of all unborrowed books
- change the language (English/Polish)

From admin account you can also:
- add a new book
- delete a book
- modify a book
- add a author

## Technologies
- React
- Spring Boot
- SQLite

## Status
All main features are delivered. Project contains some not used code that can be used to extend the application in the future.

## Author
This project is created by [Patryk Kłosiński](https://github.com/JimTheCat). Please do not copy the code without permission. 