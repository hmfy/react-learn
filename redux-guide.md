# Redux Toolkit 学习笔记

当前项目已安装：

- `@reduxjs/toolkit@2.11.2`
- `react-redux@9.2.0`

这份笔记重点讲 React 项目里最主流、最常用的 Redux Toolkit 用法，不追求一次覆盖全部 API。

## 1. 先理解 Redux Toolkit 是什么

Redux Toolkit 是官方推荐的 Redux 写法。

在 React 项目里，它通常负责：

- 管理多个页面共享的数据
- 管理登录信息、用户信息、权限信息
- 管理异步请求后的全局状态
- 让状态更新更可预测

但不是所有状态都要放进 Redux。

一般原则：

- 全局共享状态，适合放 Redux
- 页面局部状态，优先放 `useState`

比如：

- 登录用户信息：适合 Redux
- 当前弹窗是否打开：通常放组件本地状态
- 表单输入过程中的值：通常放组件本地状态

## 2. 主流 Redux Toolkit 的基本组成

最常见的一套组合是：

- `configureStore`
- `createSlice`
- `<Provider>`
- `useSelector`
- `useDispatch`

如果有异步请求，再加：

- `createAsyncThunk`

这套是你最应该先掌握的。

## 3. 最常见目录结构

比较主流的写法一般会长这样：

```text
src/
  store/
    index.js
  features/
    user/
      userSlice.js
    auth/
      authSlice.js
```

或者简化一点：

```text
src/
  store/
    index.js
    userSlice.js
```

学习阶段建议从简单结构开始。

## 4. 最常用 API：`configureStore`

它用来创建 store。

```jsx
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
```

最终状态结构大致会是：

```js
{
  counter: {
    value: 0
  }
}
```

你可以把它理解为：

- `store` 是全局状态容器
- `reducer` 决定状态怎么更新
- `counter` 是一个状态分片名字

## 5. 最常用 API：`createSlice`

这是 Redux Toolkit 最核心的 API 之一。

它会把这几件事放在一起：

- 初始状态
- 修改状态的方法
- 自动生成 action

```jsx
import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
  },
  reducers: {
    increment(state) {
      state.value += 1;
    },
    decrement(state) {
      state.value -= 1;
    },
    addByAmount(state, action) {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, addByAmount } = counterSlice.actions;
export default counterSlice.reducer;
```

最常见的两个导出：

- `counterSlice.actions`
- `counterSlice.reducer`

通常你会写成：

```jsx
export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;
```

## 6. 为什么这里能“直接改 state”

你会看到这种写法：

```jsx
state.value += 1;
```

看起来像直接修改，其实底层是 Immer 帮你处理了不可变更新。

你可以把它理解成：

- 写法像“可变”
- 实际结果还是“不可变更新”

这是 Redux Toolkit 相比传统 Redux 更省心的地方。

## 7. React 里怎么接 Redux

先用 `Provider` 把 store 提供给整个应用。

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
```

这是接 Redux 的第一步。

## 8. 最常用 Hook：`useSelector`

用来读取 Redux 状态。

```jsx
import { useSelector } from "react-redux";

function Counter() {
  const count = useSelector((state) => state.counter.value);

  return <div>{count}</div>;
}
```

最常用场景：

- 读取当前登录用户
- 读取菜单权限
- 读取列表数据
- 读取 loading 状态

## 9. 最常用 Hook：`useDispatch`

用来派发 action。

```jsx
import { useDispatch } from "react-redux";
import { increment } from "./counterSlice";

function CounterButton() {
  const dispatch = useDispatch();

  return <button onClick={() => dispatch(increment())}>加一</button>;
}
```

常见写法：

```jsx
dispatch(increment());
dispatch(addByAmount(5));
```

## 10. 最常见完整例子

### `store/index.js`

```jsx
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
```

### `store/counterSlice.js`

```jsx
import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
  },
  reducers: {
    increment(state) {
      state.value += 1;
    },
    decrement(state) {
      state.value -= 1;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;
```

### `Counter.jsx`

```jsx
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "./store/counterSlice";

function Counter() {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.value);

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => dispatch(increment())}>+1</button>
      <button onClick={() => dispatch(decrement())}>-1</button>
    </div>
  );
}

export default Counter;
```

这就是最典型、最主流的 Redux Toolkit 入门结构。

## 11. 常用概念：selector

虽然你可以直接在组件里写：

```jsx
const count = useSelector((state) => state.counter.value);
```

但项目稍微大一点后，通常会把它提出来：

```jsx
export const selectCount = (state) => state.counter.value;
```

组件里：

```jsx
const count = useSelector(selectCount);
```

好处：

- 复用方便
- 组件里更干净
- 状态结构变化时更好维护

## 12. 最常用异步写法：`createAsyncThunk`

当你需要发请求时，最常见的官方写法就是 `createAsyncThunk`。

```jsx
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUserList = createAsyncThunk(
  "user/fetchUserList",
  async () => {
    const response = await fetch("/api/users");
    return response.json();
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchUserList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
```

组件里用法：

```jsx
import { useDispatch } from "react-redux";
import { fetchUserList } from "./userSlice";

function UserPage() {
  const dispatch = useDispatch();

  function handleLoad() {
    dispatch(fetchUserList());
  }

  return <button onClick={handleLoad}>加载用户</button>;
}
```

你可以把 `createAsyncThunk` 理解为：

- 自动帮你生成异步请求的三种状态
- `pending`
- `fulfilled`
- `rejected`

这是业务项目里非常常见的写法。

## 13. `extraReducers` 是什么

当状态更新不是来自当前 slice 自己的 `reducers`，而是来自外部 action，比如异步 thunk，就用 `extraReducers`。

最常见场景就是配合 `createAsyncThunk`。

```jsx
extraReducers: (builder) => {
  builder.addCase(fetchUserList.fulfilled, (state, action) => {
    state.list = action.payload;
  });
}
```

## 14. 常见主流写法建议

学习阶段建议你先掌握：

1. `configureStore`
2. `createSlice`
3. `Provider`
4. `useSelector`
5. `useDispatch`
6. `createAsyncThunk`

这 6 个已经能覆盖大多数常见业务。

## 15. 哪些状态适合放 Redux

适合放 Redux 的：

- 登录用户信息
- token
- 权限信息
- 跨页面共享列表数据
- 全局主题
- 全局 loading 或通知状态

不太适合放 Redux 的：

- 单个输入框当前输入值
- 某个弹窗局部开关
- 某个页面临时 hover 状态
- 只在一个组件内部用的数据

这点非常重要。

## 16. 不常用但知道就行的 API

这些不是学习初期的重点：

- `createEntityAdapter`
- `createListenerMiddleware`
- `createAction`
- `createReducer`
- `combineSlices`
- `autoBatchEnhancer`
- RTK Query

它们并不是没用，只是你现在没必要先从这里入手。

如果以后你遇到：

- 规范化列表数据
- 更复杂的中间件逻辑
- 自动缓存接口请求

再回头学这些会更合适。

## 17. 最容易犯的几个错误

- 把所有状态都塞进 Redux
- slice 写得过大，什么都堆进去
- 在 reducer 里写异步逻辑
- 忘了用 `Provider` 包裹应用
- `useSelector` 取值路径写错
- 把本该本地管理的表单状态也做成全局状态

## 18. 一句话总结

Redux Toolkit 最常用的心智模型就是：

- 用 `configureStore` 创建 store
- 用 `createSlice` 管理一块状态
- 用 `Provider` 接进 React
- 用 `useSelector` 读状态
- 用 `useDispatch` 改状态
- 用 `createAsyncThunk` 处理异步请求

## 19. 官方参考

- Redux Toolkit 文档：https://redux-toolkit.js.org/
- `createAsyncThunk` 文档：https://redux-toolkit.js.org/api/createAsyncThunk
- Redux Essentials 教程：https://redux.js.org/tutorials/essentials/part-2-app-structure
- React Redux Hooks 文档：https://react-redux.js.org/api/hooks
