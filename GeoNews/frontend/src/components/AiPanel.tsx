"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import type { BriefPayload, ChatResponse } from "@/lib/types";

const SUGGESTIONS = [
  "Brief this place",
  "What should I watch?",
  "Summarize risk",
] as const;

interface AiPanelProps {
  brief: BriefPayload | null;
  messages: Array<{ role: "user" | "assistant"; text: string }>;
  loading: boolean;
  /** Backend answered with `mock: true` or health reports `llm: mock`. */
  mockMode?: boolean;
  error?: string | null;
  onSend: (message: string) => Promise<ChatResponse | void>;
  onLoadBrief: () => void;
  onRetry?: () => void;
  placeName?: string;
}

function SparkIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2.2 13.4 8l5.8 1.4L13.4 10.8 12 16.6l-1.4-5.8L4.8 9.4 10.6 8 12 2.2Zm6.5 11.1 1 3.2 3.2 1-3.2 1-1 3.2-1-3.2-3.2-1 3.2-1 1-3.2ZM5.2 14.4l.7 2.2 2.2.7-2.2.7-.7 2.2-.7-2.2-2.2-.7 2.2-.7.7-2.2Z"
      />
    </svg>
  );
}

export function AiPanel({
  brief,
  messages,
  loading,
  mockMode = false,
  error = null,
  onSend,
  onLoadBrief,
  onRetry,
  placeName,
}: AiPanelProps) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [unread, setUnread] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fabRef = useRef<HTMLButtonElement>(null);
  const transcriptRef = useRef<HTMLDivElement>(null);
  const prevCount = useRef(messages.length);

  useEffect(() => {
    if (!open && messages.length > prevCount.current) {
      const last = messages[messages.length - 1];
      if (last?.role === "assistant") setUnread(true);
    }
    prevCount.current = messages.length;
  }, [messages, open]);

  useEffect(() => {
    if (open) setUnread(false);
  }, [open]);

  function openPanel() {
    setOpen(true);
    setUnread(false);
  }

  function closePanel() {
    setOpen(false);
    window.setTimeout(() => fabRef.current?.focus(), 0);
  }

  function toggleOpen() {
    if (open) closePanel();
    else openPanel();
  }

  useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(() => inputRef.current?.focus(), 40);
    return () => window.clearTimeout(id);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closePanel();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const node = transcriptRef.current;
    if (!open || !node) return;
    node.scrollTop = node.scrollHeight;
  }, [messages, loading, brief, open]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    setDraft("");
    await onSend(trimmed);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    await send(draft);
  }

  function onComposerKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void send(draft);
    }
  }

  const placeLabel = placeName?.trim() || "Selected area";

  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-visible">
      <div
        className={`ai-overlay pointer-events-auto absolute bottom-[4.75rem] right-4 sm:bottom-20 sm:right-6 ${
          open ? "ai-overlay-open" : "ai-overlay-closed"
        }`}
        data-open={open ? "true" : "false"}
      >
        <section
          data-testid="ai-panel"
          id="ai-panel"
          role="complementary"
          aria-label="AI analyst"
          aria-hidden={!open}
          inert={!open ? true : undefined}
          className="flex h-[min(560px,70vh)] w-[min(380px,calc(100vw-24px))] flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--panel)]/95 shadow-[var(--shadow)] backdrop-blur-md"
        >
          <div className="flex items-center justify-between gap-2 border-b border-[var(--border)] px-3 py-2">
            <div className="min-w-0">
              <p className="font-display text-sm font-semibold text-[var(--text)]">
                AI analyst
              </p>
              <p className="truncate text-[11px] text-[var(--text-muted)]">
                {placeLabel}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <button
                type="button"
                onClick={onLoadBrief}
                disabled={loading}
                className="rounded-md px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-[var(--accent)] ring-1 ring-[var(--accent)]/30 hover:bg-[var(--accent)]/10 disabled:opacity-50"
              >
                Brief place
              </button>
              <button
                type="button"
                aria-label="Close AI analyst"
                onClick={closePanel}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[var(--text-muted)] hover:bg-[var(--panel-2)] hover:text-[var(--text)]"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
          </div>

          <div className="flex min-h-0 flex-1 flex-col gap-2 px-3 py-2">
            {mockMode ? (
              <p
                data-testid="ai-mock-badge"
                className="rounded-md border border-dashed border-[var(--warning)]/50 bg-[var(--warning)]/5 px-2 py-1.5 text-[11px] leading-relaxed text-[var(--warning)]"
              >
                <span className="font-semibold uppercase tracking-wide">Mock AI</span>{" "}
                — replies are deterministic fixtures, not live analysis. Live AI needs
                an OpenRouter API key in the backend environment and LLM_MOCK=false.
              </p>
            ) : null}

            {error ? (
              <div
                data-testid="ai-error"
                role="alert"
                className="flex flex-wrap items-center gap-2 rounded-md border border-[var(--alert)]/50 bg-[var(--alert)]/5 px-2 py-1.5 text-[11px] text-[var(--alert)]"
              >
                <span>{error}</span>
                {onRetry ? (
                  <button
                    type="button"
                    data-testid="ai-error-retry"
                    onClick={onRetry}
                    disabled={loading}
                    className="rounded-md px-2 py-0.5 font-semibold uppercase tracking-wide ring-1 ring-[var(--alert)]/40 hover:bg-[var(--alert)]/10 disabled:opacity-50"
                  >
                    Retry
                  </button>
                ) : null}
              </div>
            ) : null}

            <div
              ref={transcriptRef}
              className="min-h-0 flex-1 space-y-2 overflow-y-auto pr-0.5 text-[12px]"
            >
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
                </div>
              ) : null}

              {messages.length === 0 ? (
                <p className="px-2 py-6 text-center text-[var(--text-muted)]">
                  Ask for a brief, hotspot summary, or watchlist suggestion.
                </p>
              ) : (
                messages.map((m, i) => (
                  <div
                    key={`${m.role}-${i}`}
                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <p
                      className={`ai-bubble max-w-[85%] whitespace-pre-wrap break-words rounded-2xl px-3 py-2 ${
                        m.role === "user"
                          ? "rounded-br-md bg-[var(--accent)] text-[var(--bg)]"
                          : "rounded-bl-md bg-[var(--panel-2)] text-[var(--text)]"
                      }`}
                    >
                      {m.text}
                    </p>
                  </div>
                ))
              )}

              {loading ? (
                <div
                  className="flex justify-start"
                  aria-live="polite"
                  aria-busy="true"
                >
                  <p className="rounded-2xl rounded-bl-md bg-[var(--panel-2)] px-3 py-2 text-[var(--text-muted)]">
                    <span className="sr-only">Thinking…</span>
                    <span className="ai-typing" aria-hidden="true">
                      <span />
                      <span />
                      <span />
                    </span>
                  </p>
                </div>
              ) : null}
            </div>

            {messages.length === 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {SUGGESTIONS.map((hint) => (
                  <button
                    key={hint}
                    type="button"
                    disabled={loading}
                    onClick={() => void send(hint)}
                    className="rounded-full border border-[var(--border)] bg-[var(--panel-2)] px-2.5 py-1 text-[11px] text-[var(--text)] hover:border-[var(--accent)]/50 hover:text-[var(--accent)] disabled:opacity-50"
                  >
                    {hint}
                  </button>
                ))}
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="flex gap-2">
              <textarea
                ref={inputRef}
                data-testid="ai-input"
                rows={1}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={onComposerKeyDown}
                placeholder="Brief this place…"
                className="min-h-[38px] flex-1 resize-none rounded-lg border border-[var(--border)] bg-[var(--panel-2)] px-3 py-2 text-sm text-[var(--text)] outline-none placeholder:text-[var(--placeholder)] focus:border-[var(--accent)]/50"
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
        </section>
      </div>

      <button
        ref={fabRef}
        type="button"
        data-testid="ai-fab"
        aria-label={open ? "Close AI analyst" : "Open AI analyst"}
        aria-expanded={open}
        aria-controls="ai-panel"
        onClick={toggleOpen}
        className={`ai-fab pointer-events-auto absolute bottom-10 right-4 inline-flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--panel)] text-[var(--accent)] shadow-[var(--shadow)] outline-none hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-[var(--accent)] sm:right-6 ${
          loading ? "ai-fab-busy" : ""
        }`}
      >
        <SparkIcon className="h-5 w-5" />
        {unread && !open ? (
          <span
            data-testid="ai-unread"
            className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-[var(--accent)]"
          />
        ) : null}
      </button>
    </div>
  );
}
