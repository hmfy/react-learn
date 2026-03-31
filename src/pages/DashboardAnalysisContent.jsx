const chartData = [
  { month: "1月", value: 820 },
  { month: "2月", value: 932 },
  { month: "3月", value: 901 },
  { month: "4月", value: 934 },
  { month: "5月", value: 1290 },
  { month: "6月", value: 1330 },
  { month: "7月", value: 1320 },
  { month: "8月", value: 1180 },
  { month: "9月", value: 960 },
  { month: "10月", value: 1060 },
  { month: "11月", value: 1210 },
  { month: "12月", value: 1400 }
];

const rankingData = [
  { name: "门店 1", amount: "323,234" },
  { name: "门店 2", amount: "299,132" },
  { name: "门店 3", amount: "283,998" },
  { name: "门店 4", amount: "266,321" },
  { name: "门店 5", amount: "223,445" },
  { name: "门店 6", amount: "196,231" },
  { name: "门店 7", amount: "185,120" }
];

function buildLinePath(data, width, height, padding) {
  const values = data.map((item) => item.value);
  const max = Math.max(...values);
  const min = Math.min(...values);
  const xStep = (width - padding * 2) / (data.length - 1);
  const usableHeight = height - padding * 2;

  return data
    .map((item, index) => {
      const x = padding + index * xStep;
      const ratio = (item.value - min) / (max - min || 1);
      const y = height - padding - ratio * usableHeight;
      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");
}

function buildAreaPath(data, width, height, padding) {
  const linePath = buildLinePath(data, width, height, padding);
  const xStep = (width - padding * 2) / (data.length - 1);
  const startX = padding;
  const endX = padding + xStep * (data.length - 1);

  return `${linePath} L ${endX} ${height - padding} L ${startX} ${
    height - padding
  } Z`;
}

function DashboardAnalysisContent() {
  const width = 820;
  const height = 320;
  const padding = 28;
  const linePath = buildLinePath(chartData, width, height, padding);
  const areaPath = buildAreaPath(chartData, width, height, padding);

  return (
    <div className="px-6 py-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-[#f0f0f0] pb-6">
        <div>
          <div className="text-[20px] font-semibold text-[#262626]">销售趋势</div>
          <div className="mt-2 text-[14px] text-[#8c8c8c]">
            以年度维度展示整体销售额变化
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-[14px]">
          {["今日", "本周", "本月", "本年"].map((label, index) => (
            <button
              key={label}
              className={`rounded-md px-4 py-2 transition ${
                index === 3
                  ? "bg-[#e6f4ff] text-[#1677ff]"
                  : "text-[#595959] hover:bg-[#fafafa]"
              }`}>
              {label}
            </button>
          ))}
          <button className="rounded-md border border-[#d9d9d9] px-4 py-2 text-[#595959]">
            2026-01-01 至 2026-12-31
          </button>
        </div>
      </div>

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div>
          <div className="mb-4 flex items-center gap-6 text-[14px]">
            <div className="flex items-center gap-2 text-[#262626]">
              <span className="inline-block h-3 w-3 rounded-full bg-[#1677ff]" />
              <span>销售额</span>
            </div>
            <div className="text-[#8c8c8c]">单位：万元</div>
          </div>

          <div className="rounded-xl border border-[#f0f0f0] bg-[#fcfcfc] p-4">
            <svg
              viewBox={`0 0 ${width} ${height}`}
              className="h-[320px] w-full"
              preserveAspectRatio="none">
              <defs>
                <linearGradient id="dashboard-sales-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1677ff" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#1677ff" stopOpacity="0.02" />
                </linearGradient>
              </defs>

              {[0, 1, 2, 3, 4].map((line) => {
                const y = padding + ((height - padding * 2) / 4) * line;
                return (
                  <line
                    key={line}
                    x1={padding}
                    y1={y}
                    x2={width - padding}
                    y2={y}
                    stroke="#f0f0f0"
                    strokeWidth="1"
                  />
                );
              })}

              <path d={areaPath} fill="url(#dashboard-sales-gradient)" />
              <path
                d={linePath}
                fill="none"
                stroke="#1677ff"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {chartData.map((item, index) => {
                const x = padding + ((width - padding * 2) / (chartData.length - 1)) * index;
                const values = chartData.map((data) => data.value);
                const max = Math.max(...values);
                const min = Math.min(...values);
                const ratio = (item.value - min) / (max - min || 1);
                const y = height - padding - ratio * (height - padding * 2);

                return (
                  <g key={item.month}>
                    <circle cx={x} cy={y} r="5" fill="#ffffff" stroke="#1677ff" strokeWidth="3" />
                    <text
                      x={x}
                      y={height - 4}
                      textAnchor="middle"
                      fontSize="14"
                      fill="#8c8c8c">
                      {item.month}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        <div className="border-l border-[#f0f0f0] pl-0 xl:pl-8">
          <div className="mb-6 text-[16px] font-semibold text-[#262626]">门店销售额排名</div>
          <div className="flex flex-col gap-4">
            {rankingData.map((item, index) => (
              <div
                key={item.name}
                className="flex items-center justify-between gap-4 text-[14px]">
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-[12px] ${
                      index < 3 ? "bg-[#314659] text-white" : "bg-[#f5f5f5] text-[#595959]"
                    }`}>
                    {index + 1}
                  </span>
                  <span className="text-[#262626]">{item.name}</span>
                </div>
                <span className="font-medium text-[#262626]">{item.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardAnalysisContent;
