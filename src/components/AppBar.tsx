import { useRenderCounter } from '../hooks/useRenderCounter';

import { TodosCounter } from './TodosCounter';
import { UserMenu } from './UserMenu';

export function AppBar() {
  useRenderCounter('AppBar');

  return (
    <header className="sticky top-0 z-10 flex h-20 items-center justify-center border-b border-white/5 bg-zinc-950/70 px-6 backdrop-blur-sm">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-6">
          <h1 className="text-3xl font-semibold text-rose-700">Grocery List</h1>
          <TodosCounter />
        </div>

        <UserMenu />
      </div>
    </header>
  );
}
