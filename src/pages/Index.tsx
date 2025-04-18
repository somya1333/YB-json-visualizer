
import DataDisplay from "@/components/DataDisplay";

const sampleData = {
  "data": {
    "data": {
      "uuid": "aa1bb5d2-c8d7-4ddb-9ce4-ec391444dcd4",
      "master": {
        "uuid": "aa1bb5d2-c8d7-4ddb-9ce4-ec391444dcd4",
        "eligible_products": [
          "edl"
        ]
      }
    }
  }
};

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto py-4">
          <h1 className="text-2xl font-bold text-gray-800">JSON Data Viewer</h1>
        </div>
      </header>
      <main>
        <DataDisplay data={sampleData} />
      </main>
    </div>
  );
};

export default Index;
