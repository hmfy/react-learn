import { useState } from "react";

function ReactTab({ defaultActiveKey = "", items = [] }) {
  const [activeKey, setActiveKey] = useState(
    defaultActiveKey || items[0]?.key || ""
  );

  return (
    <div className="bg-white mt-6 rounded-md">
      <div className="relative flex h-11.5 items-center gap-8 border-b border-b-[rgba(0,0,0,0.1)] px-6 leading-11.5">
        {items.map((item) => {
          return (
            <div
              key={item.key}
              className="h-full min-w-12 cursor-pointer text-[16px]"
              onClick={() => setActiveKey(item.key)}
              style={{
                color: activeKey === item.key ? "rgb(22, 119, 255)" : "initial"
              }}>
              <div>{item.label}</div>
            </div>
          );
        })}
        <div
          className="w-12 bg-[#1890ff] h-0.5 absolute bottom-0 transition-all duration-300"
          style={{
            left:
              items.findIndex((item) => item.key === activeKey) * (48 + 32) + 24
          }}></div>
      </div>
      <div>
        {items.map((item) => {
          return (
            <div
              key={item.key}
              style={{
                display: activeKey === item.key ? "block" : "none"
              }}>
              {item.children}
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default ReactTab;
