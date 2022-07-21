const express = require("express");
require("./db/conn");
const Student = require("./models/students");

const app = express();
const port = process.env.PORT || 3003;

app.use(express.json());
// app.get("/",(req,res)=>{
//     res.send("Welcome to home page.");
// })

// /creat a new student
// app.post("/students", (req, res) => {
//   console.log(req.body);
//   const user = new Student(req.body);
//   user
//     .save()
//     .then((user) => {
//       res.status(201).send(user);
//     })
//     .catch((e) => {
//       res.status(400).send(e);
//     });
//   //   res.send("hello from the other sides.");
// });

app.post("/students", async (req, res) => {
  try {
    const user = new Student(req.body);
    const creatUser = await user.save();
    res.status(201).send(creatUser);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.listen(port, () => {
  console.log(`connect the port : ${port}....`);
});
