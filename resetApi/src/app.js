const express = require("express");
require("./db/conn");
const Student = require("./models/students");
const studentRouter =require("./router/students")

const app = express();
const port = process.env.PORT || 3003;

app.use(express.json());
app.use(studentRouter)

app.listen(port, () => {
  console.log(`connect the port : ${port}....`);
});
