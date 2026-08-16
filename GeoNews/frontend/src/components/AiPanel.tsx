"use client";

import { useState, type FormEvent } from "react";
import type { BriefPayload, ChatResponse } from "@/lib/types";

interface AiPanelProps {
  brief: BriefPayload | null;
  messages: Array<{ role: "user" | "assistant"; text: string }>;
  loading: boolean;
  usingFixtures?: boolean;
  onSend: (message: string) => Promise<ChatResponse | void>;
  onLoadBrief: () => void;
}

export function AiPanel({
  brief,
  messages,
  loading,
  usingFixtures = false,
  onSend,
  onLoadBrief,
}: AiPanelProps) {
  const [open, setOpen] = useState(true);
  const [draft, setDraft] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const text = draft.trim();
    if (!text || loading) return;
    setDraft("");
    await onSend(text);
  }

  return (
    <section
      data-testid="ai-panel"
      className="flex min-h-0 flex-col border-t border-[var(--border)] bg-[var(--panel)]/95"
    >
      <div className="flex items-center justify-between gap-2 px-3 py-2">
        <button
          type="button"
          className="font-display text-sm font-semibold text-[var(--text)]"
          onClick={() => setOpen((v) => !v)}
        >
          AI analyst {open ? "▾" : "▸"}
        </button>
        <button
          type="button"
          onClick={onLoadBrief}
          disabled={loading}
          className="rounded-md px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-[var(--accent)] ring-1 ring-[var(--accent)]/30 hover:bg-[var(--accent)]/10 disabled:opacity-50"
        >
          Brief place
        </button>
      </div>

      {open ? (
        <div className="flex min-h-0 flex-1 flex-col gap-2 px-3 pb-3">
          {brief ? (
            <div
              data-testid="ai-brief"
              className="rounded-lg border border-[var(--border)] bg-[var(--bg)]/50 p-3"
            >
              <p className="text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                {brief.place_name} · {brief.window} · {brief.risk_level}
              </p>
              <h3 className="mt-1 font-display text-sm font-semibold text-[var(--text)]">
                {brief.headline}
              </h3>
              <ul className="mt-2 space-y-1 text-[12px] text-[var(--text-muted)]">
                {brief.bullets.map((b) => (
                  <li key={b}>• {b}</li>
                ))}
              </ul>
              {brief.caveats.length > 0 ? (
                <div className="mt-3 space-y-1 border-t border-dashed border-[var(--warning)]/40 pt-2">
                  {brief.caveats.map((c) => (
                    <p key={c} className="text-[11px] text-[var(--warning)]">
                      Caveat: {c}
                    </p>
                  ))}
                </div>
              ) : null}
              {usingFixtures ? (
                <p className="mt-2 text-[10px] text-[var(--text-muted)]">
                  Served from fixtures (API unreachable or mock).
                </p>
              ) : null}
            </div>
          ) : null}

          <div className="max-h-36 min-h-[4rem] flex-1 space-y-2 overflow-y-auto text-[12px]">
            {messages.length === 0 ? (
              <p className="text-[var(--text-muted)]">
                Ask for a brief, hotspot summary, or watchlist suggestion.
              </p>
            ) : (
              messages.map((m, i) => (
                <p
                  key={`${m.role}-${i}`}
                  className={
                    m.role === "user"
                      ? "text-[var(--accent)]"
                      : "text-[var(--text-muted)]"
                  }
                >
                  <span className="font-semibold uppercase tracking-wide">
                    {m.role === "user" ? "You" : "Analyst"}:
                  </span>{" "}
                  {m.text}
                </p>
              ))
            )}
            {loading ? (
              <p className="animate-pulse text-[var(--text-muted)]">Thinking…</p>
            ) : null}
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2">
            <textarea
              data-testid="ai-input"
              rows={1}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Brief this place…"
              className="min-h-[38px] flex-1 resize-none rounded-lg border border-[var(--border)] bg-[var(--bg)]/70 px-3 py-2 text-sm text-[var(--text)] outline-none focus:border-[var(--accent)]/50"
            />
            <button
              type="submit"
              disabled={loading || !draft.trim()}
              className="rounded-lg bg-[var(--accent)] px-3 text-sm font-semibold text-[var(--bg)] disabled:opacity-40"
            >
              Send
            </button>
          </form>
        </div>
      ) : null}
    </section>
  );
}
