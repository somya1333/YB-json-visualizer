
import { useQuery } from "@tanstack/react-query";
import DataDisplay from "@/components/DataDisplay";
import { fetchData } from "@/services/api";
import { Loader2 } from "lucide-react";

const Index = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['userData'],
    queryFn: fetchData
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F1F0FB] to-[#D3E4FD] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F1F0FB] to-[#D3E4FD] flex items-center justify-center">
        <p className="text-red-500">Error loading data</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F1F0FB] to-[#D3E4FD]">
      <header className="bg-white/70 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto py-4">
          <h1 className="text-2xl font-bold text-gray-800">JSON Data Viewer</h1>
        </div>
      </header>
      <main>
        <DataDisplay data={data!} />
      </main>
    </div>
  );
};

export default Index;
