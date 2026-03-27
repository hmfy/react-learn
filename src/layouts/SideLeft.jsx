import SideMenu from "~/src/components/SideMenu";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  selectActiveMenu,
  selectMenuList,
  setMenuList,
  setActiveMenu
} from "../store/menuSlice";

function SideLeft() {
  const menuList = useSelector(selectMenuList);
  const activeMenu = useSelector(selectActiveMenu);
  const dispatch = useDispatch();
  useEffect(() => {
    // 模拟菜单请求
    setTimeout(() => {
      dispatch(
        setMenuList([
          { title: "Dashboard", path: "/dashboard" },
          { title: "表单页", path: "/form" },
          { title: "二维表页", path: "/table" }
        ])
      );
    }, 100);
  }, []);

  const changeMenu = (item) => {
    dispatch(setActiveMenu(item));
  };
  return (
    <div className="w-[245] h-full">
      <SideMenu
        changeMenu={changeMenu}
        activeMenu={activeMenu}
        menuList={menuList}></SideMenu>
    </div>
  );
}
export default SideLeft;
