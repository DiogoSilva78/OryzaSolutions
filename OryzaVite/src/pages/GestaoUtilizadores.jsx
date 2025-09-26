import React, { useEffect, useMemo, useState } from "react";
import "../GestaoUtilizadores.css";

const DADOS_INICIAIS = [
  { nome: "Dr. Joao Silva", email: "joao@clinica.pt", funcao: "Veterinário", funcaoCor: "azul", estado: "Ativo", ultimoLogin: "04-08-2025" },
  { nome: "Ana Costa", email: "ana@clinica.pt", funcao: "Rececionista", funcaoCor: "amarelo", estado: "Ativo", ultimoLogin: "10-07-2025" },
  { nome: "Carlos Santos", email: "carlos@clinica.pt", funcao: "Assistente", funcaoCor: "cinza", estado: "Inativo", ultimoLogin: "03-04-2024" },
  { nome: "Maria Oliveira", email: "maria@clinica.pt", funcao: "Veterinária", funcaoCor: "azul", estado: "Ativo", ultimoLogin: "01-09-2025" },
  { nome: "Pedro Ferreira", email: "pedro@clinica.pt", funcao: "Administrador", funcaoCor: "roxo", estado: "Ativo", ultimoLogin: "23-06-2025" },
];

const corPorFuncao = (f) => {
  const m = {
    "Veterinário": "azul",
    "Veterinária": "azul",
    "Rececionista": "amarelo",
    "Assistente": "cinza",
    "Administrador": "roxo",
  };
  return m[f] || "cinza";
};

function Badge({ tone = "azul", children }) {
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
  const [lista, setLista] = useState(DADOS_INICIAIS);

  // modal
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ nome: "", email: "", funcao: "Veterinário", estado: "Ativo" });
  const [erro, setErro] = useState("");

  // qual menu de ações está aberto (email)
  const [acaoAberta, setAcaoAberta] = useState(null);

  // fecha menu ao clicar fora, mas ignora cliques dentro da célula .acoes da linha aberta
  useEffect(() => {
    function onDocMouseDown(e) {
      const cell = e.target.closest(".acoes");
      // se clicou fora de QUALQUER célula de ações, fecha
      if (!cell) {
        setAcaoAberta(null);
        return;
      }
      // se clicou numa célula de ações, só fecha se não for da linha atualmente aberta
      const clickedEmail = cell.getAttribute("data-email");
      if (clickedEmail !== acaoAberta) {
        // abriu outra linha ou clicou noutro sítio -> fechar o menu aberto
        setAcaoAberta(null);
      }
    }
    function onEsc(e) {
      if (e.key === "Escape") setAcaoAberta(null);
    }
    document.addEventListener("mousedown", onDocMouseDown);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocMouseDown);
      document.removeEventListener("keydown", onEsc);
    };
  }, [acaoAberta]);

  const dados = useMemo(() => {
    if (!q.trim()) return lista;
    const t = q.toLowerCase();
    return lista.filter(
      (u) =>
        u.nome.toLowerCase().includes(t) ||
        u.email.toLowerCase().includes(t) ||
        u.funcao.toLowerCase().includes(t) ||
        u.estado.toLowerCase().includes(t)
    );
  }, [q, lista]);

  const total = lista.length;
  const ativos = lista.filter((u) => u.estado === "Ativo").length;
  const inativos = total - ativos;
  const online = 3;

  const handleOpen = () => {
    setForm({ nome: "", email: "", funcao: "Veterinário", estado: "Ativo" });
    setErro("");
    setOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!form.nome.trim() || !form.email.trim()) {
      setErro("Preencha Nome e Email.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setErro("Email inválido.");
      return;
    }

    setSaving(true);
    const novo = {
      nome: form.nome.trim(),
      email: form.email.trim(),
      funcao: form.funcao,
      funcaoCor: corPorFuncao(form.funcao),
      estado: form.estado,
      ultimoLogin: "-",
    };
    setLista((arr) => [novo, ...arr]);
    setSaving(false);
    setOpen(false);
  };

  const toggleMenuAcoes = (email) => {
    setAcaoAberta((curr) => (curr === email ? null : email));
  };

  const handleEliminar = (email) => {
    const u = lista.find((x) => x.email === email);
    const nome = u?.nome || email;
    if (window.confirm(`Tens a certeza que queres eliminar o utilizador "${nome}"?`)) {
      setLista((arr) => arr.filter((x) => x.email !== email));
      setAcaoAberta(null);
    }
  };

  return (
    <div className="page">
      <main className="content">
        {/* topo */}
        <div className="content-top">
          <div>
            <h1 className="page-title">Gestão de Utilizadores</h1>
            <p className="page-subtitle">Gerir contas e permissões dos utilizadores</p>
          </div>

          <button className="btn btn-primary" onClick={handleOpen}>
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
                  <th>Função</th>
                  <th>Estado</th>
                  <th>Ultimo Login</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {dados.map((u) => (
                  <tr key={u.email}>
                    <td>{u.nome}</td>
                    <td>
                      <a className="email-link" href={"mailto:" + u.email}>
                        {u.email}
                      </a>
                    </td>
                    <td><Badge tone={u.funcaoCor}>{u.funcao}</Badge></td>
                    <td><Estado value={u.estado} /></td>
                    <td>{u.ultimoLogin}</td>
                    <td className="acoes" data-email={u.email}>
                      <button
                        className="btn-icon-only"
                        title="Mais ações"
                        aria-haspopup="menu"
                        aria-expanded={acaoAberta === u.email}
                        onClick={() => toggleMenuAcoes(u.email)}
                      >
                        …
                      </button>

                      {acaoAberta === u.email && (
                        <div className="acoes-menu" role="menu">
                          <button
                            className="acoes-item acoes-delete"
                            role="menuitem"
                            onClick={() => handleEliminar(u.email)}
                          >
                            Eliminar
                          </button>
                        </div>
                      )}
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

      {/* ===== MODAL Novo Utilizador ===== */}
      {open && (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="modal">
            <div className="modal-header">
              <h3>Novo utilizador</h3>
              <button
                className="modal-close"
                aria-label="Fechar"
                onClick={() => setOpen(false)}
              >
                ✕
              </button>
            </div>

            <form className="modal-body" onSubmit={handleSave}>
              <label className="field">
                <span>Nome</span>
                <input
                  name="nome"
                  value={form.nome}
                  onChange={handleChange}
                  placeholder="Ex.: Maria Oliveira"
                  required
                />
              </label>

              <label className="field">
                <span>Email</span>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="exemplo@clinica.pt"
                  required
                />
              </label>

              <div className="grid-2">
                <label className="field">
                  <span>Função</span>
                  <select name="funcao" value={form.funcao} onChange={handleChange}>
                    <option>Veterinário</option>
                    <option>Veterinária</option>
                    <option>Rececionista</option>
                    <option>Assistente</option>
                    <option>Administrador</option>
                  </select>
                </label>

                <label className="field">
                  <span>Estado</span>
                  <select name="estado" value={form.estado} onChange={handleChange}>
                    <option>Ativo</option>
                    <option>Inativo</option>
                  </select>
                </label>
              </div>

              {erro && <p className="form-error">{erro}</p>}

              <div className="modal-actions">
                <button type="button" className="btn" onClick={() => setOpen(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  {saving ? "A guardar..." : "Guardar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}