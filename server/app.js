const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");
const { sequelize } = require("./models");
const server = require("http").createServer(app);

const userRouter = require("./router/user");
const purchaseRouter = require("./router/purchase");

app.use(express.json());
app.use(cookieParser());
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
	res.send("template 서버");
});

server.listen(80, () => console.log("template 서버 실행"));
// sequelize.sync({ alter: true })
// console.log("template 서버 실행")
