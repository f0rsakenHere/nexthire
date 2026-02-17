export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="bg-black text-white">{children}</section>;
}
