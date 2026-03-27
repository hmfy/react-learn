function SideMenu({ menuList, changeMenu: setMenuList, activeMenu }) {
  const changeMenu = (menu) => {
    setMenuList(menu);
    console.log("菜单切换");
  };
  const curActive = (menu) => {
    if (!activeMenu) return false;
    return activeMenu.path === menu.path;
  };
  const commonClass = "pl-2 h-10 leading-10 hover:bg-[rgba(0,0,0,0.04)]";
  const normalClass = "hover:text-[rgba(0,0,0,0.88)]";
  const activeClass = "text-[rgb(24,144,255)] hover:text-[rgb(24,144,255)]";
  return (
    <div className="w-[256px] box-border pl-6 pr-6 h-full border-r border-r-[rgba(5,5,5,0.06)] cursor-pointer">
      {menuList.map((menu) => {
        return (
          // key 是必须要的
          <div
            onClick={() => changeMenu(menu)}
            key={menu.path}
            className={`${commonClass} ${curActive(menu) ? activeClass : normalClass}`}>
            {menu.title}
          </div>
        );
      })}
    </div>
  );
}
export default SideMenu;
