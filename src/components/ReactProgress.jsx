function ReactProgress({ percent }) {
  return (
    <div className="flex h-2 items-center justify-between text-[14px] text-[#595959]">
      <div className="h-full w-full rounded-full bg-[rgba(0,0,0,0.06)]">
        <div
          className="h-full rounded-full"
          style={{
            width: `${percent}%`,
            "--progress-line-stroke-color":
              "linear-gradient(to right, #108ee9, #87d068)",
            "--progress-percent": "0.78",
            background: `linear-gradient(to right, rgb(16, 142, 233), rgb(135, 208, 104))`
          }}
        />
      </div>
      <span className="ml-4 shrink-0">{percent}%</span>
    </div>
  );
}

export default ReactProgress;
