
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { GemIcon } from "lucide-react";

interface DataDisplayProps {
  data: {
    data: {
      uuid: string;
      master: {
        eligible_products: string[];
      };
    };
  };
}

const DataDisplay = ({ data }: DataDisplayProps) => {
  const { uuid } = data.data;
  const { eligible_products } = data.data.master;

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-800">
          Hello User
        </h1>
        <p className="text-sm text-gray-400">{uuid}</p>
      </div>

      <div className="relative px-12">
        <h2 className="text-xl font-semibold mb-4">Eligible Products</h2>
        <Carousel>
          <CarouselContent>
            {eligible_products.map((product, index) => (
              <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4">
                <div className="bg-white border rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                  <GemIcon className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                  <p className="text-gray-800 font-medium capitalize">{product}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default DataDisplay;
