# Drink
Randomize party games with friends and drinks!

## To Do
Let's set up the Angular frontend first with mock data stored in Arrays/Objects. We'll translate it later to pull data from Node server.

### Task Manager
- Jon: ~~Activity Factory,~~ ~~Drink Factory,~~ ~~Game Controller,~~ 
- Parag: User Factory, User Controller, Nav (HTML), Nav Controller (put under components and include in html via ng-include)
- E2E testing is set up with Protractor
- Karma for unit testing

### Server

### Client
- User Factory (eg: Parag)
 - crud operations for user data

- Activity Factory (eg: Flip Cup)
 - crud operations for activities

- Drink Factory (eg: Shot, Beer)
 - crud operations for types of alcohol

- Randomizer Factory
 - return random combo of 2 users, activity, and drink

- User Controller (controls users in database, user crud)
 - link $scope methods to DOM elements and Factory services

- Game Controller (controls actual playing of game, users in game session)
 - link $scope methods to DOM elements and Factory services
 - return notices/messages (look into bootstrap ui for alerts)

## Future
- implement oAuth login
- invite / search for active users

