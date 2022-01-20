import Header from "../components/Header";
import Template from "../components/Template";

const Templatepage = () => {
  return (
    <>
      <Header />
      <div className="w-full flex flex-row flex-wrap py-12 px-4 justify-between">
        <Template />
        <Template />
        <Template />
        <Template />
        <Template />
        <Template />
        <Template />
      </div>
    </>
  );
};
export default Templatepage;
