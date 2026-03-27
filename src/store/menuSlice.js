import { createSlice } from "@reduxjs/toolkit";

const menuSlice = createSlice({
  /* 
  - name 主要用于 action type 前缀
  - state.xxx 取决于 configureStore 里 reducer 的 key
  - 它们通常会写成一样，方便理解，但不是强制必须一样
    */
  name: "menu",
  initialState: {
    menuList: [],
    activeMenu: null,
    menuLoading: false
  },
  reducers: {
    setMenuList(state, action) {
      state.menuList = action.payload;
    },
    setActiveMenu(state, action) {
      state.activeMenu = action.payload;
    },
    setMenuLoading(state, action) {
      state.menuLoading = action.payload;
    }
  }
});

/* 
1. 所有的 action 都要导出
2. 必须默认导出 reducer
*/
export const { setMenuList, setActiveMenu, setMenuLoading } = menuSlice.actions;
export const selectMenuList = state => state.menu.menuList
export const selectActiveMenu = state => state.menu.activeMenu
export default menuSlice.reducer;
