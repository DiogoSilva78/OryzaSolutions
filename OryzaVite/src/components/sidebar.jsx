import React, { useState } from "react";
import "./sidebar.css";

/** Ícones simples em SVG para não depender de libs */
const Icon = ({ name }) => {
  const size = 18;
  const stroke = "currentColor";
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke, strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" };

  switch (name) {
    case "admin":  return (<svg {...common}><path d="M12 2v4"/><path d="M10 4h4"/><circle cx="12" cy="12" r="4"/><path d="M4 12h4M16 12h4M12 20v-4"/></svg>);
    case "users":  return (<svg {...common}><path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>);
    case "vets":   return (<svg {...common}><path d="M12 2v6"/><path d="M5 8h14"/><path d="M7 8v10a5 5 0 0 0 10 0V8"/></svg>);
    case "folder": return (<svg {...common}><path d="M3 7h5l2 2h11v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>);
    case "box":    return (<svg {...common}><path d="M21 16V8a2 2 0 0 0-1-1.73L13 2.27a2 2 0 0 0-2 0L4 6.27A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.73z"/><path d="M3.3 7L12 12l8.7-5"/></svg>);
    case "refresh":return (<svg {...common}><path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 3v6h-6"/></svg>);
    case "clients":return (<svg {...common}><circle cx="9" cy="7" r="4"/><path d="M17 11V7a4 4 0 0 0-4-4"/><path d="M3 21a6 6 0 0 1 12 0"/><path d="M21 21a6 6 0 0 0-7-5.91"/></svg>);
    case "pet":    return (<svg {...common}><path d="M11 12a2 2 0 1 1 2 0"/><circle cx="7" cy="8" r="2"/><circle cx="17" cy="8" r="2"/><circle cx="5" cy="14" r="2"/><circle cx="19" cy="14" r="2"/><path d="M7 20c3-3 7-3 10 0"/></svg>);
    case "truck":  return (<svg {...common}><path d="M10 17h4V5H2v12h2"/><path d="M14 7h5l3 4v6h-3"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>);
    case "warehouse":return (<svg {...common}><path d="M3 10l9-6 9 6v10H3z"/><path d="M7 22V12h10v10"/></svg>);
    case "alert":  return (<svg {...common}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>);
    case "logout": return (<svg {...common}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/></svg>);
    case "chev":   return (<svg {...{...common, width: 16, height: 16}}><polyline points="9 18 15 12 9 6"/></svg>);
    default:       return null;
  }
};

const Section = ({ title, icon, children, defaultOpen = true }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="sb-section">
      <button className="sb-section-header" onClick={() => setOpen((o) => !o)}>
        <div className="sb-section-title">
          <Icon name={icon} />
          <span>{title}</span>
        </div>
        <span className={`sb-chevron ${open ? "open" : ""}`}><Icon name="chev" /></span>
      </button>
      {open && <div className="sb-items">{children}</div>}
    </div>
  );
};

const Item = ({ icon, label, active, children }) => (
  <div className={`sb-item ${active ? "active" : ""}`}>
    <div className="sb-item-row">
      <Icon name={icon} />
      <span>{label}</span>
    </div>
    {children && <div className="sb-subitems">{children}</div>}
  </div>
);

const SubItem = ({ icon, label }) => (
  <button className="sb-subitem">
    <Icon name={icon} />
    <span>{label}</span>
  </button>
);

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <nav className="sb-scroll">
        {/* ADMINISTRADOR */}
        <Section title="Administrador" icon="users">
          <button className="sb-link"><Icon name="users" /><span>Utilizadores</span></button>
          <button className="sb-link"><Icon name="users" /><span>Veterinarios</span></button>
          <button className="sb-link"><Icon name="users" /><span>Colaboradores</span></button>
          <button className="sb-link"><Icon name="folder" /><span>Empresa</span></button>
        </Section>

        {/* INVENTARIO */}
        <Section title="Inventario" icon="box">
          <Item icon="box" label="Stock">
            <SubItem icon="refresh" label="Em tempo Real" />
            <SubItem icon="warehouse" label="Localização de Stock" />
          </Item>
          <Item icon="refresh" label="Reposição">
            <SubItem icon="alert" label="Alertas" />
          </Item>
        </Section>

        {/* CLIENTES */}
        <Section title="Clientes" icon="clients">
          <button className="sb-link"><Icon name="clients" /><span>Clientes</span></button>
          <button className="sb-link"><Icon name="pet" /><span>Animais</span></button>
          <button className="sb-link"><Icon name="folder" /><span>Criar Ticket</span></button>
        </Section>

        {/* LOGISTICA */}
        <Section title="Logistica" icon="truck">
          <button className="sb-link"><Icon name="truck" /><span>Fornecedores</span></button>
          <button className="sb-link"><Icon name="warehouse" /><span>Armazens</span></button>
        </Section>
      </nav>

      <button className="sb-logout">
        <Icon name="logout" />
        <span>Terminar sessao</span>
      </button>
    </aside>
  );
};

export default Sidebar;