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

//get student

app.get("/students", async (req, res) => {
  try {
    const studentsData = await Student.find();
    res.status(200).send(studentsData);
  } catch (e) {
    res.status(400).send(e);
  }
});

//get students by id

app.get("/students/:id", async (req, res) => {
  try {
    let _id = req.params.id;
    const studentData = await Student.findById(_id);
    if (!studentData) {
      res.status(404).send();
    } else {
      res.send(studentData);
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

//update the students by it id

app.patch("/students/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const UapdateStudent = await Student.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    res.send(UapdateStudent);
  } catch (e) {
    res.status(400).send(e);
  }
});

//delete

app.delete("/students/:id", async (req, res) => {
  try {
    const deleteStudent = await Student.findByIdAndDelete(req.params.id);
    if (req.params.id) {
      return res.status(400).send();
    }
    res.send(deleteStudent);
  } catch (e) {
    res.status(400).send(e);
  }
});

// listen

app.listen(port, () => {
  console.log(`connect the port : ${port}....`);
});
