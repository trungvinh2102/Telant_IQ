import {
  Code2,
  Plus,
  Search,
  Calendar,
  Clock,
  Users,
  ChevronRight,
  LayoutGrid,
  List,
} from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { APP_CONFIG } from "@/configs";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SessionDetail from "./SessionDetail";

interface SessionData {
  id: string;
  name: string;
  problem: string;
  difficulty: "easy" | "medium" | "hard";
  status: "ongoing" | "completed" | "scheduled";
  participants: number;
  date: string;
  startTime: string;
}

const MOCK_SESSIONS: SessionData[] = [
  {
    id: "1",
    name: "Technical Interview - John Doe",
    problem: "Two Sum",
    difficulty: "easy",
    status: "ongoing",
    participants: 2,
    date: "2024-01-04",
    startTime: "10:00 AM",
  },
  {
    id: "2",
    name: "Pair Programming: Backend Architecture",
    problem: "Add Two Numbers",
    difficulty: "medium",
    status: "scheduled",
    participants: 4,
    date: "2024-01-05",
    startTime: "02:30 PM",
  },
  {
    id: "3",
    name: "Mock Interview: Frontend Specialist",
    problem: "Longest Substring",
    difficulty: "medium",
    status: "completed",
    participants: 2,
    date: "2024-01-03",
    startTime: "09:15 AM",
  },
  {
    id: "4",
    name: "System Design Practice",
    problem: "Basic Calculator",
    difficulty: "hard",
    status: "completed",
    participants: 3,
    date: "2024-01-02",
    startTime: "04:00 PM",
  },
];

export default function Session() {
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(
    null
  );
  const [viewMode, setViewMode] = useState<"card" | "table">("card");
  const { t } = useTranslation();

  if (selectedSessionId) {
    return (
      <SessionDetail
        sessionId={selectedSessionId}
        onBack={() => setSelectedSessionId(null)}
      />
    );
  }

  return (
    <div className="flex flex-col w-full h-full p-6 space-y-6 overflow-y-auto duration-500 bg-background animate-in fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {t("pages.session.title")}
          </h1>
          <p className="text-muted-foreground">
            {t("pages.session.description")}
          </p>
        </div>
        <Button className="gap-2 transition-all shadow-lg hover:shadow-primary/20">
          <Plus size={18} />
          Create New Session
        </Button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center flex-1 gap-4 min-w-[300px]">
          <div className="relative flex-1 max-w-sm">
            <Search
              className="absolute -translate-y-1/2 left-3 top-1/2 text-muted-foreground"
              size={18}
            />
            <Input placeholder="Search sessions..." className="pl-10" />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              All
            </Button>
            <Button variant="ghost" size="sm">
              Ongoing
            </Button>
            <Button variant="ghost" size="sm">
              Scheduled
            </Button>
            <Button variant="ghost" size="sm">
              Completed
            </Button>
          </div>
        </div>

        <div className="flex items-center p-1 border rounded-md bg-muted/50">
          <Button
            variant={viewMode === "card" ? "secondary" : "ghost"}
            size="sm"
            className={cn("h-8 w-8 p-0", viewMode === "card" && "shadow-sm")}
            onClick={() => setViewMode("card")}
          >
            <LayoutGrid size={16} />
          </Button>
          <Button
            variant={viewMode === "table" ? "secondary" : "ghost"}
            size="sm"
            className={cn("h-8 w-8 p-0", viewMode === "table" && "shadow-sm")}
            onClick={() => setViewMode("table")}
          >
            <List size={16} />
          </Button>
        </div>
      </div>

      {viewMode === "card" ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {MOCK_SESSIONS.map(session => (
            <Card
              key={session.id}
              className="relative flex flex-col overflow-hidden transition-all cursor-pointer group border-border/50 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5"
              onClick={() => setSelectedSessionId(session.id)}
            >
              <div
                className={`absolute top-0 left-0 w-1 h-full transition-colors ${
                  session.status === "ongoing"
                    ? "bg-emerald-500"
                    : session.status === "scheduled"
                      ? "bg-blue-500"
                      : "bg-muted"
                }`}
              />
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between mb-2">
                  <Badge
                    variant="outline"
                    className={cn(
                      "capitalize",
                      session.status === "ongoing" &&
                        "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
                      session.status === "scheduled" &&
                        "bg-blue-500/10 text-blue-500 border-blue-500/20",
                      session.status === "completed" &&
                        "bg-muted text-muted-foreground"
                    )}
                  >
                    {session.status}
                  </Badge>
                  <div className="flex -space-x-2">
                    {Array.from({
                      length: Math.min(session.participants, 3),
                    }).map((_, i) => (
                      <Avatar
                        key={i}
                        className="w-6 h-6 border-2 border-background"
                      >
                        <AvatarFallback className="text-[10px] bg-muted/50">
                          P{i + 1}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {session.participants > 3 && (
                      <div className="h-6 w-6 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[8px] font-bold">
                        +{session.participants - 3}
                      </div>
                    )}
                  </div>
                </div>
                <CardTitle className="text-lg leading-tight transition-colors line-clamp-2 group-hover:text-primary">
                  {session.name}
                </CardTitle>
                <CardDescription className="flex items-center gap-1.5 mt-2">
                  <Code2 size={14} className="text-primary/70" />
                  {session.problem}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 pb-4">
                <div className="space-y-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    {session.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={14} />
                    {session.startTime}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={14} />
                    {session.participants} participants
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0 transition-colors border-t border-border/10 bg-muted/5 group-hover:bg-primary/5">
                <div className="flex items-center justify-between w-full mt-4 text-xs">
                  <Badge variant="outline" className="text-[10px] opacity-70">
                    {session.difficulty}
                  </Badge>
                  <span className="flex items-center gap-1 font-medium transition-all -translate-x-2 opacity-0 text-primary group-hover:opacity-100 group-hover:translate-x-0">
                    Join Session <ChevronRight size={14} />
                  </span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="overflow-hidden border-border/50">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-[300px]">Session Name</TableHead>
                <TableHead>Problem</TableHead>
                <TableHead>Difficulty</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Participants</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_SESSIONS.map(session => (
                <TableRow
                  key={session.id}
                  className="transition-colors cursor-pointer hover:bg-muted/30"
                  onClick={() => setSelectedSessionId(session.id)}
                >
                  <TableCell className="font-medium">{session.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Code2 size={14} className="text-primary/70" />
                      {session.problem}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-[10px] capitalize">
                      {session.difficulty}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn(
                        "capitalize text-[10px]",
                        session.status === "ongoing" &&
                          "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
                        session.status === "scheduled" &&
                          "bg-blue-500/10 text-blue-500 border-blue-500/20",
                        session.status === "completed" &&
                          "bg-muted text-muted-foreground"
                      )}
                    >
                      {session.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    <div className="flex flex-col">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} /> {session.date}
                      </span>
                      <span className="flex items-center gap-1 mt-1">
                        <Clock size={12} /> {session.startTime}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex -space-x-1">
                      {Array.from({
                        length: Math.min(session.participants, 3),
                      }).map((_, i) => (
                        <Avatar
                          key={i}
                          className="w-5 h-5 border border-background"
                        >
                          <AvatarFallback className="text-[8px] bg-muted/50">
                            P{i + 1}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="h-8 gap-2">
                      Join <ChevronRight size={14} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}

      {/* Pagination - Using Config from app.config.ts */}
      <div className="flex items-center justify-between px-2 py-4 border-t border-border/40">
        <div className="text-sm text-muted-foreground">
          Showing <span className="font-medium">1</span> to{" "}
          <span className="font-medium">{MOCK_SESSIONS.length}</span> of{" "}
          <span className="font-medium">{MOCK_SESSIONS.length}</span> results
        </div>
        <div className="flex items-center gap-6 lg:gap-8">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium">Rows per page</p>
            <select
              className="h-8 w-[70px] rounded-md border border-input bg-transparent px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-ring"
              defaultValue={APP_CONFIG.PAGINATION.DEFAULT_PAGE_SIZE}
            >
              {APP_CONFIG.PAGINATION.PAGE_SIZE_OPTIONS.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page 1 of 1
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="w-8 h-8" disabled>
              <ChevronRight className="w-4 h-4 rotate-180" />
            </Button>
            <Button variant="outline" size="icon" className="w-8 h-8" disabled>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
