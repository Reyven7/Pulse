import ClipLoader from "react-spinners/ClipLoader";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <ClipLoader color="white" />
    </div>
  );
};

export default Loader;
