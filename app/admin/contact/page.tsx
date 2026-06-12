"use client";

import { useState, useEffect, useCallback } from "react";
import { Mail, Search, Reply, Trash2, CheckCheck, Phone, User, Clock, Loader2 } from "lucide-react";
import { PageHeader, Card, Button, Badge, Input } from "../components/ui";

type Message = {
  id: number; name: string; email: string; phone: string;
  subject: string; message: string; is_read: number; is_important: number; created_at: string;
};

function timeAgo(ts: string) {
  const diff = (Date.now() - new Date(ts).getTime()) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function ContactMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [query, setQuery] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/contact");
    const data = await res.json();
    const msgs: Message[] = data.messages ?? [];
    setMessages(msgs);
    if (msgs.length > 0 && !selectedId) setSelectedId(msgs[0].id);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const selectMsg = async (m: Message) => {
    setSelectedId(m.id);
    if (!m.is_read) {
      await fetch(`/api/contact/${m.id}`, { method:"PATCH", headers:{"Content-Type":"application/json"}, body: JSON.stringify({is_read:true}) });
      setMessages((prev) => prev.map((x) => x.id===m.id ? {...x, is_read:1} : x));
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this message?")) return;
    await fetch(`/api/contact/${id}`, { method:"DELETE" });
    const remaining = messages.filter((m) => m.id !== id);
    setMessages(remaining);
    setSelectedId(remaining[0]?.id ?? null);
  };

  const markAllRead = async () => {
    await Promise.all(messages.filter((m) => !m.is_read).map((m) =>
      fetch(`/api/contact/${m.id}`, { method:"PATCH", headers:{"Content-Type":"application/json"}, body:JSON.stringify({is_read:true}) })
    ));
    setMessages((prev) => prev.map((m) => ({...m, is_read:1})));
  };

  const filtered = messages.filter((m) =>
    !query || m.name.toLowerCase().includes(query.toLowerCase()) ||
    m.subject?.toLowerCase().includes(query.toLowerCase())
  );

  const current = messages.find((m) => m.id === selectedId) ?? null;
  const unreadCount = messages.filter((m) => !m.is_read).length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Contact Messages"
        subtitle={`Inbox · ${unreadCount} unread message${unreadCount !== 1 ? "s" : ""}`}
        breadcrumbs={[{label:"Admin",href:"/admin"},{label:"Contact"}]}
        actions={
          <Button variant="outline" onClick={markAllRead} disabled={unreadCount===0}>
            <CheckCheck className="w-4 h-4"/> Mark all read
          </Button>
        }
      />

      {loading ? (
        <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-slate-400"/></div>
      ) : (
        <Card className="overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-[360px_1fr] divide-x divide-slate-100">
            {/* List */}
            <div className="flex flex-col max-h-[70vh]">
              <div className="p-4 border-b border-slate-100">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"/>
                  <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search messages…" className="pl-10"/>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
                {filtered.map((m) => (
                  <button key={m.id} onClick={() => selectMsg(m)}
                    className={`w-full text-left px-4 py-3 hover:bg-slate-50 transition ${selectedId===m.id ? "bg-orange-50/40 border-l-2 border-saffron" : ""}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                        {m.name[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-0.5">
                          <span className={`text-sm truncate ${!m.is_read?"font-bold text-navy":"font-medium text-slate-700"}`}>{m.name}</span>
                          <span className="text-[10px] text-slate-400 shrink-0">{timeAgo(m.created_at)}</span>
                        </div>
                        <div className={`text-xs truncate ${!m.is_read?"font-semibold text-slate-700":"text-slate-500"}`}>{m.subject}</div>
                        <div className="text-[11px] text-slate-400 truncate mt-0.5">{m.message}</div>
                      </div>
                      {!m.is_read && <span className="w-2 h-2 bg-saffron rounded-full mt-2 shrink-0"/>}
                    </div>
                  </button>
                ))}
                {filtered.length===0 && <p className="text-center py-10 text-sm text-slate-400">No messages.</p>}
              </div>
            </div>

            {/* Detail */}
            {current ? (
              <div className="flex flex-col">
                <div className="px-6 py-4 border-b border-slate-100">
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <h2 className="text-lg font-semibold text-navy">{current.subject}</h2>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline"><Reply className="w-3.5 h-3.5"/> Reply</Button>
                      <button onClick={() => handleDelete(current.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4"/></button>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold shrink-0">
                      {current.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-slate-800">{current.name}</div>
                      <div className="text-xs text-slate-500 flex items-center gap-3 flex-wrap">
                        <span className="inline-flex items-center gap-1"><Mail className="w-3 h-3"/> {current.email}</span>
                        {current.phone && <span className="inline-flex items-center gap-1"><Phone className="w-3 h-3"/> {current.phone}</span>}
                        <span className="inline-flex items-center gap-1"><Clock className="w-3 h-3"/> {timeAgo(current.created_at)}</span>
                      </div>
                    </div>
                    {!!current.is_important && <Badge color="orange">Important</Badge>}
                  </div>
                </div>
                <div className="p-6 flex-1 overflow-y-auto">
                  <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">{current.message}</p>
                </div>
                <div className="border-t border-slate-100 p-4">
                  <textarea rows={3} placeholder="Type your reply…"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:border-saffron focus:ring-4 focus:ring-saffron/10 outline-none transition mb-2"/>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-400 inline-flex items-center gap-1">
                      <User className="w-3 h-3"/> Reply from <span className="font-semibold ml-1">info@wrfi.org</span>
                    </span>
                    <Button variant="primary" size="md"><Reply className="w-4 h-4"/> Send Reply</Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center text-slate-400 text-sm py-20">Select a message</div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}
