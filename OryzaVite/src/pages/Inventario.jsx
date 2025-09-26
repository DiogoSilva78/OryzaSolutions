import React, { useMemo, useState } from "react";
import Header, { HeaderSpacer } from "../components/header.jsx"; // garante o caminho/capitalização corretos
import Sidebar from "../components/sidebar.jsx";                  // importa a sidebar
import "../inventario.css";
import "../components/header.css"; // garante que as classes .sidebar e .overlay estão carregadas

// --- Dados MOCK ---
const MOCK_PACKS = [
  { id: "pck-001", nome: "Pack Cirúrgico Básico", quantidade: 12, etiquetas: ["ESTÉRIL", "DISPONÍVEL"], localizacao: { estante: 1, prateleira: 2, armario: 3, armazem: 1 } },
  { id: "pck-002", nome: "Pack Ortopédico", quantidade: 8, etiquetas: ["USO", "LENTO"], localizacao: { estante: 3, prateleira: 4, armario: 4, armazem: 7 } },
  { id: "pck-003", nome: "Pack Cirúrgico Avançado", quantidade: 5, etiquetas: ["PBR", "CRÍTICO"], localizacao: { estante: 3, prateleira: 3, armario: 3, armazem: 3 } },
];

export default function LocalizacaoStock() {
  // ⬇️ Estado para abrir/fechar a sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [termo, setTermo] = useState("");
  const [pesquisou, setPesquisou] = useState(false);

  const resultados = useMemo(() => {
    const t = termo.trim().toLowerCase();
    if (!t) return [];
    return MOCK_PACKS.filter((p) => p.nome.toLowerCase().includes(t));
  }, [termo]);

  const kpis = useMemo(() => {
    const total = MOCK_PACKS.reduce((acc, p) => acc + p.quantidade, 0);
    const emUso = 23;
    const stockBaixo = MOCK_PACKS.filter((p) => p.quantidade < 10).length;
    const scansHoje = 47;
    return { total, emUso, stockBaixo, scansHoje };
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    setPesquisou(true);
  };

  const limpar = () => {
    setTermo("");
    setPesquisou(false);
  };

  return (
    <div className="page-root">
      {/* Header com botão hamburger a abrir a sidebar */}
      <Header onMenuClick={() => setIsSidebarOpen(true)} />
      <HeaderSpacer />

      {/* Sidebar + overlay controlados por estado */}
      <Sidebar open={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="page-container">
        <div className="page-inner">
          <h1 className="page-title">Sistema de Gestão de Inventário Médico</h1>
          <p className="page-subtitle">Localização instantânea e reposição intuitiva de stock</p>

          {/* Toolbar */}
          <div className="btn-group">
            <button className="btn"><span className="btn-icon">🔎</span> Localização de Stock</button>
            <button className="btn"><span className="btn-icon">�</span> Reposição QR</button>
            <button className="btn"><span className="btn-icon">📦</span> Materiais descartáveis</button>
          </div>

          {/* KPIs */}
          <section className="stats-wrap">
            <div className="cards">
              <article className="card">
                <div className="card-icon">📦</div>
                <div className="card-label">Stock Disponível</div>
                <div className="card-value card-green">{kpis.total.toLocaleString("pt-PT")}</div>
              </article>
              <article className="card">
                <div className="card-icon">〰️</div>
                <div className="card-label">Em Uso</div>
                <div className="card-value card-yellow">{kpis.emUso}</div>
              </article>
              <article className="card">
                <div className="card-icon">⚠️</div>
                <div className="card-label">Stock Baixo</div>
                <div className="card-value card-red">{kpis.stockBaixo}</div>
              </article>
              <article className="card">
                <div className="card-icon">🔳</div>
                <div className="card-label">QR Scans Hoje</div>
                <div className="card-value card-blue">{kpis.scansHoje}</div>
              </article>
            </div>
          </section>

          {/* Pesquisa */}
          <section className="search-box">
            <h2 className="search-title"><span>🔎</span> Localização Instantânea de Stock</h2>
            <p className="search-hint">Digite o nome do pack, instrumento ou material para localizar no armazém</p>

            <form className="search-bar" onSubmit={onSubmit}>
              <input
                className="search-input"
                placeholder="Ex: Pack Cirúrgico, Bisturi, Luvas..."
                value={termo}
                onChange={(e) => setTermo(e.target.value)}
              />
              <button type="submit" className="search-button" disabled={!termo.trim()}>
                🔎 Procurar
              </button>
            </form>

            {!pesquisou && (
              <p style={{ marginTop: 8, color: "#6b7280", fontSize: 13 }}>
                Escreve um termo e clica em <strong>Procurar</strong> para ver resultados.
              </p>
            )}
          </section>

          {/* Resultados — só depois de pesquisar */}
          {pesquisou && (
            <section className="results">
              <h3 className="results-title">
                Resultados da procura: {resultados.length} item(s)
              </h3>

              {resultados.map((p) => (
                <article key={p.id} className="result-card">
                  <header className="result-head">
                    <div className="result-title">
                      <span className="bullet">◎</span>
                      <strong>{p.nome}</strong>
                      <span className="qtd">Qtd: {p.quantidade}</span>
                    </div>
                    <div className="tag-list">
                      {p.etiquetas.map((tag, i) => (
                        <span
                          key={i}
                          className={
                            "chip " +
                            (tag === "CRÍTICO"
                              ? "chip-red"
                              : tag === "DISPONÍVEL"
                              ? "chip-green"
                              : tag === "USO"
                              ? "chip-purple"
                              : "chip-gray")
                          }
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </header>

                  <div className="result-body">
                    <p className="loc-label">Localização:</p>
                    <div className="loc-grid">
                      <div className="loc-pill loc-estante">
                        <span className="loc-title">Estante</span>
                        <span className="loc-value">{p.localizacao.estante}</span>
                      </div>
                      <div className="loc-pill loc-prateleira">
                        <span className="loc-title">Prateleira</span>
                        <span className="loc-value">{p.localizacao.prateleira}</span>
                      </div>
                      <div className="loc-pill loc-armario">
                        <span className="loc-title">Armário</span>
                        <span className="loc-value">{p.localizacao.armario}</span>
                      </div>
                      <div className="loc-pill loc-armazem">
                        <span className="loc-title">Armazém</span>
                        <span className="loc-value">{p.localizacao.armazem}</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
