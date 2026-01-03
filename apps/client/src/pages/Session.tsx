import { useTranslation } from "react-i18next";

export default function Session() {
  const { t } = useTranslation();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">{t("pages.session.title")}</h1>
      <p className="text-muted-foreground mt-2">
        {t("pages.session.description")}
      </p>
    </div>
  );
}
