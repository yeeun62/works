module.exports = (req, res) => {
  res
    // .cookie("handleToken", "", {
    // 	httpOnly: true,
    // 	maxAge: 1,
    // })
    .clearCookie("handleToken")
    .status(200)
    .json({ message: "로그아웃이 완료되었습니다🥳" });
};
