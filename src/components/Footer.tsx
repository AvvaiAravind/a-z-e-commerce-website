import { ReactElement } from "react";

type FooterProps = {
  title?: string;
};

const Footer = ({ title = "A-Z e-com." }: FooterProps): ReactElement => {
  return (
    <footer className="sticky top-0 bg-black text-white">
      <section className="flex justify-center py-2">
        <h1 className="">{title}</h1>
        <div></div>
      </section>
    </footer>
  );
};

export default Footer;
