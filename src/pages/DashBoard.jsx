import ReactCard from "../components/ReactCard";
import ReactTab from "../components/ReactTab";
import DashboardAnalysisContent from "./DashboardAnalysisContent";
import ReactProgress from "../components/ReactProgress";

function InfoIcon() {
  return (
    <span className="flex h-4 w-4 items-center justify-center rounded-full border border-[#8c8c8c] text-[10px] text-[#8c8c8c]">
      i
    </span>
  );
}

function TrendTag({ label, value, direction }) {
  const isUp = direction === "up";

  return (
    <div className="flex items-center gap-1 text-[14px] text-[#595959]">
      <span>{label}</span>
      <span>{value}</span>
      <span
        className={`inline-block h-0 w-0 border-x-[4px] border-x-transparent ${
          isUp
            ? "border-b-[6px] border-b-[#ff4d4f]"
            : "border-t-[6px] border-t-[#52c41a]"
        }`}
      />
    </div>
  );
}

function AreaChart() {
  return (
    <div className="h-[46px] w-full overflow-hidden">
      <svg
        viewBox="0 0 320 46"
        className="h-full w-full"
        preserveAspectRatio="none">
        <defs>
          <linearGradient id="visitGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#b37feb" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <path
          d="M0 16 C18 22, 30 18, 42 25 C54 33, 62 44, 76 34 C88 26, 95 11, 110 17 C125 26, 137 22, 148 18 C160 14, 176 28, 188 3 C200 0, 214 17, 224 25 C238 35, 246 43, 258 47 C272 49, 282 14, 296 23 C306 29, 313 12, 320 20 L320 46 L0 46 Z"
          fill="url(#visitGradient)"
        />
      </svg>
    </div>
  );
}

function BarChart() {
  const bars = [
    32, 22, 18, 8, 18, 32, 20, 26, 22, 42, 26, 12, 2, 22, 12, 26, 22
  ];

  return (
    <div className="flex h-[46px] items-end gap-[8px]">
      {bars.map((height, index) => (
        <span
          key={index}
          className="w-2.5 bg-[#1677ff]"
          style={{ height: `${height}px`, opacity: index === 12 ? 0.5 : 0.9 }}
        />
      ))}
    </div>
  );
}

function DashBoard() {
  const tabItems = [
    {
      key: "sales",
      label: "销售额",
      children: <DashboardAnalysisContent />
    },
    {
      key: "visit",
      label: "访问量",
      children: <DashboardAnalysisContent />
    }
  ];

  return (
    <>
      <div className="grid grid-cols-4 gap-6">
        <ReactCard className="min-w-[375px] h-full" title="总销售额">
          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-2">
                <span className="text-[14px] text-[#8c8c8c]">总销售额</span>
                <span className="text-[40px] leading-none text-[#262626]">
                  ￥ 126,560
                </span>
              </div>
              <InfoIcon />
            </div>
            <div className="flex items-center gap-6 h-[46px]">
              <TrendTag label="周同比" value="12%" direction="up" />
              <TrendTag label="日同比" value="11%" direction="down" />
            </div>
            <div className="border-t border-[#f0f0f0] pt-4 text-[#262626]">
              日销售额 <span className="ml-2">￥12,423</span>
            </div>
          </div>
        </ReactCard>
        <ReactCard className="min-w-[375px] h-full" title="访问量">
          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-2">
                <span className="text-[14px] text-[#8c8c8c]">访问量</span>
                <span className="text-[40px] leading-none text-[#262626]">
                  8,846
                </span>
              </div>
              <InfoIcon />
            </div>
            <AreaChart />
            <div className="border-t border-[#f0f0f0] pt-4 text-[#262626]">
              日访问量 <span className="ml-2">1,234</span>
            </div>
          </div>
        </ReactCard>
        <ReactCard className="min-w-[375px] h-full" title="支付笔数">
          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-2">
                <span className="text-[14px] text-[#8c8c8c]">支付笔数</span>
                <span className="text-[40px] leading-none text-[#262626]">
                  6,560
                </span>
              </div>
              <InfoIcon />
            </div>
            <BarChart />
            <div className="border-t border-[#f0f0f0] pt-4 text-[#262626]">
              转化率 <span className="ml-2">60%</span>
            </div>
          </div>
        </ReactCard>
        <ReactCard className="min-w-[375px] h-full" title="运营活动效果">
          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-2">
                <span className="text-[14px] text-[#8c8c8c]">运营活动效果</span>
                <span className="text-[40px] leading-none text-[#262626]">
                  78%
                </span>
              </div>
              <InfoIcon />
            </div>
            <ReactProgress percent={78}></ReactProgress>
            <div className="flex items-center gap-6 border-t border-[#f0f0f0] pt-4">
              <TrendTag label="周同比" value="12%" direction="up" />
              <TrendTag label="日同比" value="11%" direction="down" />
            </div>
          </div>
        </ReactCard>
      </div>
      <ReactTab items={tabItems}></ReactTab>
    </>
  );
}
export default DashBoard;
