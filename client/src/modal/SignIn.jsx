import { useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

export default function SignIn({ signinHandler }) {
	let location = useLocation();

	const { handleSubmit, handleChange, values, touched, errors, handleBlur } =
		useFormik({
			initialValues: {
				email: "",
				password: "",
			},
			validationSchema: Yup.object({
				email: Yup.string()
					.email("이메일 형식이 맞지 않습니다")
					.required("이메일을 입력해주세요"),
				password: Yup.string()
					.min(5, "비밀번호는 5자리 이상이여야 합니다")
					.required("비밀번호를 입력해주세요"),
			}),
			onSubmit: (values) => {
				signin();
			},
		});

	const signin = async () => {
		try {
			let signin = await axios.post(
				`${process.env.REACT_APP_TEMPLATE_API_URL}/user/signin`,
				values,
				{ withCredentials: true }
			);
			if (signin.status === 200) {
				signinHandler();
				window.alert("환영합니다💕");
				window.location.replace(location.pathname);
			}
		} catch (err) {
			console.log(err);
			if (
				err.response.status === 401 &&
				err.response.data.message === "일치하는 유저정보가 없습니다🥲"
			) {
				window.alert(err.response.data.message);
			} else if (
				err.response.status === 401 &&
				err.response.data.message === "비밀번호가 일치하지 않습니다🥲"
			) {
				window.alert(err.response.data.message);
			}
		}
	};

	return (
		<div className="rounded-2xl m-auto h-80 ">
			<h1 className="text-center text-xl">로그인</h1>
			<form onSubmit={handleSubmit} className="m-auto my-4 w-60 ">
				<label className="block m-auto mt-6">
					이메일
					<input
						className=" w-60 border border-solid border-neutral-300 focus: focus:border-solid focus:border-neutral-300 h-8 pl-1"
						name="email"
						type="text"
						placeholder="e-mail@gmail.com"
						onBlur={handleBlur}
						onChange={handleChange}
						value={values.email}
					></input>
				</label>
				{touched.email && errors.email ? (
					<div className="warning">{errors.email}</div>
				) : null}
				<label className="block m-auto mt-4">
					비밀번호
					<input
						className="w-60 border border-solid border-neutral-300 focus: focus:border-solid focus:border-neutral-300 h-8 pl-1"
						name="password"
						type="password"
						placeholder="password"
						onBlur={handleBlur}
						onChange={handleChange}
						value={values.password}
					></input>
				</label>
				{touched.password && errors.password ? (
					<div className="warning">{errors.password}</div>
				) : null}
				<button
					className="btn mt-40 absolute bottom-10 w-20"
					type="submit"
					style={{ left: "7.8rem" }}
				>
					로그인
				</button>
			</form>
			<button className="btn absolute top-3 right-5" onClick={signinHandler}>
				X
			</button>
		</div>
	);
}
