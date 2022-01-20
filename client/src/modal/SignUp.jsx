import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

export default function SignUp({ signupHandler }) {
	const [emailCheck, setEmailCheck] = useState(false);
	const [emailComment, setEmailComment] = useState("");

	const [phoneCheck, setPhoneCheck] = useState(false);
	const [phoneInput, setPhoneInput] = useState(false);

	const [authInput, setAuthInput] = useState("");
	const [authNumber, setAuthNumber] = useState("");

	useEffect(() => {
		const generateRandom = function (min, max) {
			let ranNum = Math.floor(Math.random() * (max - min + 1)) + min;
			return ranNum;
		};
		setAuthNumber(generateRandom(1111, 9999));
	}, []);

	// touched: blur(input에서 나갔을때), handleBlur: input에서 나갈때, handleChange: 작성.focus등 변화가 일어날때
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
					.max(13, "13자리를 초과할 수 없습니다.")
					.required("휴대폰번호를 입력해주세요"),
			}),
			onSubmit: (values) => {
				if (!emailCheck) {
					window.alert("이메일 중복확인을 해주셔야 합니다!");
				} else if (!phoneCheck) {
					window.alert("휴대폰 본인인증을 해주셔야 합니다!");
				} else {
					signUp();
				}
			},
		});

	if (touched.email && values.email) {
		axios
			.post(
				`${process.env.REACT_APP_TEMPLATE_API_URL}/user/signup`,
				{ email: values.email },
				{ withCredentials: true }
			)
			.then((el) => {
				if (el.status === 200) {
					setEmailCheck(true);
					setEmailComment("사용가능한 이메일입니다🥳");
				}
			})
			.catch((err) => {
				if (err.response.status === 409) {
					setEmailCheck(false);
					setEmailComment("이미 사용중인 이메일입니다🥲");
				}
			});
	}

	if (values.phoneNumber.length === 3 || values.phoneNumber.length === 8) {
		values.phoneNumber += "-";
	}

	const phoneNumberConflictHandler = async () => {
		try {
			let phoneCheck = await axios.post(
				`${process.env.REACT_APP_TEMPLATE_API_URL}/user/signup`,
				{ phoneNumber: values.phoneNumber },
				{ withCredentials: true }
			);
			if (phoneCheck.status === 200) {
				setPhoneInput(true);
				try {
					window.alert("인증문자가 발송되었습니다.");
					let phoneCheck = await axios.post(
						`${process.env.REACT_APP_HANDLE_API_URL}/msg/aligo`,
						{
							receiver: values.phoneNumber,
							msg: `본인 인증확인 문자입니다. 숫자 ${authNumber} 4자리를 입력해주세요`,
						},
						{ withCredentials: true }
					);
				} catch (err) {
					console.log("알리고 에러");
				}
			}
		} catch (err) {
			console.log(err);
			window.alert(err.response.data.message);
		}
	};

	const phoneNumberAuthHandler = () => {
		if (Number(authInput) === authNumber) {
			window.alert("본인인증에 성공하였습니다!");
			setPhoneCheck(true);
			setPhoneInput(false);
		} else {
			window.alert("인증번호가 일치하지 않습니다");
		}
	};

	// function isNumber(e) {
	// 	if (47 < e.keyCode && e.keyCode < 58) {
	// 		values.phoneNumber += e.key;
	// 	} else {
	// 		console.log("아님");
	// 		values.phoneNumber += "";
	// 	}
	// }

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
			className="rounded-2xl  signModal overflow-auto"
			style={{ height: "35rem" }}
		>
			<h1 className="text-center text-xl">회원가입</h1>
			<form onSubmit={handleSubmit} className="m-auto my-4 w-60">
				<label className="block m-auto mt-6 relative">
					<div className="emailLabel">
						<span>이메일</span>
					</div>
					<input
						className=" w-60 border border-solid border-neutral-300 focus: focus:border-solid focus:border-neutral-300 h-8 pl-1"
						name="email"
						type="text"
						placeholder="e-mail@gmail.com"
						onBlur={handleBlur}
						onChange={handleChange}
						value={values.email}
						autoComplete="off"
					/>
				</label>
				{touched.email && errors.email ? (
					<div className="warning">{errors.email}</div>
				) : (
					<div className="warning">{emailComment}</div>
				)}
				<label className="block m-auto mt-6">
					이름
					<input
						className=" w-60 border border-solid border-neutral-300 focus: focus:border-solid focus:border-neutral-300 h-8 pl-1"
						name="name"
						type="text"
						placeholder="홍길동"
						autoComplete="off"
						onBlur={handleBlur}
						onChange={handleChange}
						value={values.name}
					></input>
				</label>
				{touched.name && errors.name && (
					<div className="warning">{errors.name}</div>
				)}
				<label className="block m-auto mt-6">
					비밀번호
					<input
						className=" w-60 border border-solid border-neutral-300 focus: focus:border-solid focus:border-neutral-300 h-8 pl-1"
						name="password"
						type="password"
						placeholder="비밀번호는 5자리 이상이여야 합니다"
						onBlur={handleBlur}
						onChange={handleChange}
						value={values.password}
					/>
				</label>
				{touched.password && <div className="warning">{errors.password}</div>}
				{values.password.length &&
				values.password.length < 5 &&
				!touched.password ? (
					<p className="warning">비밀번호는 5자리 이상이여야 합니다</p>
				) : null}
				<label className="block m-auto mt-6">
					비밀번호 확인
					<input
						className=" w-60 border border-solid border-neutral-300 focus: focus:border-solid focus:border-neutral-300 h-8 pl-1"
						name="passwordConfirm"
						type="password"
						placeholder="비밀번호를 한 번 더 입력해주세요."
						onBlur={handleBlur}
						onChange={handleChange}
						value={values.passwordConfirm}
					/>
				</label>
				{touched.passwordConfirm && errors.passwordConfirm && (
					<div className="warning">{errors.passwordConfirm}</div>
				)}
				<label className="block m-auto mt-6 relative">
					휴대폰번호
					<input
						className=" w-60 border border-solid border-neutral-300 focus: focus:border-solid focus:border-neutral-300 h-8 pl-1"
						name="phoneNumber"
						type="text"
						autoComplete="off"
						// onKeyDown={isNumber}
						placeholder="010-1234-5678"
						onBlur={handleBlur}
						onChange={handleChange}
						value={values.phoneNumber}
					/>
					{values.phoneNumber.length === 13 &&
						!errors.phoneNumber &&
						!phoneInput &&
						!phoneCheck && (
							<button
								className="text-xs font-bold rounded-sm p-0.5 bg-[#00adc7] absolute right-0 h-6 -top-1"
								type="button"
								onClick={phoneNumberConflictHandler}
							>
								본인 인증
							</button>
						)}
					{phoneCheck && (
						<p className="text-xs font-bold absolute right-0 top-1 text-[#00adc7]">
							본인인증 확인 완료!
						</p>
					)}
				</label>
				{touched.phoneNumber && errors.phoneNumber && (
					<div className="warning">{errors.phoneNumber}</div>
				)}
				{phoneInput && (
					<label className="block m-auto mt-6 relative">
						인증번호
						<input
							className=" w-60 border border-solid border-neutral-300 focus: focus:border-solid focus:border-neutral-300 h-8 pl-1"
							name="phoneNumber"
							type="text"
							onChange={(e) => setAuthInput(e.target.value)}
						/>
						{authInput.length === 4 && (
							<button
								className="text-xs font-bold rounded-sm p-0.5 bg-[#00adc7] absolute right-0 h-6 -top-1"
								type="button"
								onClick={phoneNumberAuthHandler}
							>
								인증 하기
							</button>
						)}
					</label>
				)}
				<button className="mt-5 ml-[5rem]" type="submit">
					회원가입
				</button>
			</form>
			<button className="absolute top-3 right-5" onClick={signupHandler}>
				X
			</button>
		</div>
	);
}
