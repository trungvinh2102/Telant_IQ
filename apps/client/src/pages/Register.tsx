import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authService } from "@/services";
import { ApiError } from "@/services/api/errors";
import { useAppDispatch } from "@/store/hooks";
import { setCredentials } from "@/store/authSlice";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HeaderActions } from "@/components/header-actions";
import { Zap, Eye, EyeOff } from "lucide-react";

function RegisterPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [name, setName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError(t("register.passwordsDoNotMatch"));
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.register({
        email,
        password,
        username,
        name,
      });

      console.log("Register Success:", response);

      // Update global auth state
      if (response.user) {
        dispatch(setCredentials({ user: response.user }));
        // Navigate to home after registration
        navigate("/");
      } else {
        // If user object not returned, redirect to login
        navigate("/login");
      }
    } catch (err) {
      if (ApiError.isApiError(err)) {
        setError(
          (err.details as { message?: string })?.message ||
            err.message ||
            t("register.error")
        );
      } else {
        setError(t("register.unexpectedError"));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-4 overflow-hidden bg-background text-foreground">
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full mix-blend-screen opacity-30 animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full mix-blend-screen opacity-20" />
      </div>

      {/* Header Actions position */}
      <div className="absolute z-20 top-4 right-4">
        <HeaderActions />
      </div>

      <div className="relative z-10 w-full max-w-md duration-1000 animate-in fade-in slide-in-from-bottom-4">
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2 px-4 py-2 border rounded-full shadow-sm bg-card border-border">
            <Zap className="w-5 h-5 text-primary" fill="currentColor" />
            <span className="font-bold tracking-tight">Talent IQ</span>
          </div>
        </div>

        <Card className="shadow-2xl border-border/50 bg-card/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-3xl font-bold tracking-tight">
              {t("register.createAccount")}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {t("register.signUpToGetStarted")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t("register.fullName")}</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="bg-background/50 border-border focus-visible:ring-primary/30"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">
                  {t("register.username") || "Username"}
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="johndoe123"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="bg-background/50 border-border focus-visible:ring-primary/30"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t("register.email")}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="bg-background/50 border-border focus-visible:ring-primary/30"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{t("register.password")}</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="pr-10 bg-background/50 border-border focus-visible:ring-primary/30"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">
                    {t("register.confirmPassword")}
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      className="pr-10 bg-background/50 border-border focus-visible:ring-primary/30"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent text-muted-foreground hover:text-foreground"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
              {error && (
                <div className="p-3 text-sm font-medium border rounded-md text-destructive border-destructive/20 bg-destructive/10">
                  {error}
                </div>
              )}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full font-semibold transition-all shadow-lg bg-primary hover:bg-primary/90 shadow-primary/20 hover:scale-[1.02] active:scale-[0.98]"
              >
                {isLoading
                  ? t("register.creatingAccount")
                  : t("register.createAccountBtn")}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center text-muted-foreground">
              {t("register.alreadyHaveAccount")}{" "}
              <Link
                to="/login"
                className="font-medium transition-colors text-primary hover:text-primary/80 hover:underline"
              >
                {t("register.signIn")}
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default RegisterPage;
