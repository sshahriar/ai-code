"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, MessageCircle, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/profile";
import { cn } from "@/lib/utils";

type ChatRole = "user" | "assistant";

interface UiMessage {
  id: string;
  role: ChatRole;
  content: string;
}

const WELCOME: UiMessage = {
  id: "welcome",
  role: "assistant",
  content: `Hi! I'm ${siteConfig.firstName}'s portfolio assistant. Ask about experience, skills, projects, or how to get in touch.`,
};

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<UiMessage[]>([WELCOME]);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const id = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(id);
  }, [open]);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, loading, open]);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMessage: UiMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      content: trimmed,
    };

    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages
            .filter((m) => m.id !== "welcome")
            .map(({ role, content }) => ({ role, content })),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Something went wrong.");
      }

      const reply =
        typeof data?.message?.content === "string"
          ? data.message.content
          : "Sorry, I could not reply.";

      setMessages((prev) => [
        ...prev,
        { id: `a-${Date.now()}`, role: "assistant", content: reply },
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    void sendMessage(input);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="flex h-[min(32rem,70vh)] w-[min(22rem,calc(100vw-3rem))] flex-col overflow-hidden rounded-2xl border border-border/70 bg-background/90 shadow-lift backdrop-blur-xl"
            role="dialog"
            aria-label="Portfolio chat assistant"
            aria-modal="false"
          >
            <div className="flex items-center justify-between border-b border-border/60 bg-card/60 px-4 py-3">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/15 text-accent">
                  <Bot className="h-4 w-4" aria-hidden />
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Ask {siteConfig.firstName}
                  </p>
                  <p className="text-xs text-muted">Portfolio assistant</p>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Close chat"
                onClick={() => setOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div
              ref={listRef}
              className="flex-1 space-y-3 overflow-y-auto px-3 py-4"
              aria-live="polite"
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex",
                    message.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                      message.role === "user"
                        ? "rounded-br-md bg-accent text-white"
                        : "rounded-bl-md border border-border/60 bg-card/80 text-foreground"
                    )}
                  >
                    {message.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-md border border-border/60 bg-card/80 px-3.5 py-3">
                    <span className="flex gap-1" aria-label="Assistant is typing">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted [animation-delay:0ms]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted [animation-delay:120ms]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted [animation-delay:240ms]" />
                    </span>
                  </div>
                </div>
              )}
            </div>

            {error && (
              <p className="px-4 pb-2 text-xs text-red-500" role="alert">
                {error}
              </p>
            )}

            <form
              onSubmit={onSubmit}
              className="border-t border-border/60 bg-card/40 p-3"
            >
              <div className="flex items-center gap-2">
                <label htmlFor="chat-input" className="sr-only">
                  Message
                </label>
                <input
                  id="chat-input"
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about experience, skills…"
                  disabled={loading}
                  className="h-10 flex-1 rounded-full border border-border bg-background/70 px-4 text-sm text-foreground placeholder:text-muted/70 outline-none focus-visible:ring-2 focus-visible:ring-accent/50 disabled:opacity-60"
                  autoComplete="off"
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={loading || !input.trim()}
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        type="button"
        size="lg"
        className="h-14 gap-2 rounded-full px-5 shadow-lift"
        aria-expanded={open}
        aria-controls={open ? undefined : undefined}
        aria-label={open ? "Close chat" : "Open chat assistant"}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? (
          <X className="h-5 w-5" />
        ) : (
          <>
            <MessageCircle className="h-5 w-5" />
            <span className="hidden sm:inline">Chat</span>
          </>
        )}
      </Button>
    </div>
  );
}
