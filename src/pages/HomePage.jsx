import PageTitle from "../components/PageTitle";

function HomePage() {
  return (
    <main className="min-h-screen bg-slate-100 px-6 py-12 text-slate-900">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <PageTitle className="text-3xl font-bold tracking-tight">
          Parcel + React
        </PageTitle>
        <p className="mt-4 text-base leading-7 text-slate-600">
          这是一个最小可运行的 React 学习项目。
        </p>
        <p className="mt-3 inline-flex rounded-full bg-sky-100 px-3 py-1 text-sm font-medium text-sky-700">
          Tailwind CSS 已接入，可以直接写 className。
        </p>
      </div>
    </main>
  );
}

export default HomePage;
