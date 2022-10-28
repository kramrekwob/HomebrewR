const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    require: true,
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
  batchSize: {
    type: Number,
    required: true,
  },
  hopIngredients: {
    type: String,
    required: false,
  },
  maltIngredients: {
    type: String,
    required: false,
  },
  mashSchedule: {
    type: String,
    required: false,
  },
  waterAdjustments:{
    type: String,
    required: false,
  },
  yeast:{
    type: String,
    required: false,
  },
  notes: {
    type: String,
    required: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  
  },
  likes: {
    type: Number,
    required:false,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", PostSchema);
