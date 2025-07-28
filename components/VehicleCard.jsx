"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
import {
  Calendar,
  CalendarMonthView,
  CalendarNextTrigger,
  CalendarPrevTrigger,
  CalendarTodayTrigger,
  CalendarCurrentDate,
} from "@/components/ui/full-calendar";

const vehicleDataLabelsEL = {
  carId: "",
  carModel: "Μοντελο",
  licensePlate: "Αρ. Κυκλοφοριας",
  color: "Χρωμα",
  category: "Κατηγορια",
  year: "Ετος",
  status: "Κατασταση",
  location: "Τοποθεσια",
  availability: "Διαθεσιμοτητα",
};

const statuses = ["Διαθέσιμο", "Συντήρηση", "Επισκευή", "Ενοικιασμένο"];

const VehicleCard = (props) => {
  const { car, events } = props;

  const router = useRouter();

  const [reservations, setReservations] = useState([]);
  const [vehicleData, setVehicleData] = useState({
    carModel: car.carModel,
    licensePlate: car.licensePlate,
    color: car.color,
    category: car.category,
    year: car.year,
    status: "Διαθέσιμο",
    location: car.location,
  });

  const labelsStyles =
    "font-[family-name:var(--font-geist-sans)] uppercase text-[0.65rem] text-gray-600 font-bold tracking-wide";

  const handleChange = (field, value) => {
    setVehicleData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      await fetch(`/api/vehicles/update/${car.carId}`, {
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

  useEffect(() => {
    setReservations([
      { id: 1, from: "2025-05-01", to: "2025-05-05" },
      { id: 2, from: "2025-05-10", to: "2025-05-15" },
    ]);
  }, []); //[car.carId]

  return (
    <Tabs defaultValue="details" className="max-w-3xl mx-auto p-4">
      <TabsList className="grid w-full grid-cols-2 mb-4 font-bold">
        <TabsTrigger value="details">Πληροφορίες οχήματος</TabsTrigger>
        <TabsTrigger value="reservations">Κρατήσεις</TabsTrigger>
      </TabsList>

      <TabsContent value="details">
        <Card>
          <CardContent className="space-y-2 px-6 py-1 font-[family-name:var(--font-geist-sans)]">
            {Object.entries(vehicleData).map(([key, value]) =>
              key === "status" ? (
                <div key={key}>
                  <Label htmlFor={key} className={labelsStyles}>
                    Κατασταση
                  </Label>
                  <Select
                    value={value}
                    onValueChange={(val) => handleChange(key, val)}
                    className="font-[family-name:var(--font-geist-sans)]"
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue
                        placeholder="Επιλογή.."
                        className="font-[family-name:var(--font-geist-sans)]"
                      />
                    </SelectTrigger>
                    <SelectContent className="font-[family-name:var(--font-geist-sans)]">
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
                  <Label htmlFor={key} className={labelsStyles}>
                    {vehicleDataLabelsEL[key]}
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
            <div className="flex flex-row justify-between mt-4">
              <Button onClick={handleSave}>Αποθήκευση</Button>
              <Button
                onClick={() => router.push(`../../removeVehicle/${car.carId}`)}
              >
                Διαγραφή
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="reservations">
        {/* {console.log(new Date("2025-05-26T09:30:00Z"))} */}
        <Card className="py-2">
          <CardContent className="p-6 space-y-4">
            <Calendar events={events}>
              <div className="flex flex-row justify-evenly pb-2 font-semibold">
                <CalendarCurrentDate />
              </div>
              <CalendarMonthView />
              <div className="flex flex-row justify-between w-full">
                <CalendarPrevTrigger> &lt; </CalendarPrevTrigger>
                <CalendarTodayTrigger>Σήμερα</CalendarTodayTrigger>
                <CalendarNextTrigger> &gt; </CalendarNextTrigger>
              </div>
            </Calendar>
            <h3 className="text-lg font-semibold">Επόμενες κρατήσεις</h3>
            {console.log("Reservations: " + reservations)}
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
};

export default VehicleCard;
