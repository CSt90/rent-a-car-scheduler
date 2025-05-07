export default function Home() {
  const linkButtonStyle =
    "px-4 py-3 rounded-lg border-[2px] border-cyan-300 text-cyan-300 hover:bg-cyan-300/20 active:bg-cyan-300/20 text-center";

  return (
    <div className="w-full h-[100vh] bg-gray-800">
      <div className="mx-4 sm:mx-[40%] pt-[40vh] flex flex-col gap-6 font-[family-name:var(--font-geist-sans)] justify-center ">
        <a
          href="https://rent-a-car-scheduler.vercel.app/demos/FcScheduler"
          className={linkButtonStyle}
        >
          FcScheduler demo
        </a>{" "}
        {/*for local development, link to http://localhost:3000*/}
        <a
          href="https://rent-a-car-scheduler.vercel.app/demos/SyncfScheduler"
          className={linkButtonStyle}
        >
          {" "}
          Syncfusion Resource Scheduler Demo
        </a>
      </div>
    </div>
  );
}
