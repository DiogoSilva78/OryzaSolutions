# OryzaSolutions
Software Oryza Solutions

O ORYZA Surgical Hub é uma plataforma de gestão para clínicas e hospitais veterinários com foco em:
CRM Cirúrgico → gestão de pacientes/animais com histórico apenas de procedimentos cirúrgicos realizados e sugeridos.
Gestão de Inventário em tempo real → packs cirúrgicos, instrumentos, materiais descartáveis.
Gestão de Cirurgias → agenda do bloco, agendamento de novas cirurgias, início de cirurgias agendadas ou novas, checklist cirúrgica multi-step.
Relatórios e Inteligência Artificial → previsões de volume cirúrgico, sazonalidade e recomendações de stock.
Tickets de Helpdesk → abertura de tickets com chatbot para suporte direto.

--------------------------------------------------------------------------------
Backend
NestJS (framework Node.js com TypeScript).
PostgreSQL como base de dados relacional.
ORM: Prisma (ou TypeORM).
Autenticação JWT + RBAC (roles).
Microserviços futuros para IA/ML (TensorFlow/PyTorch).

--------------------------------------------------------------------------------
Frontend Web
React + Vite.
UI: TailwindCSS + shadcn/ui.
Estado: Zustand (ou Redux Toolkit).
Dashboards e gráficos: Recharts ou Chart.js.
Mobile App
React Native (iOS e Android).

--------------------------------------------------------------------------------
Funcionalidades principais:
Consulta de pacientes.
Agenda de cirurgias.
QR Code scanner (packs, stock).
Notificações push.


--------------------------------------------------------------------------------
Infraestrutura
Docker + Docker Compose para dev e produção.
CI/CD com GitHub Actions.
Deploy em AWS ECS/EKS (ou DigitalOcean/Hetzner).
Armazenamento de ficheiros: S3/MinIO.
Mensageria futura (RabbitMQ/Kafka) para eventos assíncronos.

--------------------------------------------------------------------------------
📐 Arquitetura da Aplicação
Backend (NestJS) expõe API REST/GraphQL.
Frontend Web (React) consome a API → gestão administrativa, cirúrgica e de inventário.
Mobile App (React Native) consome a mesma API → foco em uso rápido no terreno (stock, QR, consultas, notificações).
Base de dados PostgreSQL → centraliza pacientes, cirurgias, inventário, utilizadores.
Microserviços IA/ML → processam dados históricos e devolvem previsões/recomendações.

--------------------------------------------------------------------------------