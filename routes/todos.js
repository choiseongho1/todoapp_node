const express = require("express"); // Express 프레임워크를 가져옵니다.
const router = express.Router(); // Express 라우터를 생성합니다.
const Todo = require("../models/todos"); // To-do 모델을 가져옵니다.

// 모든 To-do 항목을 가져오는 라우트를 설정합니다.
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find(); // 모든 To-do 항목을 가져옵니다.
    res.json(todos); // JSON 형태로 응답합니다.
  } catch (err) {
    res.status(500).json({ message: err.message }); // 오류 발생 시 에러 메시지를 응답합니다.
  }
});

// 새로운 To-do 항목을 생성하는 라우트를 설정합니다.
router.post("/", async (req, res) => {
  const todo = new Todo({
    // 새로운 To-do 항목을 생성합니다.
    title: req.body.title, // 요청의 title 속성을 사용하여 To-do 항목의 제목을 설정합니다.
    description: req.body.description, // 요청의 description 속성을 사용하여 To-do 항목의 설명을 설정합니다.
  });

  try {
    const newTodo = await todo.save(); // 새로운 To-do 항목을 저장합니다.
    res.status(201).json(newTodo); // 새로운 To-do 항목을 JSON 형태로 응답합니다.
  } catch (err) {
    res.status(400).json({ message: err.message }); // 오류 발생 시 에러 메시지를 응답합니다.
  }
});

module.exports = router; // 라우터를 내보냅니다.
