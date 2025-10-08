# Grocery List com Zustand (React + TypeScript + Vite)

Aplicação de lista de compras com estado global usando Zustand, construída com React + TypeScript e Vite. O projeto demonstra padrões simples e eficientes de gerenciamento de estado, persistência no `localStorage` e composição de componentes com TailwindCSS.

## Visão Geral

- Gerenciamento de estado com `zustand` e persistência (apenas `todos`) via `localStorage`.
- Fluxo de autenticação simulado (login/logout) para exemplificar estado de usuário.
- Formulário para adicionar itens, listagem com marcação de concluído e remoção.
- Contador de renders por componente via `useRenderCounter` (útil para observar re-renderizações).

## Tecnologias

- React 18, TypeScript, Vite 4 (plugin React SWC)
- TailwindCSS 3, `clsx` e `tailwind-merge` para compor classes (`utils/cn.ts`)
- Zustand 5 com `persist` para armazenamento em `localStorage`
- Ícones com `lucide-react`
- Qualidade de código: ESLint (Airbnb + TS), Prettier (+ plugin Tailwind), Husky, lint-staged, Commitlint

## Arquitetura de Estado

- `src/store/globalStore.tsx`
  - Estado: `user: IUser | null`, `todos: ITodo[]`
  - Ações: `login`, `logout`, `addTodo(title)`, `toggleTodoDone(id)`, `removeTodo(id)`
  - Persistência: `persist` com `createJSONStorage(() => localStorage)`, `name: 'global-storage'`
  - `partialize`: persiste somente `{ todos }` (o `user` não é persistido por padrão)

Exemplo de uso em componentes com seletores (melhor prática para evitar re-renders desnecessários):

```tsx
import { useGlobalStore } from '../store/globalStore';

const todos = useGlobalStore((state) => state.todos);
const addTodo = useGlobalStore((state) => state.addTodo);

addTodo('Leite');
```

## Componentes Principais

- `AppBar`: cabeçalho com título, `TodosCounter` e `UserMenu`.
- `TodosList`: lista os itens e integra o `TodoForm` para adicionar novos.
- `TodoForm`: input controlado via `ref` e `addTodo` do store.
- `TodosCounter`: mostra o total de itens.
- `UserMenu`: login/logout simulado usando ações do store.
- `useRenderCounter`: hook simples que loga no console quantas vezes um componente renderizou.

## Estrutura de Pastas

```
src/
  components/       # AppBar, TodosCounter, TodosList, TodoForm, UserMenu
  entities/         # ITodo, IUser
  hooks/            # useRenderCounter
  store/            # globalStore (Zustand + persist)
  utils/            # cn (clsx + tailwind-merge)
  App.tsx
  main.tsx
```

## Como Rodar

Pré-requisitos: Node.js 18+.

- Instalar dependências: `npm install` ou `yarn`
- Desenvolvimento: `npm run dev` abre em `http://localhost:5173`
- Build de produção: `npm run build`
- Preview do build: `npm run preview`

Scripts disponíveis (conforme `package.json`):

- `dev`: inicia o servidor de desenvolvimento Vite
- `build`: compila TypeScript e build de produção
- `preview`: serve o build gerado para inspeção
- `prepare`: instala hooks do Husky

## Padrões de Código

- ESLint com base Airbnb, plugin React Hooks e TypeScript
- Prettier com `prettier-plugin-tailwindcss` para ordenar classes do Tailwind
- Husky + lint-staged para formatar `*.{ts,tsx}` em `pre-commit`
- Commitlint com convenção padronizada (`@commitlint/config-conventional`)

## Personalização

- Persistência: para persistir também o `user`, ajuste o `partialize` em `globalStore.tsx`:

```ts
partialize: (state) => ({ todos: state.todos, user: state.user })
```

- Ações e Seletores: adicione novas ações no store e consuma sempre via seletor: `useGlobalStore((state) => state.minhaAcao)`.
- Estilos: utilize `utils/cn.ts` para compor classes Tailwind com merge seguro.

### Configuração do TailwindCSS (se ainda não estiver habilitado)

O projeto já usa classes utilitárias do Tailwind nos componentes, mas caso você esteja iniciando do zero e não veja os estilos aplicados, configure o Tailwind rapidamente:

- Crie `tailwind.config.js` na raiz:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: { extend: {} },
  plugins: [],
};
```

- Crie `postcss.config.js` na raiz:

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

- Crie `src/index.css` com:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- Importe o CSS em `src/main.tsx`:

```ts
import './index.css';
```

Execute `npm run dev` e os estilos devem ser aplicados corretamente.

## Notas

- O `useRenderCounter` é intencionalmente simples e apenas loga no console; use-o para investigar re-renderizações durante o desenvolvimento.
- Ícones e textos da UI estão em português para uma experiência local.
