"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const statuses = ["rented", "in maintenance", "in service", "available"];
const [vehicleData, setVehicleData] = useState({
  carModel: "",
  licensePlate: "",
  color: "",
  category: "",
  year: "",
  status: "available",
  location: "",
});

const handleChange = (field, value) => {
  setVehicleData((prev) => ({ ...prev, [field]: value }));
};
const handleSave = () => {
  console.log("Saved vehicle data:", vehicleData);
  // Add save logic
};

const EditVehicle = () => {
  return (
    <>
      <Card>
        <CardContent className="space-y-4 p-6">
          {Object.entries(vehicleData).map(([key, value]) =>
            key === "status" ? (
              <div key={key}>
                <Label htmlFor={key}>Status</Label>
                <Select
                  value={value}
                  onValueChange={(val) => handleChange(key, val)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ) : (
              <div key={key}>
                <Label htmlFor={key}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Label>
                <Input
                  id={key}
                  value={value}
                  onChange={(e) => handleChange(key, e.target.value)}
                  placeholder={`Enter ${key}`}
                />
              </div>
            )
          )}
          <Button onClick={handleSave}>Save Changes</Button>
        </CardContent>
      </Card>
    </>
  );
};

export default EditVehicle;
