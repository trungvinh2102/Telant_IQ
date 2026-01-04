import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  ChevronRight,
  Code2,
  LayoutGrid,
  List,
  Search,
  Filter,
} from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { APP_CONFIG } from "@/configs";

interface Problem {
  id: number;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  topics: string[];
  description: string;
}

const problems: Problem[] = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    topics: ["Array", "Hash Table"],
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers in the array such that they add up to target.",
  },
  {
    id: 2,
    title: "Reverse String",
    difficulty: "Easy",
    topics: ["String", "Two Pointers"],
    description:
      "Write a function that reverses a string. The input string is given as an array of characters s.",
  },
  {
    id: 3,
    title: "Valid Palindrome",
    difficulty: "Easy",
    topics: ["String", "Two Pointers"],
    description:
      "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.",
  },
  {
    id: 4,
    title: "Maximum Subarray",
    difficulty: "Medium",
    topics: ["Array", "Dynamic Programming"],
    description:
      "Given an integer array nums, find the subarray with the largest sum, and return its sum.",
  },
  {
    id: 5,
    title: "Container With Most Water",
    difficulty: "Medium",
    topics: ["Array", "Two Pointers"],
    description:
      "You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).",
  },
];

export default function ProblemsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"card" | "table">("table");

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-emerald-600 dark:text-emerald-500 bg-emerald-500/10 hover:bg-emerald-500/20";
      case "Medium":
        return "text-amber-600 dark:text-amber-500 bg-amber-500/10 hover:bg-amber-500/20";
      case "Hard":
        return "text-rose-600 dark:text-rose-500 bg-rose-500/10 hover:bg-rose-500/20";
      default:
        return "text-slate-600 dark:text-slate-500 bg-slate-500/10";
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return t("pages.problemsPage.difficulty.easy");
      case "Medium":
        return t("pages.problemsPage.difficulty.medium");
      case "Hard":
        return t("pages.problemsPage.difficulty.hard");
      default:
        return difficulty;
    }
  };

  return (
    <div className="flex flex-col w-full h-full p-6 space-y-6 overflow-y-auto duration-500 bg-background animate-in fade-in">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {t("pages.problemsPage.header.title")}
          </h1>
          <p className="text-muted-foreground">
            {t("pages.problemsPage.header.description")}
          </p>
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

      {/* Stats Section */}
      <div className="grid grid-cols-2 gap-4 p-6 border md:grid-cols-4 rounded-xl bg-card border-border/50 shadow-sm">
        <div className="space-y-1">
          <div className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">
            {t("pages.problemsPage.stats.total")}
          </div>
          <div className="text-2xl font-bold text-primary">
            {problems.length}
          </div>
        </div>
        <div className="space-y-1 border-l pl-4">
          <div className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">
            {t("pages.problemsPage.stats.easy")}
          </div>
          <div className="text-2xl font-bold text-emerald-500">
            {problems.filter(p => p.difficulty === "Easy").length}
          </div>
        </div>
        <div className="space-y-1 border-l pl-4">
          <div className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">
            {t("pages.problemsPage.stats.medium")}
          </div>
          <div className="text-2xl font-bold text-amber-500">
            {problems.filter(p => p.difficulty === "Medium").length}
          </div>
        </div>
        <div className="space-y-1 border-l pl-4">
          <div className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">
            {t("pages.problemsPage.stats.hard")}
          </div>
          <div className="text-2xl font-bold text-rose-500">
            {problems.filter(p => p.difficulty === "Hard").length}
          </div>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search
            className="absolute -translate-y-1/2 left-3 top-1/2 text-muted-foreground"
            size={18}
          />
          <Input placeholder="Search problems..." className="pl-10 h-9" />
        </div>
        <Button variant="outline" size="sm" className="h-9 gap-2">
          <Filter size={16} />
          Filters
        </Button>
        <div className="flex gap-2 ml-auto">
          {["All", "Algorithms", "Databases", "Shell", "Concurrency"].map(
            cat => (
              <Button
                key={cat}
                variant="ghost"
                size="sm"
                className="h-8 text-xs"
              >
                {cat}
              </Button>
            )
          )}
        </div>
      </div>

      {/* View Mode Switching */}
      {viewMode === "card" ? (
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          {problems.map(problem => (
            <Card
              key={problem.id}
              className="p-6 transition-all hover:bg-muted/30 group border-border/50 bg-card/50 backdrop-blur-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-4">
                  <div className="flex items-center justify-center w-10 h-10 mt-1 transition-colors rounded-lg shrink-0 bg-primary/10 text-primary group-hover:bg-primary/20">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        {problem.title}
                      </h3>
                      <Badge
                        variant="secondary"
                        className={cn(
                          getDifficultyColor(problem.difficulty),
                          "border-0 px-2 py-0 text-[10px] font-bold uppercase tracking-wider"
                        )}
                      >
                        {getDifficultyLabel(problem.difficulty)}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-2 text-[10px] uppercase font-bold text-muted-foreground/70 tracking-widest">
                      {problem.topics.map(topic => (
                        <span
                          key={topic}
                          className="hover:text-primary transition-colors"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                    <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground line-clamp-2">
                      {problem.description}
                    </p>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 transition-all p-0 h-9 w-9 rounded-full hover:bg-primary/10 hover:text-primary shrink-0"
                  onClick={() => navigate(`/problem/${problem.id}`)}
                >
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                  <span className="sr-only">
                    {t("pages.problemsPage.action.solve")}
                  </span>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm shadow-sm">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-[80px]">Status</TableHead>
                <TableHead className="min-w-[200px]">Title</TableHead>
                <TableHead>Difficulty</TableHead>
                <TableHead className="hidden md:table-cell">Category</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {problems.map(problem => (
                <TableRow
                  key={problem.id}
                  className="transition-colors cursor-pointer hover:bg-muted/50"
                  onClick={() => navigate(`/problem/${problem.id}`)}
                >
                  <TableCell>
                    <div className="w-2 h-2 rounded-full bg-muted/40" />
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <span>{problem.title}</span>
                      <div className="flex md:hidden gap-1 mt-1">
                        {problem.topics.slice(0, 2).map(t => (
                          <span
                            key={t}
                            className="text-[9px] text-muted-foreground"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn(
                        "border-0 px-2 py-0 text-[10px] font-bold uppercase tracking-wider",
                        getDifficultyColor(problem.difficulty)
                      )}
                    >
                      {getDifficultyLabel(problem.difficulty)}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex gap-2">
                      {problem.topics.slice(0, 3).map(topic => (
                        <span
                          key={topic}
                          className="text-[10px] text-muted-foreground px-1.5 py-0.5 rounded-md bg-muted/30"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 gap-1.5 text-xs text-primary font-bold"
                    >
                      {t("pages.problemsPage.action.solve")}
                      <ChevronRight size={14} />
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
          <span className="font-medium">{problems.length}</span> of{" "}
          <span className="font-medium">{problems.length}</span> results
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
            <Button variant="outline" size="icon" className="h-8 w-8" disabled>
              <ChevronRight className="w-4 h-4 rotate-180" />
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8" disabled>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
