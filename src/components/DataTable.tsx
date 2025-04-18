
import React, { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataItem {
  [key: string]: string;
}

const sampleData: DataItem[] = [
  {
    "name": "somya",
    "age": "23",
    "gender": "male",
    "fathers name": "mukesh",
    "address": "bangalore",
    "numbers": "44"
  },
  {
    "name": "muzzu",
    "age": "25",
    "gender": "male",
    "fathers name": "mesh",
    "address": "bangalore",
    "numbers": "42"
  },
  {
    "name": "Ravi",
    "age": "30",
    "gender": "male",
    "fathers name": "somya",
    "address": "bangalore",
    "numbers": "22"
  },
  {
    "name": "abhi",
    "age": "32",
    "gender": "female",
    "fathers name": "muzzu",
    "address": "delhi",
    "numbers": "80"
  }
];

const DataTable = () => {
  const [filterValue, setFilterValue] = useState("");
  const headers = Object.keys(sampleData[0]);

  const filteredData = useMemo(() => {
    if (!filterValue.trim()) return sampleData;
    
    return sampleData.filter((item) =>
      Object.values(item).some((value) =>
        value.toLowerCase().includes(filterValue.toLowerCase())
      )
    );
  }, [filterValue]);

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <Input
          type="text"
          placeholder="Filter data..."
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          className="max-w-sm"
        />
      </div>
      
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100">
              {headers.map((header) => (
                <TableHead key={header} className="font-bold">
                  {header.charAt(0).toUpperCase() + header.slice(1)}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((item, index) => (
              <TableRow key={index} className="hover:bg-gray-50">
                {headers.map((header) => (
                  <TableCell key={header}>{item[header]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DataTable;
