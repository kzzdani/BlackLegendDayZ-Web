"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type LiveStatus = {
  serverOnline: boolean;
  players: number | null;
  maxPlayers: number;
  rank: number | null;
  members: number | null;
  online: number | null;
  loading: boolean;
};

const initial: LiveStatus = {
  serverOnline: false,
  players: null,
  maxPlayers: 70,
  rank: null,
  members: null,
  online: null,
  loading: true,
};

const LiveStatusContext = createContext<LiveStatus>(initial);

export function LiveStatusProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<LiveStatus>(initial);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const res = await fetch("/api/status", { cache: "no-store" });
        if (!res.ok) throw new Error("status");
        const data = await res.json();
        if (active) setStatus({ ...data, loading: false });
      } catch {
        if (active) setStatus((s) => ({ ...s, loading: false }));
      }
    };
    load();
    const id = setInterval(load, 60_000);
    const onVisible = () => document.visibilityState === "visible" && load();
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      active = false;
      clearInterval(id);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  return (
    <LiveStatusContext.Provider value={status}>
      {children}
    </LiveStatusContext.Provider>
  );
}

export const useLiveStatus = () => useContext(LiveStatusContext);
