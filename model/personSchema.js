const mongoose = require("mongoose");

const PersonSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "name field must be provided"],
  },
});

// PersonSchema.pre("save", function () {
//   this.name = this.name.toLowerCase();
// });

module.exports = mongoose.model("Persons", PersonSchema);
