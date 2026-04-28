"use client";

import { FormEvent, useEffect, useState } from "react";
import { KanbanBoard } from "@/components/KanbanBoard";
import { isValidCredentials, readSession, writeSession } from "@/lib/auth";

export const AppShell = () => {
  const [authenticated, setAuthenticated] = useState(() => readSession());
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setAuthenticated(readSession());
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isValidCredentials(username.trim(), password)) {
      setError("Invalid credentials. Use user / password.");
      return;
    }

    writeSession(true);
    setAuthenticated(true);
    setUsername("");
    setPassword("");
    setError("");
  };

  const handleLogout = () => {
    writeSession(false);
    setAuthenticated(false);
  };

  if (!authenticated) {
    return (
      <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6">
        <section className="rounded-3xl border border-[var(--stroke)] bg-white p-8 shadow-[var(--shadow)]">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--gray-text)]">
            Project Management MVP
          </p>
          <h1 className="mt-3 font-display text-3xl font-semibold text-[var(--navy-dark)]">
            Sign in
          </h1>
          <p className="mt-2 text-sm text-[var(--gray-text)]">
            Use the demo credentials to access the Kanban board.
          </p>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <label className="block text-sm font-semibold text-[var(--navy-dark)]">
              Username
              <input
                className="mt-1 w-full rounded-xl border border-[var(--stroke)] px-3 py-2 text-sm"
                name="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                autoComplete="username"
              />
            </label>
            <label className="block text-sm font-semibold text-[var(--navy-dark)]">
              Password
              <input
                className="mt-1 w-full rounded-xl border border-[var(--stroke)] px-3 py-2 text-sm"
                name="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
              />
            </label>
            {error ? (
              <p className="text-sm font-medium text-red-700" role="alert">
                {error}
              </p>
            ) : null}
            <button
              type="submit"
              className="w-full rounded-xl bg-[var(--secondary-purple)] px-4 py-2 text-sm font-semibold text-white"
            >
              Sign in
            </button>
          </form>
          <p className="mt-4 text-xs text-[var(--gray-text)]">
            Demo credentials: user / password
          </p>
        </section>
      </main>
    );
  }

  return (
    <>
      <div className="fixed right-6 top-5 z-10">
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-full border border-[var(--stroke)] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--navy-dark)] shadow-sm"
        >
          Log out
        </button>
      </div>
      <KanbanBoard />
    </>
  );
};
