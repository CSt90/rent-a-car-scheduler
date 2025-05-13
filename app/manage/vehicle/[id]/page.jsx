"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const statuses = ["rented", "in maintenance", "in service", "available"];

export default function EditVehiclePage() {
  const params = useParams();
  const carId = params.id;
  const [vehicleData, setVehicleData] = useState({
    carModel: "",
    licensePlate: "",
    color: "",
    category: "",
    year: "",
    status: "available",
    location: "",
  });
  console.log("+++++++++++++++++++++++++++++++++" + carId);

  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    // Simulate API call to fetch vehicle data and reservations
    // Replace with actual fetch from `/api/vehicles/${carId}`
    setVehicleData({
      carModel: "Toyota Camry",
      licensePlate: "XYZ123",
      color: "Blue",
      category: "Sedan",
      year: "2021",
      status: "available",
      location: "San Francisco",
    });

    setReservations([
      { id: 1, from: "2025-05-01", to: "2025-05-05" },
      { id: 2, from: "2025-05-10", to: "2025-05-15" },
    ]);
  }, [carId]);

  const handleChange = (field, value) => {
    setVehicleData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      await fetch(`/api/vehicles/${carId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vehicleData),
      });
      alert("Vehicle data saved.");
    } catch (error) {
      console.error(error);
      alert("Failed to save vehicle data.");
    }
  };

  return (
    <Tabs defaultValue="details" className="max-w-3xl mx-auto p-4">
      <TabsList className="grid w-full grid-cols-2 mb-4">
        <TabsTrigger value="details">Edit Vehicle</TabsTrigger>
        <TabsTrigger value="reservations">View Reservations</TabsTrigger>
      </TabsList>

      <TabsContent value="details">
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
      </TabsContent>

      <TabsContent value="reservations">
        <Card>
          <CardContent className="p-6 space-y-4">
            <h3 className="text-lg font-semibold">Vehicle Reservations</h3>
            {reservations.length ? (
              reservations.map((res) => (
                <div key={res.id} className="border p-3 rounded-xl shadow-sm">
                  <p>
                    <strong>From:</strong> {res.from}
                  </p>
                  <p>
                    <strong>To:</strong> {res.to}
                  </p>
                </div>
              ))
            ) : (
              <p>No reservations found.</p>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
