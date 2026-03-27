# React Router 学习笔记

当前项目已安装：`react-router-dom@7.13.2`

这份笔记只讲 React 项目里最常用、最主流的用法。目标不是一次讲全，而是帮你先建立一个能真正上手的路由心智模型。

## 1. React Router 是干什么的

React Router 用来根据 URL 渲染不同页面。

比如：

- `/login` 渲染登录页
- `/users` 渲染用户列表页
- `/users/1` 渲染用户详情页

在后台管理系统里，它通常负责：

- 页面切换
- 动态路由参数
- 嵌套路由
- 编程式跳转
- 读取查询参数

## 2. 最常见的两种写法

现在主流里常见两套写法：

### 2.1 适合入门的写法：`BrowserRouter + Routes + Route`

这是最直观、最容易理解的写法，学习阶段很适合先掌握这个。

```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users" element={<UserPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

你可以先把它理解为：

- `BrowserRouter`：开启前端路由能力
- `Routes`：路由匹配容器
- `Route`：定义某个路径渲染什么组件

### 2.2 现在官方更强调的写法：`createBrowserRouter + RouterProvider`

这是现在更完整、更适合中大型项目的方式。

```jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/users",
    element: <UserPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
```

这套写法的优点是后面更容易扩展：

- 嵌套路由更清晰
- 更方便做 `loader`、`action`
- 更适合路由配置集中管理

如果你现在是学习阶段：

- 先学会 `BrowserRouter + Routes + Route`
- 再理解 `createBrowserRouter`

这样更容易。

## 3. 最常用的组件 API

## `BrowserRouter`

最常用的路由容器。绝大多数普通 React Web 项目都会用到。

```jsx
<BrowserRouter>
  <App />
</BrowserRouter>
```

常见场景：

- 单页应用
- 后台管理系统
- 普通 Web 项目

## `Routes`

用于包裹多个 `Route`。

```jsx
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/about" element={<AboutPage />} />
</Routes>
```

## `Route`

定义路径和页面组件的对应关系。

最常用属性：

- `path`：路径
- `element`：匹配后渲染的组件
- `children`：子路由

```jsx
<Route path="/users" element={<UserPage />} />
```

## `Link`

用于页面内跳转，代替原生 `<a>`。

```jsx
import { Link } from "react-router-dom";

<Link to="/users">用户列表</Link>
```

常用场景：

- 菜单跳转
- 列表页跳详情页
- 页面内普通导航

## `NavLink`

和 `Link` 类似，但可以知道“当前是否激活”。

特别适合：

- 侧边栏菜单
- 顶部导航菜单

```jsx
import { NavLink } from "react-router-dom";

<NavLink to="/users">
  用户管理
</NavLink>
```

常见写法：

```jsx
<NavLink
  to="/users"
  className={({ isActive }) => (isActive ? "active" : "")}
>
  用户管理
</NavLink>
```

## `Outlet`

用于渲染子路由。

这个在后台布局里很常见。

```jsx
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div>
      <aside>侧边栏</aside>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
```

父路由：

```jsx
<Route path="/" element={<AdminLayout />}>
  <Route index element={<DashboardPage />} />
  <Route path="users" element={<UserPage />} />
</Route>
```

## 4. 最常用的 Hooks API

## `useNavigate`

用于编程式跳转。

比如：

- 登录成功后跳首页
- 提交表单后跳列表页
- 点击按钮返回上一页

```jsx
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  function handleLogin() {
    navigate("/");
  }

  return <button onClick={handleLogin}>登录</button>;
}
```

常用写法：

```jsx
navigate("/users");
navigate("/users/1");
navigate(-1);
navigate("/login", { replace: true });
```

常见参数：

- `replace: true`：替换当前历史记录，不保留返回
- `state`：跳转时顺带传一点状态

```jsx
navigate("/users", {
  state: { from: "login" },
});
```

## `useParams`

读取动态路由参数。

比如路由是：

```jsx
<Route path="/users/:id" element={<UserDetailPage />} />
```

页面里读取：

```jsx
import { useParams } from "react-router-dom";

function UserDetailPage() {
  const { id } = useParams();

  return <div>当前用户 ID：{id}</div>;
}
```

这个非常常用。

## `useSearchParams`

读取和修改查询参数。

比如 URL：

`/users?keyword=tom&page=2`

```jsx
import { useSearchParams } from "react-router-dom";

function UserPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const keyword = searchParams.get("keyword") || "";
  const page = searchParams.get("page") || "1";

  function handleSearch() {
    setSearchParams({
      keyword: "tom",
      page: "1",
    });
  }

  return (
    <div>
      <p>keyword: {keyword}</p>
      <p>page: {page}</p>
      <button onClick={handleSearch}>搜索</button>
    </div>
  );
}
```

常用场景：

- 列表页搜索
- 分页
- 筛选条件同步到 URL

## `useLocation`

读取当前 URL 信息。

```jsx
import { useLocation } from "react-router-dom";

function CurrentPath() {
  const location = useLocation();

  return <div>{location.pathname}</div>;
}
```

常用读取：

- `location.pathname`
- `location.search`
- `location.state`

## 5. 嵌套路由是后台项目的重点

后台管理系统常见结构：

- 一个总布局页
- 左边菜单
- 右边内容区域
- 内容区域里切换不同页面

这种场景通常会写成：

```jsx
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

function Layout() {
  return (
    <div>
      <aside>菜单</aside>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<div>首页</div>} />
          <Route path="users" element={<div>用户管理</div>} />
          <Route path="roles" element={<div>角色管理</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```

这里最关键的是：

- 父路由负责布局
- 子路由负责页面内容
- `Outlet` 决定子页面显示在哪里

## 6. 常见主流写法建议

学习阶段推荐顺序：

1. 先掌握 `BrowserRouter`
2. 学会 `Routes`、`Route`
3. 学会 `Link`、`NavLink`
4. 学会 `useNavigate`
5. 学会 `useParams`、`useSearchParams`
6. 再掌握 `Outlet` 和嵌套路由

这是最实用的路线。

## 7. 一个更贴近后台项目的目录示例

```text
src/
  router/
    index.jsx
  layouts/
    AdminLayout.jsx
  pages/
    DashboardPage.jsx
    UserListPage.jsx
    UserDetailPage.jsx
```

例如可以把路由集中写在：

```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import DashboardPage from "../pages/DashboardPage";
import UserListPage from "../pages/UserListPage";
import UserDetailPage from "../pages/UserDetailPage";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="users" element={<UserListPage />} />
          <Route path="users/:id" element={<UserDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
```

## 8. 不常用但你知道就行的内容

这些不是一开始必须掌握的：

- `createBrowserRouter`
- `RouterProvider`
- `loader`
- `action`
- `redirect`
- `useMatches`
- `useLoaderData`
- `errorElement`

它们更适合：

- 路由数据预加载
- 表单提交走路由层
- 更完整的数据路由体系

学习早期先不用急着上。

## 9. 最容易犯的几个错误

- 用原生 `<a>` 做站内跳转，导致整页刷新
- 忘了写 `Outlet`，结果子路由不显示
- `path` 写成子路由时不理解相对路径
- 所有页面都堆在 `App.jsx`，后面越来越乱
- 把局部 UI 状态也塞进 URL，导致代码过重

## 10. 一句话总结

最常用的 React Router 心智模型就是：

- 用 `Route` 定义路径和页面
- 用 `Link/NavLink` 做跳转
- 用 `useNavigate` 做代码跳转
- 用 `useParams` 读动态参数
- 用 `useSearchParams` 读查询参数
- 用 `Outlet` 做布局嵌套

## 11. 官方参考

- React Router 文档：https://reactrouter.com/
- `Route` 组件文档：https://reactrouter.com/api/components/Route/
- `createBrowserRouter` 文档：https://api.reactrouter.com/v7/functions/react-router.createBrowserRouter.html
