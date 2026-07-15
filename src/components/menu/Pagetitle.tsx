import type { ReactNode } from "react";
import { Helmet } from "react-helmet-async";
type PageTitleProps = {
    title: string;
    helmet?: ReactNode;
    children?: ReactNode;
};
const Author =import.meta.env.VITE_AUTHOR
function PageTitle({ title, children, helmet }: PageTitleProps) {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="author" content={Author} />
        {helmet}
      </Helmet>
      {children}
    </>
  );
}
export default PageTitle;