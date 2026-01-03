import { useTranslation } from "react-i18next";

export default function Problem() {
  const { t } = useTranslation();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">{t("pages.problem.title")}</h1>
      <p className="text-muted-foreground mt-2">
        {t("pages.problem.description")}
      </p>
    </div>
  );
}
