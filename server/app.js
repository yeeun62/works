const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { sequelize } = require("./models");

app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: true,
		credentials: true,
		methods: ["GET", "POST", "OPTIONS", "PUT", "PATCH", "DELETE"],
	})
);

const userRouter = require("./router/user");
const purchaseRouter = require("./router/purchase");

app.use("/user", userRouter);
app.use("/purchase", purchaseRouter);

app.get("/", (req, res) => {
	res.send("template 서버");
});

app.listen(80, () => console.log("template 서버 실행"));
// sequelize.sync({ alter: true }
// console.log("template 서버 실행")
