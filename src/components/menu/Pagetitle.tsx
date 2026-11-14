
import type { ReactNode } from "react";
import { Helmet } from "react-helmet-async";

type JsonLdData =
  | Record<string, unknown>
  | Record<string, unknown>[];

type PageTitleProps = {
  title?: string;
  helmet?: ReactNode;
  jsons?: JsonLdData;
  children?: ReactNode;
};

export default function PageTitle({
  title,
  helmet,
  jsons,
  children,
}: PageTitleProps) {

  const jsonLdString = jsons
    ? JSON.stringify(jsons).replace(/</g, "\\u003c")
    : null;

  return (
    <>
      <Helmet>
        {title && <title>{title}</title>}
        {helmet}
        {jsonLdString && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: jsonLdString }}
          />
        )}
      </Helmet>
      {children}
    </>
  );
}
