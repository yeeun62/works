const { sequelize } = require("./models");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const server = require("http").createServer(app);

const userRouter = require("./router/user");
const purchaseRouter = require("./router/purchase");

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "OPTIONS", "PUT", "PATCH", "DELETE"],
  })
);

app.use("/user", userRouter);
app.use("/purchase", purchaseRouter);

app.get("/", (req, res) => {
  res.send("works 서버");
});

server.listen(80, () => console.log("works 서버 실행"));
// sequelize.sync({ alter: true })
// console.log("template 서버 실행")
