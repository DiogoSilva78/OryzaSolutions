import "../AdminPainel.css";
import Header from "../components/header.jsx";


const Stat = ({ label, value, sub, icon }) => (
  <div className="gp-card gp-stat">
    <div className="gp-stat-top">
      <span className="gp-stat-label">{label}</span>
      <span className="gp-stat-icon" aria-hidden>{icon}</span>
    </div>
    <div className="gp-stat-value">{value}</div>
    <div className="gp-stat-sub">{sub}</div>
  </div>
);

const ActivityItem = ({ title, who, time }) => (
  <div className="gp-activity-item">
    <div>
      <div className="gp-activity-title">{title}</div>
      <div className="gp-activity-who">{who}</div>
    </div>
    <div className="gp-activity-time">{time}</div>
  </div>
);

const AlertItem = ({ title, priority = "Normal", dot = "ok" }) => (
  <div className="gp-alert-item">
    <div className="gp-alert-dot" data-type={dot} />
    <div className="gp-alert-body">
      <div className="gp-alert-title">{title}</div>
      <div className="gp-alert-sub">Prioridade: {priority}</div>
    </div>
  </div>
);

export default function AdminPainel() {
  return (
    <div className="gp-dash">
      <h1 className="gp-title">Painel Administrativo</h1>
      <p className="gp-subtitle">
        Visão geral do sistema e estatísticas importantes
      </p>

      <section className="gp-stats-grid">
        <Stat
          label="Total de Utilizadores"
          value="1,234"
          sub="+12% em relação ao mês anterior"
          icon="👥"
        />
        <Stat
          label="Consultas hoje"
          value="89"
          sub="+8% em relação ao mês anterior"
          icon="📈"
        />
        <Stat
          label="Alertas ativos"
          value="23"
          sub="-5% em relação ao mês anterior"
          icon="⚠️"
        />
        <Stat
          label="Receita Mensal"
          value="€45,678"
          sub="+23% em relação ao mês anterior"
          icon="💶"
        />
      </section>

      <section className="gp-panels">
        <div className="gp-panel gp-card">
          <div className="gp-panel-header">Atividade Recente</div>
          <div className="gp-panel-sub">Últimas ações no sistema</div>

          <div className="gp-activity-list">
            <ActivityItem
              title="Novo utilizador registado"
              who="Administrador Diogo Silva"
              time="há 5 minutos"
            />
            <ActivityItem
              title="Consulta agendada"
              who="Maria Santos"
              time="há 12 minutos"
            />
            <ActivityItem
              title="Stock atualizado"
              who="Sistema"
              time="há 23 minutos"
            />
            <ActivityItem
              title="Relatório gerado"
              who="Ana Costa"
              time="há 30 minutos"
            />
          </div>
        </div>

        <div className="gp-panel gp-card">
          <div className="gp-panel-header">Alertas do sistema</div>
          <div className="gp-panel-sub">Notificações importantes</div>

          <div className="gp-alerts-list">
            <AlertItem
              title="Stock baixo: Vacina antirrábica"
              priority="Alta"
              dot="warn"
            />
            <AlertItem
              title="Backup automático concluído"
              priority="Normal"
              dot="info"
            />
            <AlertItem
              title="Falha na conexão com o laboratório"
              priority="Crítica"
              dot="error"
            />
            <AlertItem
              title="Sistema atualizado com sucesso"
              priority="Baixa"
              dot="ok"
            />
          </div>
        </div>
      </section>
    </div>
  );
}