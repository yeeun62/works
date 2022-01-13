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
		<div className="signUp-modal signModal">
			<h1>회원가입</h1>
			<form onSubmit={handleSubmit}>
				<label>
					<div className="emailLabel">
						<span>이메일</span>
						<button
							className="checkEmailBtn"
							type="button"
							onClick={emailConflictHandler}
						>
							중복 확인
						</button>
					</div>
					<input
						name="email"
						type="text"
						placeholder="e-mail@gmail.com"
						onBlur={handleBlur}
						onChange={handleChange}
						value={values.email}
					/>
				</label>
				{touched.email && errors.email ? (
					<div className="warring">{errors.email}</div>
				) : null}
				<label>
					이름
					<input
						name="name"
						type="text"
						placeholder="Andrew"
						onBlur={handleBlur}
						onChange={handleChange}
						value={values.name}
					></input>
				</label>
				{touched.name && errors.name ? (
					<div className="warring">{errors.name}</div>
				) : null}
				<label>
					비밀번호
					<input
						name="password"
						type="password"
						placeholder="password"
						onBlur={handleBlur}
						onChange={handleChange}
						value={values.password}
					/>
				</label>
				{touched.password && errors.password ? (
					<div className="warring">{errors.password}</div>
				) : null}
				<label>
					비밀번호 확인
					<input
						name="passwordConfirm"
						type="password"
						placeholder="password"
						onBlur={handleBlur}
						onChange={handleChange}
						value={values.passwordConfirm}
					/>
				</label>
				{touched.passwordConfirm && errors.passwordConfirm ? (
					<div className="warring">{errors.passwordConfirm}</div>
				) : null}
				<label>
					휴대폰번호
					<input
						name="phoneNumber"
						type="text"
						placeholder="01012345678"
						onBlur={handleBlur}
						onChange={handleChange}
						value={values.phoneNumber}
					/>
				</label>
				{touched.phoneNumber && errors.phoneNumber ? (
					<div className="warring">{errors.phoneNumber}</div>
				) : null}
				<button className="btn signBtn" type="submit">
					회원가입
				</button>
			</form>
			<button className="btn closeModal" type="button" onClick={signupHandler}>
				X
			</button>
		</div>
	);
}
