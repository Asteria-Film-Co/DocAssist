import type { ReactNode } from "react";

interface AppLayoutProps {
  sidebar: ReactNode;
  center: ReactNode;
  chat: ReactNode;
}

export function AppLayout({ sidebar, center, chat }: AppLayoutProps) {
  return (
    <div className="app-layout">
      <aside className="app-layout__sidebar">{sidebar}</aside>
      <main className="app-layout__center">{center}</main>
      <aside className="app-layout__chat">{chat}</aside>
    </div>
  );
}
