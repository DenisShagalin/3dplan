import { useTranslations } from "next-intl";
import "./legal.css";

// Shared shell for the /security pages. The body is authored HTML from the
// message catalogs (trusted content), rendered with t.raw.
export function LegalPage({
  titleKey,
  bodyKey,
}: {
  titleKey: string;
  bodyKey: string;
}) {
  const t = useTranslations();

  return (
    <div className="legal_page ui_page">
      <h1 className="legal_h1">{t(titleKey)}</h1>
      <article
        className="legal_card ui_card"
        dangerouslySetInnerHTML={{ __html: t.raw(bodyKey) }}
      />
    </div>
  );
}
