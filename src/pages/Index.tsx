
import DataTable from "@/components/DataTable";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto py-4">
          <h1 className="text-2xl font-bold text-gray-800">JSON Data Viewer</h1>
        </div>
      </header>
      <main>
        <DataTable />
      </main>
    </div>
  );
};

export default Index;
