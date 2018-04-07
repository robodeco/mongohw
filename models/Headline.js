var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var headlineSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  }
})

var Headline = mongoose.model("Headline", headlineSchema);

module.exports = Headline;
