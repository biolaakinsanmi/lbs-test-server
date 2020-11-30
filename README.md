# LbsTestServer

Project by Akinsanmi Abiola; basic web client to consume basic nodejs server.
Used Sequelize ORM, Express, SQlite.


## Migrate Db

Run `npm run migrate` or `npx sequelize-cli db:migrate`.
To wipe and reset, run `migrate:reset`.


## Seed demo data into Db

Run `npm run seed` or `npx sequelize-cli db:seed:all`.
To undo, `npm run seed:undo` or `npx sequelize-cli db:seed:undo:all`.


## Start server

Ensure you have node installed on your machine.
Run `npm install` to install packages and then run `npm start`.
Server api can be accessed via the set port `3000` e.g (`http://localhost:3000`)

