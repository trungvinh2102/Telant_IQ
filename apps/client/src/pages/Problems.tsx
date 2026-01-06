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
  Plus,
  Pencil,
  Trash2,
  MoreVertical,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { problemService } from "@/services/modules/problem.service";
import { Problem } from "@/types";
import { useAppSelector } from "@/store/hooks";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ProblemsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAppSelector(state => state.auth);

  const [problems, setProblems] = useState<Problem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"card" | "table">("table");
  const [searchQuery, setSearchQuery] = useState("");

  // Management State
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingProblem, setEditingProblem] = useState<Partial<Problem> | null>(
    null
  );
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    try {
      setIsLoading(true);
      const data = await problemService.fetchProblems();
      setProblems(data);
    } catch (error) {
      console.error("Failed to fetch problems:", error);
      toast.error("Failed to load problems");
    } finally {
      setIsLoading(false);
    }
  };

  const hasPermission = (problem?: Problem) => {
    if (!user || !user.role) return false;
    const role = user.role.toLowerCase();
    if (role === "system_admin" || role === "admin") return true;
    if (role === "moderator" && problem && problem.created_by === user.id)
      return true;
    return false;
  };

  const handleCreate = () => {
    setEditingProblem({
      title: "",
      slug: "",
      description: "",
      difficulty: "easy",
      tags: [],
      skeleton_code: { javascript: "// write code here" },
    });
    setIsSheetOpen(true);
  };

  const handleEdit = (problem: Problem) => {
    setEditingProblem(problem);
    setIsSheetOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this problem?")) return;
    try {
      await problemService.deleteProblem(id);
      toast.success("Problem deleted successfully");
      fetchProblems();
    } catch (error) {
      toast.error("Failed to delete problem");
    }
  };

  const handleSave = async () => {
    if (!editingProblem?.title || !editingProblem?.description) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setIsSaving(true);
      if (editingProblem.id) {
        await problemService.updateProblem(editingProblem.id, editingProblem);
        toast.success("Problem updated successfully");
      } else {
        await problemService.createProblem(
          editingProblem as Omit<Problem, "id">
        );
        toast.success("Problem created successfully");
      }
      setIsSheetOpen(false);
      fetchProblems();
    } catch (error) {
      toast.error("Failed to save problem");
    } finally {
      setIsSaving(false);
    }
  };

  const filteredProblems = problems.filter(
    p =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "text-emerald-600 dark:text-emerald-500 bg-emerald-500/10 hover:bg-emerald-500/20";
      case "medium":
        return "text-amber-600 dark:text-amber-500 bg-amber-500/10 hover:bg-amber-500/20";
      case "hard":
        return "text-rose-600 dark:text-rose-500 bg-rose-500/10 hover:bg-rose-500/20";
      default:
        return "text-slate-600 dark:text-slate-500 bg-slate-500/10";
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return t("pages.problemsPage.difficulty.easy");
      case "medium":
        return t("pages.problemsPage.difficulty.medium");
      case "hard":
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
        <div className="flex items-center gap-4">
          {(user?.role?.toLowerCase() === "system_admin" ||
            user?.role?.toLowerCase() === "admin" ||
            user?.role?.toLowerCase() === "moderator") && (
            <Button onClick={handleCreate} className="gap-2">
              <Plus size={16} />
              Add Problem
            </Button>
          )}
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
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 gap-4 p-6 border shadow-sm md:grid-cols-4 rounded-xl bg-card border-border/50">
        <div className="space-y-1">
          <div className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">
            {t("pages.problemsPage.stats.total")}
          </div>
          <div className="text-2xl font-bold text-primary">
            {problems.length}
          </div>
        </div>
        <div className="pl-4 space-y-1 border-l">
          <div className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">
            {t("pages.problemsPage.stats.easy")}
          </div>
          <div className="text-2xl font-bold text-emerald-500">
            {problems.filter(p => p.difficulty.toLowerCase() === "easy").length}
          </div>
        </div>
        <div className="pl-4 space-y-1 border-l">
          <div className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">
            {t("pages.problemsPage.stats.medium")}
          </div>
          <div className="text-2xl font-bold text-amber-500">
            {
              problems.filter(p => p.difficulty.toLowerCase() === "medium")
                .length
            }
          </div>
        </div>
        <div className="pl-4 space-y-1 border-l">
          <div className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">
            {t("pages.problemsPage.stats.hard")}
          </div>
          <div className="text-2xl font-bold text-rose-500">
            {problems.filter(p => p.difficulty.toLowerCase() === "hard").length}
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
          <Input
            placeholder="Search problems..."
            className="pl-10 h-9"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" size="sm" className="gap-2 h-9">
          <Filter size={16} />
          Filters
        </Button>
      </div>

      {/* View Mode Switching */}
      {viewMode === "card" ? (
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          {isLoading ? (
            Array(4)
              .fill(0)
              .map((_, i) => (
                <Card
                  key={i}
                  className="h-32 p-6 border-border/50 bg-card/50 animate-pulse"
                />
              ))
          ) : filteredProblems.length > 0 ? (
            filteredProblems.map(problem => (
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
                        <h3
                          className="text-lg font-semibold transition-colors cursor-pointer text-foreground group-hover:text-primary"
                          onClick={() => navigate(`/problem/${problem.slug}`)}
                        >
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
                        {problem.tags?.map(topic => (
                          <span
                            key={topic}
                            className="transition-colors hover:text-primary"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                      <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground line-clamp-2">
                        {problem.description}
                      </p>
                      {problem.creator_name && (
                        <p className="text-[10px] text-muted-foreground">
                          Created by: {problem.creator_name}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-2 p-0 transition-all rounded-full h-9 w-9 hover:bg-primary/10 hover:text-primary shrink-0"
                      onClick={() => navigate(`/problem/${problem.slug}`)}
                    >
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                      <span className="sr-only">
                        {t("pages.problemsPage.action.solve")}
                      </span>
                    </Button>

                    {hasPermission(problem) && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="p-0 rounded-full h-9 w-9"
                          >
                            <MoreVertical size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleEdit(problem)}
                            className="gap-2"
                          >
                            <Pencil size={14} /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(problem.id)}
                            className="gap-2 text-destructive"
                          >
                            <Trash2 size={14} /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="col-span-2 py-12 text-center text-muted-foreground">
              No problems found.
            </div>
          )}
        </div>
      ) : (
        <Card className="overflow-hidden shadow-sm border-border/50 bg-card/50 backdrop-blur-sm">
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
              {isLoading ? (
                Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <TableRow key={i}>
                      <TableCell
                        colSpan={5}
                        className="h-12 animate-pulse bg-muted/20"
                      />
                    </TableRow>
                  ))
              ) : filteredProblems.length > 0 ? (
                filteredProblems.map(problem => (
                  <TableRow
                    key={problem.id}
                    className="transition-colors group"
                  >
                    <TableCell>
                      <div className="w-2 h-2 rounded-full bg-muted/40" />
                    </TableCell>
                    <TableCell
                      className="font-medium cursor-pointer"
                      onClick={() => navigate(`/problem/${problem.slug}`)}
                    >
                      <div className="flex flex-col">
                        <span>{problem.title}</span>
                        <div className="flex gap-1 mt-1 md:hidden">
                          {problem.tags?.slice(0, 2).map(t => (
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
                        {problem.tags?.slice(0, 3)?.map(topic => (
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
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 gap-1.5 text-xs text-primary font-bold"
                          onClick={() => navigate(`/problem/${problem.slug}`)}
                        >
                          {t("pages.problemsPage.action.solve")}
                          <ChevronRight size={14} />
                        </Button>

                        {hasPermission(problem) && (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="w-8 h-8 p-0"
                              >
                                <MoreVertical size={16} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => handleEdit(problem)}
                                className="gap-2"
                              >
                                <Pencil size={14} /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDelete(problem.id)}
                                className="gap-2 text-destructive"
                              >
                                <Trash2 size={14} /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="h-24 text-center text-muted-foreground"
                  >
                    No problems found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
      )}

      {/* Sheet for Create/Edit */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="overflow-y-auto sm:max-w-xl">
          <SheetHeader>
            <SheetTitle>
              {editingProblem?.id ? "Edit Problem" : "Create New Problem"}
            </SheetTitle>
            <SheetDescription>
              {editingProblem?.id
                ? "Update the details of the problem."
                : "Add a new problem to the system."}
            </SheetDescription>
          </SheetHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={editingProblem?.title || ""}
                onChange={e =>
                  setEditingProblem(prev => ({
                    ...prev!,
                    title: e.target.value,
                  }))
                }
                placeholder="Problem Title"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                value={editingProblem?.slug || ""}
                onChange={e =>
                  setEditingProblem(prev => ({
                    ...prev!,
                    slug: e.target.value,
                  }))
                }
                placeholder="problem-slug"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={editingProblem?.description || ""}
                onChange={e =>
                  setEditingProblem(prev => ({
                    ...prev!,
                    description: e.target.value,
                  }))
                }
                placeholder="Detailed description of the problem..."
                rows={5}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="difficulty">Difficulty</Label>
                <Select
                  value={editingProblem?.difficulty}
                  onValueChange={v =>
                    setEditingProblem(prev => ({
                      ...prev!,
                      difficulty: v as "easy" | "medium" | "hard",
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  value={editingProblem?.tags?.join(", ") || ""}
                  onChange={e =>
                    setEditingProblem(prev => ({
                      ...prev!,
                      tags: e.target.value
                        .split(",")
                        .map(t => t.trim())
                        .filter(Boolean),
                    }))
                  }
                  placeholder="Array, String, logic"
                />
              </div>
            </div>
          </div>

          <SheetFooter className="mt-6">
            <Button variant="outline" onClick={() => setIsSheetOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Problem"}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* Pagination */}
      <div className="flex items-center justify-between px-2 py-4 border-t border-border/40">
        <div className="text-sm text-muted-foreground">
          Showing <span className="font-medium">{filteredProblems.length}</span>{" "}
          of{" "}
          <span className="font-medium text-foreground">{problems.length}</span>{" "}
          results
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
  );
}
