import React, { useState } from "react";
import Header, { HeaderSpacer } from "./header.jsx";
import Sidebar from "./sidebar.jsx";

const AppLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <Header onMenuClick={() => setIsSidebarOpen(true)} />
      <HeaderSpacer />

      <Sidebar open={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Conteúdo das páginas */}
      <main style={{ padding: "16px" }}>{children}</main>
    </>
  );
};

export default AppLayout;
