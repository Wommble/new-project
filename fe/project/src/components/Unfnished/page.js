export function Unfinished({ setType }) {
  const goBack = () => {
    setType("type1");
  };
  return (
    <div className="fixed flex flex-row justify-center items-center w-[40vw] h-[30vh] border-2 border-pink-400 rounded-md gap-1">
      <p>this page is unfinished please </p>
      <button onClick={goBack} className="underline text-[#992a4c]">
        go back{" "}
      </button>
    </div>
  );
}
