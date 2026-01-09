import { ExecutionStatus, SubmissionResult } from "@/types";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Loader2,
  LucideIcon,
  Terminal,
  XCircle,
} from "lucide-react";

interface StatusBannerProps {
  result: SubmissionResult;
  t: (key: string) => string;
  status: ExecutionStatus;
}

// Status configuration for UI
const STATUS_CONFIG: Record<
  ExecutionStatus,
  {
    bg: string;
    border: string;
    text: string;
    icon: LucideIcon;
  }
> = {
  idle: {
    bg: "bg-muted/30",
    border: "border-border",
    text: "text-muted-foreground",
    icon: Terminal,
  },
  running: {
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    text: "text-blue-500",
    icon: Loader2,
  },
  submitting: {
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    text: "text-blue-500",
    icon: Loader2,
  },
  accepted: {
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    text: "text-emerald-500",
    icon: CheckCircle2,
  },
  wrong_answer: {
    bg: "bg-red-500/10",
    border: "border-red-500/20",
    text: "text-red-500",
    icon: XCircle,
  },
  runtime_error: {
    bg: "bg-red-500/10",
    border: "border-red-500/20",
    text: "text-red-500",
    icon: AlertCircle,
  },
  time_limit_exceeded: {
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    text: "text-orange-500",
    icon: Clock,
  },
  compile_error: {
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    text: "text-amber-500",
    icon: AlertTriangle,
  },
  internal_error: {
    bg: "bg-red-500/10",
    border: "border-red-500/20",
    text: "text-red-500",
    icon: XCircle,
  },
};

export function StatusBanner({ result, t, status }: StatusBannerProps) {
  const config =
    STATUS_CONFIG[result.status] || STATUS_CONFIG["internal_error"];
  const StatusIcon = config.icon;

  const getStatusText = (s: ExecutionStatus): string => {
    const statusMap: Record<ExecutionStatus, string> = {
      idle: "",
      running: t("pages.problemDetail.executing"),
      submitting: t("pages.problemDetail.evaluating"),
      accepted: t("pages.problemDetail.accepted"),
      wrong_answer: t("pages.problemDetail.wrongAnswer"),
      runtime_error: t("pages.problemDetail.runtimeError"),
      time_limit_exceeded: t("pages.problemDetail.timeLimitExceeded"),
      compile_error: t("pages.problemDetail.compileError"),
      internal_error: t("pages.problemDetail.internalError"),
    };
    return statusMap[s] || s;
  };

  return (
    <div
      className={`flex flex-col gap-2 mb-4 p-3 rounded border ${config.bg} ${config.border} ${config.text}`}
    >
      <div className="flex items-center gap-2 font-bold">
        <StatusIcon
          size={16}
          className={status === "running" ? "animate-spin" : ""}
        />
        {result.message || getStatusText(result.status)}
      </div>
      {result.error && (
        <pre className="text-xs whitespace-pre-wrap opacity-80">
          {result.error}
        </pre>
      )}
    </div>
  );
}
