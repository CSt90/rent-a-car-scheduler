import React from "react";
import VehicleCard from "@/components/VehicleCard";
import UserMenu from "@/components/UserMenu";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://rent-a-car-scheduler.vercel.app/";

export default async function EditVehiclePage({ params }) {
  const { id } = params;
  const carId = id;

  const events = [
    {
      id: "1",
      start: new Date("2025-05-26T09:30:00Z"),
      end: new Date("2025-05-27T14:30:00Z"),
      title: "Meeting with John",
      color: "pink",
    },
    {
      id: "2",
      start: new Date("2025-05-26T10:00:00Z"),
      end: new Date("2025-05-26T10:30:00Z"),
      title: "Project Review",
      color: "blue",
    },
  ];

  const response = await fetch(`${BASE_URL}/api/vehicles/${carId}`, {
    next: { revalidate: 60 },
  });
  console.log(`${BASE_URL}/api/vehicles/${carId}`);
  const json = await response.json();
  const vehicleData = {
    carId: json.carId,
    carModel: json.carModel,
    licensePlate: json.licensePlate,
    color: json.color,
    category: json.category,
    year: json.year,
    status: "Διαθέσιμο",
    location: json.location,
  };

  console.log(await json);

  return (
    <div className="min-h-screen text-gray-800 font-[family-name:var(--font-geist-sans)]">
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Διαχείρηση οχήματος {carId}</h1>
        {/* <Button variant="outline">
          <Menu />
        </Button> */}
        <UserMenu />
      </header>
      <VehicleCard car={vehicleData} events={events} />
    </div>
  );
}
