import { Navbar } from "./_components/navbar";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <main className="container mx-auto mb-32 px-4 md:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
};

export default PublicLayout;
