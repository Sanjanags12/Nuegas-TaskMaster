import SideBar from "~/components/sidebar/sidebar";
import CustomProvider from "../providers";

export default function WithSidebarLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row flex-grow">
      <SideBar />
      <main className="flex-1">
         <CustomProvider>{children}</CustomProvider>
        </main>
    </div>
  );
}
