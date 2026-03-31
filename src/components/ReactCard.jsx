function ReactCard({ title, children, className = "" }) {
  return (
    <div
      className={`rounded-md bg-white overflow-hidden ${className}`}
      style={{
        boxShadow:
          "0 1px 2px 0 rgba(0, 0, 0, 0.03),0 1px 6px -1px rgba(0, 0, 0, 0.02),0 2px 4px 0 rgba(0, 0, 0, 0.02)"
      }}>
      <div className="h-14 box-border px-6 text-[16px] leading-[56px] font-bold text-[#262626]">
        {title}
      </div>
      <div className="p-6 pb-2 box-border border-t border-t-[#e5e7eb]">
        {children}
      </div>
    </div>
  );
}
export default ReactCard;
