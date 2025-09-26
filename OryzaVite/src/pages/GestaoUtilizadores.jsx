import React, { useMemo, useState } from "react";
import Header from "../components/header.jsx";
import "../GestaoUtilizadores.css";

const DADOS_INICIAIS = [
  { nome: "Dr. Joao Silva", email: "joao@clinica.pt", funcao: "Veterinário", funcaoCor: "azul", estado: "Ativo", ultimoLogin: "04-08-2025" },
  { nome: "Ana Costa", email: "ana@clinica.pt", funcao: "Rececionista", funcaoCor: "amarelo", estado: "Ativo", ultimoLogin: "10-07-2025" },
  { nome: "Carlos Santos", email: "carlos@clinica.pt", funcao: "Assistente", funcaoCor: "cinza", estado: "Inativo", ultimoLogin: "03-04-2024" },
  { nome: "Maria Oliveira", email: "maria@clinica.pt", funcao: "Veterinária", funcaoCor: "azul", estado: "Ativo", ultimoLogin: "01-09-2025" },
  { nome: "Pedro Ferreira", email: "pedro@clinica.pt", funcao: "Administrador", funcaoCor: "roxo", estado: "Ativo", ultimoLogin: "23-06-2025" },
];

function Badge({ tone = "azul", children }) {
  // evita usar template string para não dar erro de escape
  return <span className={"badge badge-" + tone}>{children}</span>;
}

function Estado({ value }) {
  const tone = value === "Ativo" ? "verde" : "vermelho";
  return <Badge tone={tone}>{value}</Badge>;
}

function StatCard({ titulo, valor, destaque }) {
  return (
    <div className="stat-card">
      <p className="stat-title">{titulo}</p>
      <p className={"stat-value " + (destaque ? "stat-accent" : "")}>{valor}</p>
    </div>
  );
}

export default function GestaoUtilizadores() {
  const [q, setQ] = useState("");

  const dados = useMemo(() => {
    if (!q.trim()) return DADOS_INICIAIS;
    const t = q.toLowerCase();
    return DADOS_INICIAIS.filter(
      (u) =>
        u.nome.toLowerCase().includes(t) ||
        u.email.toLowerCase().includes(t) ||
        u.funcao.toLowerCase().includes(t) ||
        u.estado.toLowerCase().includes(t)
    );
  }, [q]);

  const total = DADOS_INICIAIS.length;
  const ativos = DADOS_INICIAIS.filter((u) => u.estado === "Ativo").length;
  const inativos = total - ativos;
  const online = 3;

  return (
    <div className="page">
      <Header />
      <main className="content" style={{ paddingTop: "60px" }}>
        {/* topo */}
        <div className="content-top">
          <div>
            <h1 className="page-title">Gestao de Utilizadores</h1>
            <p className="page-subtitle">Gerir contas e permissoes dos utilizadores</p>
          </div>

          <button className="btn btn-primary">
            <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" className="btn-icon">
              <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2h6z"></path>
            </svg>
            Novo utilizador
          </button>
        </div>

        {/* cards */}
        <section className="stats-grid">
          <StatCard titulo="Total" valor={total} />
          <StatCard titulo="Ativos" valor={ativos} destaque />
          <StatCard titulo="Inativos" valor={inativos} destaque />
          <StatCard titulo="Online" valor={online} destaque />
        </section>

        {/* tabela */}
        <section className="table-card">
          <div className="table-header">
            <div>
              <h2 className="section-title">Lista de utilizadores</h2>
              <p className="section-subtitle">Todos os utilizadores registados no sistema</p>
            </div>

            <div className="search">
              <span className="search-icon">🔍</span>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Pesquisar utilizadores..."
                aria-label="Pesquisar utilizadores"
              />
            </div>
          </div>

          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Funcao</th>
                  <th>Estado</th>
                  <th>Ultimo Login</th>
                  <th>Acoes</th>
                </tr>
              </thead>
              <tbody>
                {dados.map((u) => (
                  <tr key={u.email}>
                    <td>{u.nome}</td>
                    <td>
                      <a className="email-link" href={"mailto:" + u.email}>{u.email}</a>
                    </td>
                    <td><Badge tone={u.funcaoCor}>{u.funcao}</Badge></td>
                    <td><Estado value={u.estado} /></td>
                    <td>{u.ultimoLogin}</td>
                    <td className="acoes">
                      <button className="btn-icon-only" title="Mais ações">…</button>
                    </td>
                  </tr>
                ))}

                {dados.length === 0 && (
                  <tr>
                    <td colSpan="6" className="vazio">Sem resultados para “{q}”.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}