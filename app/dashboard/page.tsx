import MobilePageView from "./_components/MobilePageView";

export default function Page() {
  return (
    <div className="min-h-screen bg-primarysecondary">
      <div className="p-8">
        <div className="md:hidden">
          <MobilePageView />
        </div>

        <div className="hidden md:block">{/* <DesktopAppSidebar /> */}</div>
      </div>
    </div>
  );
}
