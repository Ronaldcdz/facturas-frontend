export default function Page() {
  return (
    <div className="">
      <div className="md:hidden">{/* <MobileAppSidebar /> */}</div>

      <div className="hidden md:block">{/* <DesktopAppSidebar /> */}</div>
    </div>
  );
}
