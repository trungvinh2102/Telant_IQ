import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function ProblemDetail() {
  const { id } = useParams();
  const { t } = useTranslation();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">
        {t("pages.problemDetail.title")} #{id}
      </h1>
      <p className="text-muted-foreground mt-2">
        {t("pages.problemDetail.description")}
      </p>
    </div>
  );
}
