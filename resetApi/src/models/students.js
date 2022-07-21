const mongoose = require("mongoose");
const validator = require("validator");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Email id is allredy present"],
    validator(val) {
      if (validator.isEmail(val)) {
        throw new Error("invalid Email");
      }
    },
  },
  phone: {
    type: Number,
    min: 9,
    // max: 11,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
});

//we will create a new collection

const Student = new mongoose.model("Students", studentSchema);


module.exports=Student