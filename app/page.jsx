"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import fleet_data from "@/app/fleet_data.json";
import CarDataCard from "@/components/CarDataCard";
import UserMenu from "@/components/UserMenu";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
import { MultiSelect } from "@/components/multi-select";
import { Menu } from "lucide-react";

const statusList = [
  { value: "Available", label: "Διαθέσιμο" },
  { value: "Rented", label: "Ενοικιασμένο" },
  { value: "In Service", label: "Επισκευή" },
  { value: "Maintenance", label: "Συντήρηση" },
];

export default function Home() {
  const [statusFilter, setStatusFilter] = useState(["Available"]);

  const linkButtonStyle =
    "px-4 py-3 rounded-lg border-[2px] border-cyan-300 text-cyan-300 hover:bg-cyan-300/20 active:bg-cyan-300/20 text-center";

  // fleet_data.forEach((fdo) => {
  //   console.log(fdo.carModel);
  // });

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-[family-name:var(--font-geist-sans)]">
      {/* Header */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Διαχείρηση στόλου</h1>
        {/* <Button variant="outline">
          <Menu />
        </Button> */}
        <UserMenu />
      </header>

      {/* Date/Time Selectors */}
      <section className="p-4 bg-white border-b">
        <div className="flex flex-row gap-3 sm:flex-row sm:gap-6">
          <div className="flex-1">
            <label className="text-[10px] font-sm uppercase font-bold">
              Ημερομηνια
            </label>
            <Input type="date" className="mt-1 text-sm" />
          </div>
          <div className="flex-1">
            <label className="text-[10px] font-sm uppercase font-bold">
              Ωρα
            </label>
            <Input type="time" className="mt-1 text-sm" />
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="p-4">
        <Input
          className="text-sm"
          placeholder="Αναζήτηση μοντέλου, πινακίδας ή κατηγορίας"
        />
      </section>

      {/* MultiSelect search filter */}
      <section className="p-4">
        <MultiSelect
          options={statusList}
          onValueChange={setStatusFilter}
          defaultValue={statusFilter}
          placeholder="Επιλογή κατάστασης"
          variant="inverted"
          animation={2}
          maxCount={4}
        />
      </section>

      {/* Car Cards */}
      <main className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {/* {fleet_data
          .filter((fleetGroup) => statusFilter.includes(fleetGroup.status))
          .map((car) => (
            <CarDataCard
              key={car.carId}
              carModel={car.carModel}
              licensePlate={car.licensePlate}
              color={car.color}
              location={car.location}
              status={car.status}
            />
          ))} */}

        {fleet_data
          .filter((fleetGroup) => statusFilter.includes(fleetGroup.status))
          .map((car) => (
            <CarDataCard
              key={car.carId}
              carModel={car.carModel}
              licensePlate={car.licensePlate}
              color={car.color}
              location={car.location}
              status={car.status}
            />
          ))}
      </main>
      <hr className="w-full border-b-[1px] border-gray-400" />

      {/* <Accordion type="single" collapsible className="w-full p-4">
        <AccordionItem value="item-1">
          <AccordionTrigger>Μη διαθέσιμα αυτοκίνητα</AccordionTrigger>
          <AccordionContent>
            <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {fleet_data
                .filter((car) => car.status !== "Available")
                .map((available) => (
                  <CarDataCard
                    key={available.carId}
                    carModel={available.carModel}
                    licensePlate={available.licensePlate}
                    color={available.color}
                    location={available.location}
                    status={available.status}
                  />
                ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion> */}

      {/* Footer */}
      <footer className="bg-white text-center text-sm text-gray-500 py-4">
        © 2025 Rent-A-Car Fleet Manager
      </footer>
    </div>
  );
}
