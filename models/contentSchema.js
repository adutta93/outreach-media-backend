const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema(
  {
    // firstName: {
    //   type: String,
    //   required: true,
    //   maxlength: 32,
    //   trim: true,
    // },
    // lastName: {
    //   type: String,
    //   required: true,
    //   maxlength: 32,
    //   trim: true,
    // },
    notes: {
      type: String,
      maxlength: 5000,
      trim: true,
      // required: true,
    },
    title: {
      type: String,
      maxlength: 500,
      trim: true,
      // required: true,
    },
    tags: {
      type: String,
      maxlength: 500,
      trim: true,
      // required: true,
    },
    // trk : { type : Array , "default" : [] }.
    photo: {
      type: String,
    },
    writer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    contentState: {
      type: String,
      default: "Draft",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contents", contentSchema);
