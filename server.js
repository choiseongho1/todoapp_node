const express = require("express"); // Express 프레임워크를 가져옵니다.
const mongoose = require("mongoose"); // MongoDB와의 연결을 위한 Mongoose를 가져옵니다.
const todoRouter = require("./routes/todos"); // To-do 관련 라우팅을 위한 라우터를 가져옵니다.

const app = express(); // Express 앱을 생성합니다.
const PORT = process.env.PORT || 3000; // 포트 번호를 지정합니다.

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// MongoDB에 연결합니다.
mongoose.connect(
  "mongodb+srv://seongho:dlgh0504@cluster0.t8wmpkb.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:")); // MongoDB 연결 오류 시 처리합니다.
db.once("open", () => console.log("Connected to MongoDB")); // MongoDB 연결 성공 시 메시지를 출력합니다.

app.use(express.json()); // JSON 데이터를 파싱하기 위한 미들웨어를 추가합니다.
app.use("/api/todos", todoRouter); // '/api/todos' 경로로 들어온 요청을 todoRouter에 연결합니다.

// 서버를 지정된 포트 번호로 시작합니다.
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
