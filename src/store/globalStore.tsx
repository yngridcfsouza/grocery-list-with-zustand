import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { ITodo } from '../entities/ITodo';
import { IUser } from '../entities/IUser';

type GlobalState = {
  user: IUser | null;
  todos: ITodo[];
  login: () => void;
  logout: () => void;
  addTodo: (title: string, author?: string) => void;
  toggleTodoDone: (todoId: number) => void;
  removeTodo: (todoId: number) => void;
};

export const useGlobalStore = create(
  persist<GlobalState>(
    (set, get) => ({
      user: null,
      todos: [],
      login: () =>
        set({
          user: {
            email: 'yngrid@mail.com.br',
            name: 'Yngrid Souza',
          },
        }),
      logout: () =>
        set({
          user: null,
        }),
      addTodo: (title) =>
        set((state) => ({
          todos:
            state?.todos?.concat({
              id: Date.now(),
              title,
              author: get().user?.name ?? 'Convidado',
              done: false,
            }) ?? [],
        })),
      toggleTodoDone: (id) =>
        set((state) => ({
          todos:
            state?.todos?.map((t) =>
              t.id === id ? { ...t, done: !t.done } : t,
            ) ?? [],
        })),
      removeTodo: (id) =>
        set((state) => ({
          todos: state?.todos?.filter((t) => t.id !== id) ?? [],
        })),
    }),
    {
      name: 'global-storage',
      storage: createJSONStorage(() => localStorage),
      // A tipagem de persist em Zustand v5 espera GlobalState;
      // usamos uma asserção apenas para fins de tipagem, persistindo somente `todos`.
      partialize: (state) => ({ todos: state.todos }) as unknown as GlobalState,
    },
  ),
);
