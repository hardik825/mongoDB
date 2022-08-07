const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/db");

//Handilng Uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`shutting down the server due to Uncaugth Exception `);
  process.exit(1);
});

//Config
dotenv.config({ path: "backend/config/config.env" });
const port = process.env.PORT;
// const port=5000

//Connecting to database
connectDatabase();

const server = app.listen(port, () => {
  console.log(`server is working on http://localhost:${port}`);
});

//  Unhandled Promise Rejection

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`shutting down the server due to Unhandled Promise Rejection`);
  server.close(() => {
    process.exit(1);
  });
});
