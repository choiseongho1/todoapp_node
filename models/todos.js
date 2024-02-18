const mongoose = require("mongoose"); // Mongoose를 가져옵니다.

// To-do 항목을 위한 MongoDB 스키마를 정의합니다.
const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Todo = mongoose.model("Todo", todoSchema); // MongoDB 모델을 정의합니다.

module.exports = Todo; // Todo 모델을 내보냅니다.
