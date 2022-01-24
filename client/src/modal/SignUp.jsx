import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

export default function SignUp({ signupHandler }) {
	const [emailCheck, setEmailCheck] = useState(false);
	const [emailComment, setEmailComment] = useState("");

	const [phoneCheck, setPhoneCheck] = useState(false);
	const [phoneAuthInput, setPhoneAuthInput] = useState(false);

	const [minutes, setMinutes] = useState(2);
	const [seconds, setSeconds] = useState(59);

	const [authNumber, setAuthNumber] = useState("");

	useEffect(() => {
		if (phoneAuthInput) {
			const countdown = setInterval(() => {
				if (parseInt(seconds) > 0) {
					setSeconds(parseInt(seconds) - 1);
				}
				if (parseInt(seconds) === 0) {
					if (parseInt(minutes) === 0) {
						clearInterval(countdown);
					} else {
						setMinutes(parseInt(minutes) - 1);
						setSeconds(59);
					}
				}
			}, 1000);
			return () => clearInterval(countdown);
		}
	}, [minutes, seconds, phoneAuthInput]);

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
					window.alert("다른 이메일을 입력해 주세요!");
				} else if (!phoneCheck) {
					window.alert("휴대폰 본인인증을 해주셔야 합니다!");
				} else {
					signUp();
				}
			},
		});

	if (values.phoneNumber.length === 3 || values.phoneNumber.length === 8) {
		values.phoneNumber += "-";
	}
	//&& values.email
	if (touched.email) {
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

	const phoneNumberAuthHandler = async () => {
		try {
			let phoneAuth = await axios.post(
				`${process.env.REACT_APP_TEMPLATE_API_URL}/user/phoneAuthCode`,
				{
					phoneNumber: values.phoneNumber,
				}
			);
			window.alert(phoneAuth.data.message);
			setPhoneAuthInput(true);
		} catch (err) {
			window.alert(err.response.data.message);
		}
	};

	const phoneNumberCheckHandler = async () => {
		try {
			let authCheck = await axios.post(
				`${process.env.REACT_APP_TEMPLATE_API_URL}/user/phoneAuthCheck`,
				{
					authNumber,
					phoneNumber: values.phoneNumber,
					time: Math.floor(Date.now() / 1000),
				},
				{ withCredentials: true }
			);
			setPhoneAuthInput(false);
			setPhoneCheck(true);
			window.alert(authCheck.data.message);
		} catch (err) {
			if (err.response.status === 408) {
				window.alert(err.response.data.message);
			} else if (err.response.status === 400) {
				window.alert(err.response.data.message);
			}
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
			className="rounded-2xl  signModal overflow-auto"
			style={{ height: "35rem" }}
		>
			<p className="text-center text-xl">회원가입</p>
			<form
				onSubmit={(e) => e.preventDefault()}
				onSubmit={handleSubmit}
				className="m-auto my-4 w-60"
			>
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
					<div
						className="warning"
						style={
							emailComment === "사용가능한 이메일입니다🥳"
								? { color: "rgb(14 165 233)" }
								: null
						}
					>
						{emailComment}
					</div>
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
						placeholder="010-1234-5678"
						onBlur={handleBlur}
						onChange={handleChange}
						value={values.phoneNumber}
						onKeyUp={(e) => {
							if (e.keyCode == 8) {
								if (Number(e.target.value.slice(-1))) {
									e.target.value = e.target.value.slice(
										0,
										e.target.value.length
									);
								} else {
									e.target.value = e.target.value.slice(
										0,
										e.target.value.length - 1
									);
								}
							} else e.target.value = e.target.value.replace(/[^-0-9]/g, "");
						}}
						maxLength="13"
					/>
					{values.phoneNumber.length === 13 &&
						!errors.phoneNumber &&
						!phoneAuthInput &&
						!phoneCheck && (
							<button
								className="text-xs font-bold rounded-sm p-0.5 bg-[#00adc7] absolute right-0 h-6 -top-1"
								type="button"
								onClick={phoneNumberAuthHandler}
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
				{phoneAuthInput && (
					<label className="block m-auto mt-6 relative">
						인증번호
						<span className="text-xs ml-2 text-rose-600 bold">
							{minutes}:{seconds < 10 ? `0${seconds}` : seconds}
						</span>
						<input
							className=" w-60 border border-solid border-neutral-300 focus: focus:border-solid focus:border-neutral-300 h-8 pl-1"
							name="phoneNumber"
							type="text"
							onChange={(e) => setAuthNumber(e.target.value)}
						/>
						{authNumber.length === 6 && minutes >= 0 && seconds > 0 && (
							<button
								className="text-xs font-bold rounded-sm p-0.5 bg-[#00adc7] absolute right-0 h-6 -top-1"
								type="button"
								onClick={phoneNumberCheckHandler}
							>
								인증 확인
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
