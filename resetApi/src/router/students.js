const express = require("express");
const router = new express.Router();
const Student = require("../models/students");

//insert student
router.post("/students", async (req, res) => {
  try {
    const user = new Student(req.body);
    const creatUser = await user.save();
    res.status(201).send(creatUser);
  } catch (e) {
    res.status(400).send(e);
  }
});

//get student
router.get("/students", async (req, res) => {
  try {
    const studentsData = await Student.find();
    res.status(200).send(studentsData);
  } catch (e) {
    res.status(400).send(e);
  }
});

//get students by id
router.get("/students/:id", async (req, res) => {
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
router.patch("/students/:id", async (req, res) => {
  try {
    const UapdateStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.send(UapdateStudent);
  } catch (e) {
    res.status(400).send(e);
  }
});

//delete
router.delete("/students/:id", async (req, res) => {
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

module.exports = router;
