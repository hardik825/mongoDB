const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/tast")
  .then(() => console.log("sucsess"))
  .catch((err) => console.log(err));

const prSchema = new mongoose.Schema({
  sno: Number,
  sname: String,
  fees: Number,
  course: String,
});

const Playlist = new mongoose.model("studs", prSchema);

const getDocument = async () => {
  const result = await Playlist.find({}).then((err, data) => {
    console.log(err);
  });
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

deleteDocument("62d6d800eb39488f854f4178")

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
