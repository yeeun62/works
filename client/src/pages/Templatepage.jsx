import Header from "../components/Header";
import Template from "../components/Template";

const TemplatePage = () => {
  return (
    <>
      <Header />
      <div className="w-full flex flex-row flex-wrap py-12 px-4 justify-between">
        <Template />
      </div>
    </>
  );
};
export default TemplatePage;
