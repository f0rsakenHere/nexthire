"use client";

import { useState, useEffect, useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  PlusIcon,
  XIcon,
  ExternalLinkIcon,
  MicIcon,
  FileTextIcon,
  Trash2Icon,
  BuildingIcon,
  BriefcaseIcon,
  MapPinIcon,
  DollarSignIcon,
  StickyNoteIcon,
  LinkIcon,
  CheckCircleIcon,
  EditIcon,
  ZapIcon,
  TrendingUpIcon,
  AwardIcon,
} from "lucide-react";
import Link from "next/link";

// ── Types ──────────────────────────────────────────────────────────────────────
type Status =
  | "wishlist"
  | "applied"
  | "phone_screen"
  | "interview"
  | "offer"
  | "rejected";

interface Application {
  id: string;
  company: string;
  role: string;
  status: Status;
  salaryRange: string;
  location: string;
  jdUrl: string;
  jdText: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

// ── Column config ──────────────────────────────────────────────────────────────
const COLUMNS: {
  key: Status;
  label: string;
  color: string;
  bg: string;
  border: string;
  dot: string;
}[] = [
  {
    key: "wishlist",
    label: "Wishlist",
    color: "text-slate-600",
    bg: "bg-slate-50",
    border: "border-slate-200",
    dot: "bg-slate-400",
  },
  {
    key: "applied",
    label: "Applied",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
    dot: "bg-blue-500",
  },
  {
    key: "phone_screen",
    label: "Phone Screen",
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
    dot: "bg-amber-500",
  },
  {
    key: "interview",
    label: "Interview",
    color: "text-purple-600",
    bg: "bg-purple-50",
    border: "border-purple-200",
    dot: "bg-purple-500",
  },
  {
    key: "offer",
    label: "Offer 🎉",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    dot: "bg-emerald-500",
  },
  {
    key: "rejected",
    label: "Rejected",
    color: "text-rose-600",
    bg: "bg-rose-50",
    border: "border-rose-200",
    dot: "bg-rose-500",
  },
];

const EMPTY_FORM = {
  company: "",
  role: "",
  status: "wishlist" as Status,
  salaryRange: "",
  location: "",
  jdUrl: "",
  jdText: "",
  notes: "",
};

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const d = Math.floor(diff / 86400000);
  if (d === 0) return "today";
  if (d === 1) return "1d ago";
  if (d < 7) return `${d}d ago`;
  if (d < 30) return `${Math.floor(d / 7)}w ago`;
  return `${Math.floor(d / 30)}mo ago`;
}

const INPUT =
  "w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none";

const STATUS_PILLS: {
  key: Status;
  label: string;
  active: string;
  inactive: string;
}[] = [
  {
    key: "wishlist",
    label: "Wishlist",
    active: "bg-slate-600 text-white  border-slate-600",
    inactive:
      "bg-transparent text-slate-500 border-slate-300 hover:bg-slate-50",
  },
  {
    key: "applied",
    label: "Applied",
    active: "bg-blue-600 text-white   border-blue-600",
    inactive:
      "bg-transparent text-blue-500   border-blue-200   hover:bg-blue-50",
  },
  {
    key: "phone_screen",
    label: "Phone",
    active: "bg-amber-500 text-white  border-amber-500",
    inactive:
      "bg-transparent text-amber-500  border-amber-200  hover:bg-amber-50",
  },
  {
    key: "interview",
    label: "Interview",
    active: "bg-purple-600 text-white border-purple-600",
    inactive:
      "bg-transparent text-purple-500 border-purple-200 hover:bg-purple-50",
  },
  {
    key: "offer",
    label: "Offer 🎉",
    active: "bg-emerald-600 text-white border-emerald-600",
    inactive:
      "bg-transparent text-emerald-500 border-emerald-200 hover:bg-emerald-50",
  },
  {
    key: "rejected",
    label: "Rejected",
    active: "bg-rose-600 text-white   border-rose-600",
    inactive:
      "bg-transparent text-rose-500   border-rose-200   hover:bg-rose-50",
  },
];

// ── Add / Edit modal ───────────────────────────────────────────────────────────
function AppModal({
  initial,
  onSave,
  onClose,
}: {
  initial: Partial<Application> & { status: Status };
  onSave: (data: typeof EMPTY_FORM) => Promise<void>;
  onClose: () => void;
}) {
  const [form, setForm] = useState({ ...EMPTY_FORM, ...initial });
  const [saving, setSaving] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isEditing = !!initial.id;

  function set(k: keyof typeof EMPTY_FORM, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function handleSave() {
    if (!form.company.trim() || !form.role.trim()) return;
    setSaving(true);
    await onSave(form);
    setSaving(false);
  }

  function handleBackdrop(e: React.MouseEvent) {
    if (ref.current && !ref.current.contains(e.target as Node)) onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-md animate-in fade-in duration-200 p-0 sm:p-4"
      onMouseDown={handleBackdrop}
    >
      <div
        ref={ref}
        className="w-full sm:max-w-xl bg-background border border-border/80 rounded-none sm:rounded-none shadow-[0_0_80px_rgba(0,0,0,0.3)] animate-in slide-in-from-bottom-6 duration-300 flex flex-col max-h-[92vh]"
      >
        <div className="h-0.5 w-full bg-gradient-to-r from-primary via-blue-500 to-purple-500 shrink-0" />

        <div className="flex items-center justify-between px-6 py-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="size-7 rounded-none bg-primary/10 border border-primary/20 flex items-center justify-center">
              <BriefcaseIcon className="size-3.5 text-primary" />
            </div>
            <div>
              <h2 className="text-sm font-black text-foreground tracking-tight">
                {isEditing ? "Edit Application" : "New Application"}
              </h2>
              <p className="text-[10px] text-muted-foreground font-mono">
                {isEditing
                  ? "Update your job details"
                  : "Track a new opportunity"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="size-7 flex items-center justify-center rounded-none border border-transparent hover:border-border hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-all"
          >
            <XIcon className="size-3.5" />
          </button>
        </div>

        <div className="px-6 pb-2 flex flex-col gap-5 overflow-y-auto flex-1">
          <div className="grid sm:grid-cols-2 gap-4">
            <ModalField
              label="Company"
              icon={<BuildingIcon className="size-3" />}
              required
            >
              <input
                value={form.company}
                onChange={(e) => set("company", e.target.value)}
                placeholder="e.g. Google"
                autoFocus
                className={INPUT}
              />
            </ModalField>
            <ModalField
              label="Role"
              icon={<BriefcaseIcon className="size-3" />}
              required
            >
              <input
                value={form.role}
                onChange={(e) => set("role", e.target.value)}
                placeholder="e.g. Frontend Engineer"
                className={INPUT}
              />
            </ModalField>
          </div>

          <div className="flex flex-col gap-2">
            <span className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              <CheckCircleIcon className="size-3" /> Stage
            </span>
            <div className="flex flex-wrap gap-1.5">
              {STATUS_PILLS.map((p) => (
                <button
                  key={p.key}
                  type="button"
                  onClick={() => set("status", p.key)}
                  className={`px-3 py-1 text-[11px] font-bold font-mono rounded-none border transition-all duration-150 ${
                    form.status === p.key ? p.active : p.inactive
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <ModalField
              label="Location"
              icon={<MapPinIcon className="size-3" />}
            >
              <input
                value={form.location}
                onChange={(e) => set("location", e.target.value)}
                placeholder="Remote / New York, NY"
                className={INPUT}
              />
            </ModalField>
            <ModalField
              label="Salary Range"
              icon={<DollarSignIcon className="size-3" />}
            >
              <input
                value={form.salaryRange}
                onChange={(e) => set("salaryRange", e.target.value)}
                placeholder="$120k – $160k"
                className={INPUT}
              />
            </ModalField>
          </div>

          <ModalField
            label="Job Posting URL"
            icon={<LinkIcon className="size-3" />}
          >
            <input
              value={form.jdUrl}
              onChange={(e) => set("jdUrl", e.target.value)}
              placeholder="https://careers.company.com/..."
              className={INPUT}
            />
          </ModalField>

          {/* JD */}
          <ModalField
            label="Job Description"
            icon={<FileTextIcon className="size-3" />}
            hint="Paste the full JD to unlock AI-powered Score Resume & Prep Interview"
          >
            <textarea
              value={form.jdText}
              onChange={(e) => set("jdText", e.target.value)}
              placeholder="Paste the full job description here…"
              rows={4}
              className={`${INPUT} resize-none leading-relaxed`}
            />
          </ModalField>

          {/* Notes */}
          <ModalField
            label="Notes"
            icon={<StickyNoteIcon className="size-3" />}
          >
            <textarea
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
              placeholder="Recruiter name, follow-up date, first impressions…"
              rows={3}
              className={`${INPUT} resize-none leading-relaxed`}
            />
          </ModalField>
        </div>

        {/* ── Footer */}
        <div className="px-6 py-4 border-t border-border/50 flex items-center justify-between shrink-0 bg-muted/20">
          <p className="text-[10px] font-mono text-muted-foreground/60">
            * Required fields
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-mono text-muted-foreground hover:text-foreground border border-border hover:border-foreground/20 transition-all rounded-none"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving || !form.company.trim() || !form.role.trim()}
              className="relative px-6 py-2 text-sm font-bold bg-gradient-to-r from-primary to-blue-600 text-primary-foreground rounded-none shadow-[0_0_20px_oklch(0.62_0.26_278/0.35)] hover:shadow-[0_0_32px_oklch(0.62_0.26_278/0.55)] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed overflow-hidden group"
            >
              {/* Shimmer on hover */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative flex items-center gap-2">
                {saving ? (
                  <>
                    <span className="size-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    Saving…
                  </>
                ) : isEditing ? (
                  "Save Changes"
                ) : (
                  <>
                    <PlusIcon className="size-3.5" />
                    Add Application
                  </>
                )}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ModalField({
  label,
  icon,
  required,
  hint,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
        <span className="text-primary/60">{icon}</span>
        {label}
        {required && <span className="text-primary/80 text-[9px]">*</span>}
      </label>
      <div className="rounded-none border border-border/50 bg-background focus-within:border-primary/60 focus-within:shadow-[0_0_0_3px_oklch(0.62_0.26_278/0.08)] transition-all duration-200 px-3 py-2.5">
        {children}
      </div>
      {hint && (
        <p className="text-[10px] text-muted-foreground/60 font-mono leading-relaxed">
          {hint}
        </p>
      )}
    </div>
  );
}

// ── Application card ───────────────────────────────────────────────────────────
const STATUS_ACCENT: Record<Status, string> = {
  wishlist: "border-l-slate-400",
  applied: "border-l-blue-500",
  phone_screen: "border-l-amber-500",
  interview: "border-l-purple-500",
  offer: "border-l-emerald-500",
  rejected: "border-l-rose-400",
};

function AppCard({
  app,
  onEdit,
  onDelete,
  onMove,
  isDragging,
  onDragStart,
  onDragEnd,
}: {
  app: Application;
  onEdit: (a: Application) => void;
  onDelete: (id: string) => void;
  onMove: (id: string, status: Status) => void;
  isDragging: boolean;
  onDragStart: () => void;
  onDragEnd: () => void;
}) {
  const prepUrl = `/dashboard/mock-interview?role=${encodeURIComponent(app.role)}&company=${encodeURIComponent(app.company)}`;
  const scoreUrl = `/dashboard/resume-scorer${app.jdText ? `?jd=${encodeURIComponent(app.jdText.slice(0, 2000))}` : ""}`;
  const initials = app.company.slice(0, 2).toUpperCase();
  const nextCol = COLUMNS[COLUMNS.findIndex((c) => c.key === app.status) + 1];

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      className={`group flex flex-col flex-1 rounded-none bg-background border-l-[3px] border border-border/40 transition-all duration-200 select-none ${
        STATUS_ACCENT[app.status]
      } ${
        isDragging
          ? "shadow-[0_8px_30px_rgba(0,0,0,0.12)] rotate-1 opacity-80 scale-[1.02]"
          : "hover:border-border/70 hover:shadow-[0_2px_12px_rgba(0,0,0,0.07)]"
      }`}
    >
      {/* ── Top: avatar + company + actions */}
      <div className="px-2.5 pt-2.5 pb-1.5 flex items-start gap-2">
        {/* Company initial avatar */}
        <div className="size-6 shrink-0 rounded-none bg-primary/8 border border-primary/15 flex items-center justify-center cursor-grab active:cursor-grabbing">
          <span className="text-[9px] font-black text-primary/70 tracking-tight">
            {initials}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-1">
            <div className="min-w-0">
              <p className="font-bold text-xs text-foreground truncate leading-tight">
                {app.company}
              </p>
              <p className="text-[10px] text-muted-foreground truncate">
                {app.role}
              </p>
            </div>
            {/* Edit / delete — appear on hover */}
            <div className="flex items-center gap-0.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => onEdit(app)}
                className="size-5 flex items-center justify-center hover:bg-muted rounded-none transition-colors text-muted-foreground hover:text-foreground"
              >
                <EditIcon className="size-2.5" />
              </button>
              <button
                onClick={() => onDelete(app.id)}
                className="size-5 flex items-center justify-center hover:bg-rose-50 rounded-none transition-colors text-muted-foreground hover:text-rose-500"
              >
                <Trash2Icon className="size-2.5" />
              </button>
            </div>
          </div>

          {/* Meta pills */}
          <div className="flex flex-wrap gap-1 mt-1">
            {app.location && (
              <span className="flex items-center gap-0.5 text-[9px] text-muted-foreground/70 font-mono bg-muted/40 px-1 py-0.5">
                <MapPinIcon className="size-2" />
                {app.location}
              </span>
            )}
            {app.salaryRange && (
              <span className="flex items-center gap-0.5 text-[9px] text-muted-foreground/70 font-mono bg-muted/40 px-1 py-0.5">
                <DollarSignIcon className="size-2" />
                {app.salaryRange}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Notes preview */}
      {app.notes && (
        <div className="mx-2.5 mb-1.5 px-2 py-1.5 bg-muted/30 border-l-2 border-border/40">
          <p className="text-[9px] text-muted-foreground/80 leading-relaxed line-clamp-2">
            {app.notes}
          </p>
        </div>
      )}

      {/* Spacer — pushes action buttons + footer to bottom */}
      <div className="flex-1" />

      {/* ── AI Quick Actions */}
      <div className="px-2.5 pb-1.5 grid grid-cols-2 gap-1">
        <Link
          href={prepUrl}
          className="flex items-center justify-center gap-1 py-1.5 text-[9px] font-bold font-mono uppercase tracking-wider rounded-none bg-primary/6 hover:bg-primary/12 text-primary border border-primary/15 hover:border-primary/35 transition-all"
        >
          <MicIcon className="size-2.5" /> Prep
        </Link>
        <Link
          href={scoreUrl}
          className="flex items-center justify-center gap-1 py-1.5 text-[9px] font-bold font-mono uppercase tracking-wider rounded-none bg-blue-500/6 hover:bg-blue-500/12 text-blue-600 border border-blue-200/60 hover:border-blue-300 transition-all"
        >
          <FileTextIcon className="size-2.5" /> Score
        </Link>
      </div>

      {/* ── Footer */}
      <div className="px-2.5 pb-2 flex items-center justify-between gap-1">
        <span className="text-[8px] font-mono text-muted-foreground/40">
          {timeAgo(app.updatedAt)}
        </span>
        <div className="flex items-center gap-1">
          {app.jdUrl && (
            <a
              href={app.jdUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-0.5 text-[8px] font-mono text-muted-foreground hover:text-primary transition-colors"
            >
              <ExternalLinkIcon className="size-2" /> JD
            </a>
          )}
          {nextCol && (
            <button
              onClick={() => onMove(app.id, nextCol.key)}
              className={`flex items-center gap-0.5 text-[8px] font-bold font-mono px-1.5 py-0.5 border rounded-none transition-all ${nextCol.color} ${nextCol.border}`}
            >
              → {nextCol.label}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Kanban column ──────────────────────────────────────────────────────────────
const COL_ACCENT: Record<Status, string> = {
  wishlist: "border-t-slate-400",
  applied: "border-t-blue-500",
  phone_screen: "border-t-amber-500",
  interview: "border-t-purple-500",
  offer: "border-t-emerald-500",
  rejected: "border-t-rose-400",
};

function KanbanColumn({
  col,
  apps,
  onAdd,
  onEdit,
  onDelete,
  onMove,
  draggingId,
  onDragStart,
  onDragEnd,
  onDrop,
}: {
  col: (typeof COLUMNS)[number];
  apps: Application[];
  onAdd: (status: Status) => void;
  onEdit: (a: Application) => void;
  onDelete: (id: string) => void;
  onMove: (id: string, status: Status) => void;
  draggingId: string | null;
  onDragStart: (id: string) => void;
  onDragEnd: () => void;
  onDrop: (status: Status) => void;
}) {
  const [dragOver, setDragOver] = useState(false);

  return (
    <div
      className={`flex flex-col rounded-none border-t-2 border border-border/40 bg-background/60 transition-all duration-200 ${COL_ACCENT[col.key]} ${
        dragOver && draggingId
          ? "ring-2 ring-primary/30 shadow-[0_0_24px_oklch(0.62_0.26_278/0.1)]"
          : ""
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={() => {
        setDragOver(false);
        onDrop(col.key);
      }}
    >
      {/* Column header */}
      <div className="flex items-center justify-between px-2 py-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className={`size-1.5 rounded-full shrink-0 ${col.dot}`} />
          <span
            className={`text-[10px] font-extrabold font-mono uppercase tracking-widest truncate ${col.color}`}
          >
            {col.label}
          </span>
          <span
            className={`shrink-0 min-w-[16px] text-center text-[9px] font-bold font-mono px-1 py-0.5 rounded-full ${col.bg} ${col.color}`}
          >
            {apps.length}
          </span>
        </div>
        <button
          onClick={() => onAdd(col.key)}
          className={`size-5 shrink-0 flex items-center justify-center rounded-none border ${col.border} ${col.color} transition-all hover:scale-110`}
          title={`Add to ${col.label}`}
        >
          <PlusIcon className="size-3" />
        </button>
      </div>

      {/* Divider */}
      <div
        className={`h-px mx-3 mb-2 ${col.bg} opacity-80`}
        style={{ background: `var(--color-border)` }}
      />

      {/* Cards area */}
      <div className="flex flex-col gap-1.5 px-1.5 pb-2 overflow-y-auto flex-1 min-h-[160px] max-h-[calc(100vh-240px)]">
        {/* Drag-over highlight for empty cols */}
        {dragOver && draggingId && (
          <div
            className={`flex items-center justify-center py-5 border-2 border-dashed ${col.border} rounded-none transition-all`}
          >
            <span className={`text-[10px] font-mono font-bold ${col.color}`}>
              ↓ Drop here
            </span>
          </div>
        )}

        {/* Empty placeholder */}
        {apps.length === 0 && !dragOver && (
          <button
            onClick={() => onAdd(col.key)}
            className="flex flex-col items-center justify-center py-6 gap-1.5 w-full border border-dashed border-border/30 hover:border-border/60 rounded-none transition-colors group/empty"
          >
            <div
              className={`size-5 flex items-center justify-center rounded-none border ${col.border} ${col.bg} group-hover/empty:scale-110 transition-transform`}
            >
              <PlusIcon className={`size-3 ${col.color}`} />
            </div>
            <span className="text-[9px] font-mono text-muted-foreground/40">
              Add
            </span>
          </button>
        )}

        {apps.map((app) => (
          <AppCard
            key={app.id}
            app={app}
            onEdit={onEdit}
            onDelete={onDelete}
            onMove={onMove}
            isDragging={draggingId === app.id}
            onDragStart={() => onDragStart(app.id)}
            onDragEnd={onDragEnd}
          />
        ))}
      </div>
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────────
export default function TrackerPage() {
  const [user, loadingAuth] = useAuthState(auth);
  const [apps, setApps] = useState<Application[]>([]);
  const [fetching, setFetching] = useState(true);
  const [modal, setModal] = useState<{
    open: boolean;
    initial: Partial<Application> & { status: Status };
  } | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);

  // ── Fetch
  useEffect(() => {
    if (!user?.uid) return;
    fetch(`/api/applications?userId=${user.uid}`)
      .then((r) => r.json())
      .then((data) => {
        setApps(Array.isArray(data) ? data : []);
        setFetching(false);
      })
      .catch(() => setFetching(false));
  }, [user?.uid]);

  // ── CRUD helpers
  async function createApp(form: typeof EMPTY_FORM) {
    if (!user?.uid) return;
    const res = await fetch("/api/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, userId: user.uid }),
    });
    const created = await res.json();
    setApps((prev) => [created, ...prev]);
    setModal(null);
  }

  async function updateApp(id: string, updates: Partial<Application>) {
    if (!user?.uid) return;
    // Optimistic update
    setApps((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, ...updates, updatedAt: new Date().toISOString() }
          : a,
      ),
    );
    await fetch(`/api/applications/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...updates, userId: user.uid }),
    });
  }

  async function saveEdit(form: typeof EMPTY_FORM) {
    if (!modal?.initial?.id) return;
    await updateApp(modal.initial.id, form);
    setModal(null);
  }

  async function deleteApp(id: string) {
    if (!user?.uid) return;
    setApps((prev) => prev.filter((a) => a.id !== id));
    await fetch(`/api/applications/${id}?userId=${user.uid}`, {
      method: "DELETE",
    });
  }

  async function moveApp(id: string, status: Status) {
    await updateApp(id, { status });
  }

  // ── Drag & drop
  function handleDrop(status: Status) {
    if (!draggingId) return;
    const app = apps.find((a) => a.id === draggingId);
    if (app && app.status !== status) moveApp(draggingId, status);
    setDraggingId(null);
  }

  // ── Stats
  const total = apps.length;
  const offerCount = apps.filter((a) => a.status === "offer").length;
  const activeCount = apps.filter(
    (a) => !["wishlist", "rejected"].includes(a.status),
  ).length;
  const responseRate =
    total > 0
      ? Math.round(
          (apps.filter((a) => a.status !== "wishlist").length / total) * 100,
        )
      : 0;

  if (loadingAuth || fetching) {
    return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="bg-background text-foreground min-h-screen flex items-center justify-center">
          <div className="size-8 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
        </SidebarInset>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-background text-foreground min-h-screen">
        {/* ── Header */}
        <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-2 border-b border-border bg-background/90 backdrop-blur-xl">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1 text-muted-foreground hover:text-foreground transition-colors" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4 bg-border"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink
                    href="/dashboard"
                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                  >
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block text-muted-foreground/20" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-foreground/80 text-sm">
                    Application Tracker
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto px-4 flex items-center gap-3">
            <button
              onClick={() =>
                setModal({ open: true, initial: { status: "wishlist" } })
              }
              className="flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-primary to-blue-600 text-primary-foreground text-xs font-bold rounded-none font-mono uppercase tracking-widest shadow-[0_0_16px_oklch(0.62_0.26_278/0.3)] hover:shadow-[0_0_24px_oklch(0.62_0.26_278/0.5)] transition-all"
            >
              <PlusIcon className="size-3.5" /> Add Job
            </button>
          </div>
        </header>

        <div className="flex flex-col gap-6 p-6 lg:p-8">
          {/* ── Page title + stats */}
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary mb-2">
                Job Search HQ
              </p>
              <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-foreground">
                Application{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">
                  Tracker
                </span>
              </h1>
              <p className="text-muted-foreground text-sm mt-1.5">
                Drag cards between columns · one-click interview prep & resume
                scoring
              </p>
            </div>

            {/* Stats bar */}
            {total > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  {
                    label: "Total Applied",
                    value: total,
                    icon: <BriefcaseIcon className="size-4" />,
                    accent: "text-foreground",
                    bg: "bg-card/40",
                    border: "border-border/40",
                  },
                  {
                    label: "In Progress",
                    value: activeCount,
                    icon: <ZapIcon className="size-4" />,
                    accent: "text-blue-600",
                    bg: "bg-blue-50/60",
                    border: "border-blue-200/60",
                  },
                  {
                    label: "Response Rate",
                    value: `${responseRate}%`,
                    icon: <TrendingUpIcon className="size-4" />,
                    accent: "text-purple-600",
                    bg: "bg-purple-50/60",
                    border: "border-purple-200/60",
                  },
                  {
                    label: "Offers",
                    value: offerCount,
                    icon: <AwardIcon className="size-4" />,
                    accent:
                      offerCount > 0
                        ? "text-emerald-600"
                        : "text-muted-foreground/50",
                    bg: offerCount > 0 ? "bg-emerald-50" : "bg-card/40",
                    border:
                      offerCount > 0
                        ? "border-emerald-300"
                        : "border-border/40",
                  },
                ].map((s) => (
                  <div
                    key={s.label}
                    className={`rounded-none border ${s.border} ${s.bg} p-4 flex items-start justify-between gap-3 transition-all`}
                  >
                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground">
                        {s.label}
                      </span>
                      <span
                        className={`text-2xl font-black tabular-nums ${s.accent}`}
                      >
                        {s.value}
                      </span>
                    </div>
                    <div className={`${s.accent} opacity-20 mt-0.5`}>
                      {s.icon}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Empty state */}
          {total === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 gap-5 text-center">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/10 blur-3xl scale-150 rounded-full" />
                <div className="relative size-20 rounded-none border border-dashed border-primary/30 bg-card flex items-center justify-center">
                  <BriefcaseIcon className="size-8 text-primary/30" />
                </div>
              </div>
              <div>
                <p className="text-lg font-bold text-foreground">
                  Start tracking your search
                </p>
                <p className="text-muted-foreground text-sm mt-1 max-w-sm">
                  Add jobs to your tracker and manage everything from one place
                  — prep, score, and organize your search.
                </p>
              </div>
              <button
                onClick={() =>
                  setModal({ open: true, initial: { status: "wishlist" } })
                }
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-blue-600 text-primary-foreground text-sm font-bold rounded-none shadow-[0_0_24px_oklch(0.62_0.26_278/0.3)] hover:shadow-[0_0_36px_oklch(0.62_0.26_278/0.5)] transition-all"
              >
                <PlusIcon className="size-4" /> Add Your First Job
              </button>
            </div>
          ) : (
            /* ── Kanban board ── fills viewport, no scroll */
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {COLUMNS.map((col) => (
                <KanbanColumn
                  key={col.key}
                  col={col}
                  apps={apps.filter((a) => a.status === col.key)}
                  onAdd={(status) =>
                    setModal({ open: true, initial: { status } })
                  }
                  onEdit={(a) => setModal({ open: true, initial: a })}
                  onDelete={deleteApp}
                  onMove={moveApp}
                  draggingId={draggingId}
                  onDragStart={setDraggingId}
                  onDragEnd={() => setDraggingId(null)}
                  onDrop={handleDrop}
                />
              ))}
            </div>
          )}
        </div>

        {/* ── Modal */}
        {modal?.open && (
          <AppModal
            initial={modal.initial}
            onSave={modal.initial.id ? saveEdit : createApp}
            onClose={() => setModal(null)}
          />
        )}
      </SidebarInset>
    </SidebarProvider>
  );
}
