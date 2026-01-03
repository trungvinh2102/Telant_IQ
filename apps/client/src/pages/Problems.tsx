import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronRight, Code2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

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

export default function Problem() {
  const { t } = useTranslation();
  const navigate = useNavigate();

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
    <div className="min-h-screen p-8 font-sans transition-colors duration-300 bg-background">
      <div className="mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {t("pages.problemsPage.header.title")}
          </h1>
          <p className="text-muted-foreground">
            {t("pages.problemsPage.header.description")}
          </p>
        </div>

        {/* Footer Stats */}
        <div className="grid grid-cols-2 gap-4 p-8 border md:grid-cols-4 rounded-xl bg-card border-border/50">
          <div>
            <div className="mb-2 text-xs font-semibold tracking-wider uppercase text-muted-foreground">
              {t("pages.problemsPage.stats.total")}
            </div>
            <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-500">
              {problems.length}
            </div>
          </div>
          <div>
            <div className="mb-2 text-xs font-semibold tracking-wider uppercase text-muted-foreground">
              {t("pages.problemsPage.stats.easy")}
            </div>
            <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-500">
              {problems.filter(p => p.difficulty === "Easy").length}
            </div>
          </div>
          <div>
            <div className="mb-2 text-xs font-semibold tracking-wider uppercase text-muted-foreground">
              {t("pages.problemsPage.stats.medium")}
            </div>
            <div className="text-3xl font-bold text-amber-600 dark:text-amber-500">
              {problems.filter(p => p.difficulty === "Medium").length}
            </div>
          </div>
          <div>
            <div className="mb-2 text-xs font-semibold tracking-wider uppercase text-muted-foreground">
              {t("pages.problemsPage.stats.hard")}
            </div>
            <div className="text-3xl font-bold text-rose-600 dark:text-rose-500">
              {problems.filter(p => p.difficulty === "Hard").length}
            </div>
          </div>
        </div>

        {/* Problem List */}
        <div className="space-y-4">
          {problems.map(problem => (
            <Card
              key={problem.id}
              className="p-6 transition-all hover:bg-muted/50 group border-border/50 bg-card"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-4">
                  <div className="flex items-center justify-center w-10 h-10 mt-1 rounded-lg shrink-0 bg-emerald-500/10 text-emerald-600 dark:text-emerald-500">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-foreground">
                        {problem.title}
                      </h3>
                      <Badge
                        variant="secondary"
                        className={`${getDifficultyColor(problem.difficulty)} border-0 px-2.5 py-0.5`}
                      >
                        {getDifficultyLabel(problem.difficulty)}
                      </Badge>
                    </div>
                    <div className="text-sm font-medium text-foreground/60">
                      {problem.topics.join(" - ")}
                    </div>
                    <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground line-clamp-2">
                      {problem.description}
                    </p>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  className="gap-2 transition-all shrink-0 text-emerald-600 dark:text-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-emerald-500/10 group-hover:translate-x-1"
                  onClick={() => navigate(`/problem/${problem.id}`)}
                >
                  {t("pages.problemsPage.action.solve")}
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
