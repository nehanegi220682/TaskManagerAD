const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var todoSchema = new Schema(
  {
    task: {
      type: String,
      required: true,
      maxlength: 50,
      trim: true
    },
    due_date: {
      type: String,
      trim: true,
      required: true
    },

    status: {
      type: String,
      required: true
    },
    userId: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", todoSchema);

//we're exporting userSchema as User
