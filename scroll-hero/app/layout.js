export const metadata = {
  title: "Scroll Driven Hero Animation",
  description: "Premium GSAP scroll animation",
};

import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}