function HeaderTop() {
  return (
    <div className="flex h-14 leading-14 pl-4 pr-4 justify-between border-b border-b-[#e5e7eb]">
      <div className="h-full flex items-center">
        <img
          src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
          className="mr-2 size-7"
          alt=""
        />
        <span className="font-bold text-[rgba(0,0,0,0.88)] text-[18px]">
          Ant Design Pro
        </span>
      </div>
      <div className="h-full flex items-center">
        <img
          className="size-6.5 mr-2"
          src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
          alt=""
        />
        <span>YANG FAN</span>
      </div>
    </div>
  );
}
export default HeaderTop;
