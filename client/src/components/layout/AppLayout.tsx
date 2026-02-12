import type { ReactNode } from "react";
import { ScrewHead } from "../hardware/ScrewHead";

interface AppLayoutProps {
  sidebar: ReactNode;
  center: ReactNode;
  chat: ReactNode;
}

export function AppLayout({ sidebar, center, chat }: AppLayoutProps) {
  return (
    <div className="app-layout">
      <aside className="app-layout__sidebar">
        <div className="module-screws">
          <ScrewHead size={10} type="phillips" />
          <ScrewHead size={10} type="phillips" />
        </div>
        {sidebar}
        <div className="module-screws module-screws--bottom">
          <ScrewHead size={10} type="flat" />
          <ScrewHead size={10} type="flat" />
        </div>
      </aside>
      <main className="app-layout__center">
        <div className="module-screws">
          <ScrewHead size={10} type="phillips" />
          <ScrewHead size={10} type="phillips" />
        </div>
        {center}
        <div className="module-screws module-screws--bottom">
          <ScrewHead size={10} type="phillips" />
          <ScrewHead size={10} type="phillips" />
        </div>
      </main>
      <aside className="app-layout__chat">{chat}</aside>
      <footer className="app-layout__footer">
        <span className="app-layout__branding">Asteria / XTR</span>
      </footer>
    </div>
  );
}
