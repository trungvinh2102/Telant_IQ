import React from "react";
import { useTranslation } from "react-i18next";

function LoginPage() {
  const { t } = useTranslation();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login:", { email, password });
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{ backgroundColor: "rgb(255, 255, 255)" }}
    >
      <div
        className="w-full max-w-md p-8 border shadow-lg rounded-xl"
        style={{ backgroundColor: "rgb(255, 255, 255)" }}
      >
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">{t("login.welcomeBack")}</h1>
          <p className="mt-2 text-muted-foreground">
            {t("login.signInToContinue")}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              {t("login.email")}
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-3 py-2 text-sm border rounded-md border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              {t("login.password")}
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-3 py-2 text-sm border rounded-md border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="•••••••"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {t("login.signIn")}
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-muted-foreground">
          {t("login.dontHaveAccount")}{" "}
          <a href="/register" className="text-primary hover:underline">
            {t("login.signUp")}
          </a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
