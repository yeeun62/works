const { handle_works_users } = require("../../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
  const { email, password } = req.body;
  const findUser = await handle_works_users.findOne({ where: { email } });

  try {
    if (!findUser) {
      res.status(401).json({ message: "일치하는 유저정보가 없습니다🥲" });
    } else if (findUser) {
      let passwordCheck = await bcrypt.compare(
        password,
        findUser.dataValues.password
      );
      if (!passwordCheck) {
        return res
          .status(401)
          .json({ message: "비밀번호가 일치하지 않습니다🥲" });
      } else if (passwordCheck) {
        delete findUser.dataValues.password;
        const userToken = await jwt.sign(
          findUser.dataValues,
          process.env.TOKEN
        );
        res
          .status(200)
          .cookie("handleToken", userToken, {
            httpOnly: true,
          })
          .json({ message: "로그인에 성공하였습니다🥳" });
      }
    }
  } catch (err) {
    console.log("signin.js 서버에러", err);
    res.status(500).json({ message: "서버에러 입니다🥲" });
  }
};
