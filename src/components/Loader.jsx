export const Loader = ({ color }) => {
  return (
    <>
      <div className={`loader ${color === "white" && "white"}`}></div>
    </>
  );
};
