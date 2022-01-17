import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "yup-phone";
import axios from "axios";

export default function SignUp({ signupHandler }) {
  const [emailCheck, setEmailCheck] = useState(false);

  const { handleSubmit, handleChange, values, touched, errors, handleBlur } =
    useFormik({
      initialValues: {
        email: "",
        name: "",
        password: "",
        passwordConfirm: "",
        phoneNumber: "",
      },
      validationSchema: Yup.object({
        email: Yup.string()
          .email("이메일 형식이 맞지 않습니다")
          .required("이메일을 입력해주세요"),
        name: Yup.string()
          .max(10, "이름이 맞습니까..?!")
          .required("이름을 입력해주세요."),
        password: Yup.string()
          .min(5, "비밀번호는 5자리 이상이여야 합니다")
          .required("비밀번호를 입력해주세요"),
        passwordConfirm: Yup.string()
          .oneOf([Yup.ref("password"), null], "비밀번호가 일치하지 않습니다.")
          .required("비빌번호 확인을 입력해주세요"),
        phoneNumber: Yup.string()
          .matches(/^[0-9\b -]{0,13}$/, "숫자만 입력해주세요")
          .max(11, "11자리를 초과할 수 없습니다.")
          .required("휴대폰번호를 입력해주세요"),
      }),
      onSubmit: (values) => {
        if (emailCheck) {
          signUp();
        } else {
          window.alert("이메일 중복확인을 해주셔야 합니다!");
        }
      },
    });

  const emailConflictHandler = async () => {
    if (values.email) {
      try {
        let emailCheck = await axios.post(
          `${process.env.REACT_APP_TEMPLATE_API_URL}/user/signup`,
          { email: values.email },
          { withCredentials: true }
        );
        if (emailCheck.status === 200) {
          setEmailCheck(true);
          window.alert("사용가능한 이메일입니다🥳");
        }
      } catch (err) {
        window.alert("이미 사용중인 이메일입니다🥲");
      }
    } else {
      window.alert("이메일을 먼저 입력해주세요!!");
    }
  };

  const signUp = async () => {
    delete values.passwordConfirm;
    let signup = await axios.post(
      `${process.env.REACT_APP_TEMPLATE_API_URL}/user/signup`,
      values,
      { withCredentials: true }
    );
    if (signup.status === 200) {
      signupHandler();
      window.alert(signup.data.message);
      window.location.replace("/");
    }
  };

  return (
    <div
      className="rounded-2xl m-auto signModal overflow-auto"
      style={{ height: "35rem" }}
    >
      <h1 className="text-center text-xl">회원가입</h1>
      <form onSubmit={handleSubmit} className="m-auto my-4 w-60 relative">
        <label className="block m-auto mt-6">
          <div className="emailLabel">
            <span>이메일</span>
            <button
              className="text-xs font-bold rounded-sm p-0.5 bg-[#00adc7] absolute right-0 h-6 leading-4 -top-1"
              type="button"
              onClick={emailConflictHandler}
            >
              중복 확인
            </button>
          </div>
          <input
            className=" w-60 border border-solid border-neutral-300 focus: focus:border-solid focus:border-neutral-300 h-8 pl-1"
            name="email"
            type="text"
            placeholder="e-mail@gmail.com"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.email}
          />
        </label>
        {touched.email && errors.email ? (
          <div className="warning">{errors.email}</div>
        ) : null}
        <label className="block m-auto mt-6">
          이름
          <input
            className=" w-60 border border-solid border-neutral-300 focus: focus:border-solid focus:border-neutral-300 h-8 pl-1"
            name="name"
            type="text"
            placeholder="Andrew"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.name}
          ></input>
        </label>
        {touched.name && errors.name ? (
          <div className="warning">{errors.name}</div>
        ) : null}
        <label className="block m-auto mt-6">
          비밀번호
          <input
            className=" w-60 border border-solid border-neutral-300 focus: focus:border-solid focus:border-neutral-300 h-8 pl-1"
            name="password"
            type="password"
            placeholder="password"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.password}
          />
        </label>
        {touched.password && errors.password ? (
          <div className="warning">{errors.password}</div>
        ) : null}
        <label className="block m-auto mt-6">
          비밀번호 확인
          <input
            className=" w-60 border border-solid border-neutral-300 focus: focus:border-solid focus:border-neutral-300 h-8 pl-1"
            name="passwordConfirm"
            type="password"
            placeholder="password"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.passwordConfirm}
          />
        </label>
        {touched.passwordConfirm && errors.passwordConfirm ? (
          <div className="warning">{errors.passwordConfirm}</div>
        ) : null}
        <label className="block m-auto mt-6">
          휴대폰번호
          <input
            className=" w-60 border border-solid border-neutral-300 focus: focus:border-solid focus:border-neutral-300 h-8 pl-1"
            name="phoneNumber"
            type="text"
            placeholder="01012345678"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.phoneNumber}
          />
        </label>
        {touched.phoneNumber && errors.phoneNumber ? (
          <div className="warning">{errors.phoneNumber}</div>
        ) : null}
        <button
          className="btn absolute w-20 btn"
          type="submit"
          style={{
            right: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bottom: "-5rem",
          }}
        >
          회원가입
        </button>
      </form>
      <button className="btn absolute top-3 right-5" onClick={signupHandler}>
        X
      </button>
    </div>
  );
}
