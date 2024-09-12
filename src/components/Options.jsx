const Options = ({ title, count, isActive, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`p-2 hover:bg-zinc-700 text-sm md:text-base transition rounded-md cursor-pointer ${
        isActive ? "bg-zinc-700" : ""
      }`}
    >
      {title} {count && `(${count})`}
    </div>
  );
};

export default Options;
