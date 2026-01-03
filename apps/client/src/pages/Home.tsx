import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">{t("pages.home.welcome")}</h1>
    </div>
  );
}
