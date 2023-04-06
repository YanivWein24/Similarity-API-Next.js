import "./globals.css";

export const metadata = {
  title: "Similarity API",
  description: "Similarity API",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
