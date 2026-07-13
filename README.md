# agile-ia-assistant

Assistant de gestion de projet agile avec IA — Mémoire de Fin d'Études MSc eBIHAR (ESTIA)

**Auteur :** SANDAMAHERY Sahy Liana
**Encadreur professionnel :** Sandamahery Tsara Hira
**Période :** 01 Avril 2026 — 31 Juillet 2026

## Stack technique

| Couche | Technologie |
|---|---|
| Frontend | React 18 + Vite + TypeScript (strict) + Tailwind CSS + shadcn/ui |
| State | Zustand (UI) + TanStack Query (server) |
| Forms | React Hook Form + Zod |
| Backend | NestJS 10 + TypeScript (strict) |
| ORM | Drizzle ORM |
| DB | PostgreSQL 15 |
| Temps réel | Socket.io via NestJS Gateway |
| Auth | JWT (access + refresh) + bcrypt + RBAC (4 rôles) |
| Tests | Jest + Supertest (back) + Vitest + RTL (front) |
| IA | LLM cloud OpenAI (gpt-4o-mini) via SDK `openai`, appel direct — 4 agents (priorité, PO, estimateur, chatbot) |
| Conteneurisation | Docker + Docker Compose |
| CI/CD | GitHub Actions |

## Prérequis

- Node.js 22+
- npm 10+
- Docker 24+ (pour PostgreSQL local)

## Installation

```bash
# Cloner le dépôt
git clone <repo-url>
cd agile-ia-assistant

# Installer les dépendances
npm install

# Copier les variables d'environnement
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env

# Démarrer PostgreSQL via Docker
docker-compose up -d postgres

# Appliquer les migrations + seed
npm run db:migrate
npm run db:seed

# Lancer le développement
npm run dev:api   # NestJS sur http://localhost:3000/api
npm run dev:web   # Vite sur http://localhost:5173
```

## Structure du monorepo

```
agile-ia-assistant/
├── apps/
│   ├── web/                  # React + Vite + TS
│   └── api/                  # NestJS + TS
├── packages/
│   └── shared-types/         # Types TS communs (optionnel)
├── docker-compose.yml
├── package.json              # racine (workspaces)
└── README.md
```

## Variables d'environnement

Voir `apps/api/.env.example` et `apps/web/.env.example`.

## Scripts

| Commande | Description |
|---|---|
| `npm run dev:api` | Lance NestJS (port 3000) |
| `npm run dev:web` | Lance Vite (port 5173) |
| `npm run build` | Build les deux apps |
| `npm test` | Lance tous les tests |
| `npm run lint` | ESLint sur tout le monorepo |
| `npm run typecheck` | tsc --noEmit sur tout le monorepo |
| `npm run db:migrate` | Drizzle Kit migrate |
| `npm run db:seed` | Seed la base de données |
| `npm run db:studio` | Drizzle Studio (UI DB) |

## Licence

MIT — SANDAMAHERY Sahy Liana (2026)