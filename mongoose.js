const mongoose = require("mongoose");
const validator = require('validator');
const isEmail = require('validator/lib/isEmail');

mongoose
  .connect("mongodb://localhost:27017/tast")
  .then(() => console.log("sucsess"))
  .catch((err) => console.log(err));

// const prSchema = new mongoose.Schema({
//   sno: Number,
//   sname: String,
//   fees: Number,
//   course: String,
// });

const playlistSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    lowercase: true,
    trim: true,
  },
  ctype: String,
  videos: { 
    type: Number,
    required:true,
    unique:true,
    validate(value){
        if(value<0){
            throw new Error("vide is not negetive")
        }
    }
},
  author: String,
  email: {
    type: String,
    required: true,
    validate: [{ validator: isEmail, msg: 'Invalid email.' }],
  },
  active: Boolean,
  data: {
    type: Date,
    default: Date.now,
  },
});

const Playlist = new mongoose.model("playlist", playlistSchema);

// create document or insert

const createDocument = async () => {
  try {
    const jsPlaylist = new Playlist({
      name: " Javascript     ",
      ctype: "Fornt End ",
      videos: 50,
      author: "mahadev",
      email: "ha@gmail.com",
      active: true,
    });

    //   const mongoPlaylist = new Playlist({
    //     name: "mongo JS ",
    //     ctype: "Database ",
    //     videos: 35,
    //     author: "mahadev",
    //     active: true,
    //   });

    //   const mongoosePlaylist = new Playlist({
    //     name: "mongoose",
    //     ctype: "Datebase",
    //     videos: 5,
    //     author: "mahadev",
    //     active: true,
    //   });

    //   const expressPlaylist = new Playlist({
    //     name: "express JS ",
    //     ctype: "Back End ",
    //     videos: 15,
    //     author: "mahadev",
    //     active: true,
    //   });

    const result = await Playlist.insertMany([
      jsPlaylist,
      // mongoPlaylist,
      // mongoosePlaylist,
      // expressPlaylist,
    ]);

    console.log(result);
  } catch (err) {
    console.log(err);
  }
};
createDocument();

//Get Document

const getDocument = async () => {
  const result = await Playlist.find({ ctype: "Back End" })
    .select({ name: 1 })
    .limit(2);
  //   .then((err, data) => {
  //     console.log(err);
  //   });
  console.log(result);
};

// getDocument();

const deleteDocument = async (_id) => {
  try {
    const result = await Playlist.findByIdAndDelete({ _id });
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

// deleteDocument("62d6d800eb39488f854f4178")

//Update Document
const updateDocument = async (_id) => {
  try {
    const result = await Playlist.findByIdAndUpdate(
      { _id },
      {
        $set: {
          sname: "Sita",
        },
      },
      {
        new: true,
        useFindAndModify: false,
      }
    );
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};
// updateDocument("62d6d800eb39488f854f4174");
