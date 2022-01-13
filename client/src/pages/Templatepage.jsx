import Header from "../components/Header";
import Template from "../components/Template";

const Templatepage = ({ userInfo }) => {
	return (
		<>
			<Header userInfo={userInfo} />
			<Template />
		</>
	);
};
export default Templatepage;
