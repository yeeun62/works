import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";

export default function PwUpdate() {
	const navigate = useNavigate();
	const { handleSubmit, handleChange, values, touched, errors, handleBlur } =
		useFormik({
			initialValues: {
				password: "",
				passwordConfirm: "",
			},
			validationSchema: Yup.object({
				password: Yup.string()
					.min(5, "비밀번호는 5자리 이상이여야 합니다")
					.required("비밀번호를 입력해주세요"),
				passwordConfirm: Yup.string()
					.oneOf([Yup.ref("password"), null], "비밀번호가 일치하지 않습니다.")
					.required("비빌번호 확인을 입력해주세요"),
			}),
			onSubmit: () => {
				patchPasswordHandler();
			},
		});

	const patchPasswordHandler = () => {
		axios
			.post(
				`${process.env.REACT_APP_TEMPLATE_API_URL}/user/patchUser`,
				{ password: values.password },
				{ withCredentials: true }
			)
			.then((el) => {
				if (el.status === 200) {
					window.alert("비밀번호 수정이 완료되었습니다🥳");
					navigate("/");
				}
			})
			.catch((err) => {
				console.log(err.response);
				window.alert("서버에러가 발생하였습니다 다시 시도해주세요😅");
			});
	};

	return (
		<div className="pwUpdateWrapper">
			<form onSubmit={(e) => e.preventDefault()} onSubmit={handleSubmit}>
				<label>
					새로운 비밀번호
					<input
						type="password"
						placeholder="새로운 비밀번호를 입력해주세요"
						name="password"
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
				<label>
					비밀번호 확인
					<input
						type="password"
						placeholder="한 번 더 입력해주세요"
						name="passwordConfirm"
						onBlur={handleBlur}
						onChange={handleChange}
						value={values.passwordConfirm}
					/>
				</label>
				{touched.passwordConfirm && errors.passwordConfirm && (
					<div className="warning">{errors.passwordConfirm}</div>
				)}
				<button type="submit" className="pwUpdateBtn">
					비밀번호 변경
				</button>
			</form>
		</div>
	);
}
