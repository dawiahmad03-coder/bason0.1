"use client";
import { useEffect, useMemo, useState } from "react";
import { sdk } from "@farcaster/miniapp-sdk";
import { Wallet } from "@coinbase/onchainkit/wallet";
import { useMiniKit } from "@coinbase/onchainkit/minikit";
import styles from "./page.module.css";

type Todo = {
  id: string;
  text: string;
  done: boolean;
  createdAt: number;
};

export default function Home() {
  const { setMiniAppReady, isMiniAppReady, context } = useMiniKit();
  const storageKey = useMemo(
    () => `bason:todos:${context?.user?.fid ?? "guest"}`,
    [context?.user?.fid]
  );

  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    let mounted = true;
    const run = async () => {
      const ok = await sdk.actions.ready().then(() => true).catch(() => false);
      if (mounted && ok) setMiniAppReady();
    };
    run();
    return () => {
      mounted = false;
    };
  }, [setMiniAppReady]);

  useEffect(() => {
    console.log("MiniKit context:", context);
    console.log("Wallet connector:", sdk.wallet);
  }, [context]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw) as Todo[];
        setTodos(parsed);
      } else {
        setTodos([]);
      }
    } catch {
      setTodos([]);
    }
  }, [storageKey]);

  const persist = (next: Todo[]) => {
    setTodos(next);
    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
    } catch {}
  };

  const addTodo = () => {
    const text = input.trim();
    if (!text) return;
    const next: Todo[] = [
      { id: crypto.randomUUID(), text, done: false, createdAt: Date.now() },
      ...todos,
    ];
    setInput("");
    persist(next);
  };

  const toggleTodo = (id: string) => {
    const next = todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
    persist(next);
  };

  const removeTodo = (id: string) => {
    const next = todos.filter((t) => t.id !== id);
    persist(next);
  };

  const clearDone = () => {
    const next = todos.filter((t) => !t.done);
    persist(next);
  };

  const doneCount = todos.filter((t) => t.done).length;

  const connectWallet = async () => {
    if (!context) return;
    try {
      const provider = await sdk.wallet.getEthereumProvider();
      if (!provider) return;
      await provider.request({ method: "eth_requestAccounts" });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.headerWrapper}>
        {isMiniAppReady && context ? <Wallet /> : null}
        {isMiniAppReady && context ? (
          <button className={styles.addButton} onClick={connectWallet}>Connect Wallet</button>
        ) : null}
      </header>

      <div className={styles.todoApp}>
        <h1 className={styles.title}>Bason Todo</h1>

        <div className={styles.inputRow}>
          <input
            className={styles.todoInput}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ajouter une tâche"
            onKeyDown={(e) => {
              if (e.key === "Enter") addTodo();
            }}
          />
          <button className={styles.addButton} onClick={addTodo}>
            Ajouter
          </button>
        </div>

        <div className={styles.metaRow}>
          <span>{todos.length} tâches</span>
          <span>{doneCount} terminées</span>
          <button className={styles.clearButton} onClick={clearDone}>
            Nettoyer terminées
          </button>
        </div>

        <ul className={styles.todoList}>
          {todos.map((t) => (
            <li key={t.id} className={styles.todoItem}>
              <label className={styles.todoLabel}>
                <input
                  type="checkbox"
                  checked={t.done}
                  onChange={() => toggleTodo(t.id)}
                />
                <span className={t.done ? styles.todoTextDone : styles.todoText}>
                  {t.text}
                </span>
              </label>
              <button className={styles.removeButton} onClick={() => removeTodo(t.id)}>
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
