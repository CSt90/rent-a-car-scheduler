"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import fleet_data from "@/app/fleet_data.json";
/* RESULT FROM DB 
   Select cars from bookings 
   where todate>="dateGiven" 
   and time>="timeGiven" 
*/
import CarDataCard from "@/components/CarDataCard";
import UserMenu from "@/components/UserMenu";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
import { MultiSelect } from "@/components/multi-select";
import { Label } from "@/components/ui/label";
import { Menu } from "lucide-react";
import { CalendarSearch } from "lucide-react";
import { SearchBar } from "@/components/SearchBar";

const statusList = [
  { value: "Available", label: "Διαθέσιμο" },
  { value: "Rented", label: "Ενοικιασμένο" },
  { value: "In Service", label: "Επισκευή" },
  { value: "Maintenance", label: "Συντήρηση" },
];

export default function Home(searchParams) {
  /* MANIPULATE DB QUERY RESULT
  let temp_fleet = fleet_data;
  temp_fleet.forEach((car) => {
    car.email = "bitch";
  });
  console.log(temp_fleet);
  */

  const [fromDate, setFromDate] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toDate, setToDate] = useState("");
  const [toTime, setToTime] = useState("");
  const [filtered, setFiltered] = useState(fleet_data);

  const handleApply = () => {
    if (!date || !time) return;

    const filterDateTime = new Date(`${date}T${time}`);

    const result = fleet.filter((car) => {
      const carAvailable = new Date(car.availableAfter);
      return carAvailable > filterDateTime;
    });

    setFiltered(result);
  };

  const query = searchParams.q || "";
  const [statusFilter, setStatusFilter] = useState(["Available"]);
  let filtered_fleet;
  query !== ""
    ? (filtered_fleet = fleet_data.filter((item) =>
        item.carModel.toLowerCase().includes(query.toLowerCase())
      ))
    : (filtered_fleet = []);

  // console.log(filtered);

  const linkButtonStyle =
    "px-4 py-3 rounded-lg border-[2px] border-cyan-300 text-cyan-300 hover:bg-cyan-300/20 active:bg-cyan-300/20 text-center";

  // fleet_data.forEach((fdo) => {
  //   console.log(fdo.carModel);
  // });

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-[family-name:var(--font-geist-sans)]">
      {/* Header */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Κατάσταση οχημάτων</h1>
        {/* <Button variant="outline">
          <Menu />
        </Button> */}
        <UserMenu pg="Status" />
      </header>

      {/* <Dialog className={""}>
        <DialogTrigger asChild>
          <Button className="w-[92.5vw] sm:w-[97.5vw] mt-4 mx-4 uppercase text-[12px] font-bold tracking-wide font-[family-name:var(--font-geist-sans)]">
            <CalendarSearch /> Αναζητηση περιοδου
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle></DialogTitle>
          </DialogHeader>

          <div className="space-y-4 font-[family-name:var(--font-geist-sans)]">
            <div className="flex flex-row gap-2 items-center justify-between">
              <div className="space-y-1">
                <Label
                  htmlFor="date"
                  className={"uppercase text-[10px] font-bold tracking-wide"}
                >
                  Απο Ημερομηνια
                </Label>
                <Input
                  id="fromDate"
                  type="date"
                  value={fromDate}
                  className={"text-sm"}
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <Label
                  htmlFor="date"
                  className={"uppercase text-[10px] font-bold tracking-wide"}
                >
                  Εως Ημερομηνια
                </Label>
                <Input
                  id="toDate"
                  type="date"
                  value={toDate}
                  className={"text-sm"}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-row gap-2 items-center justify-between">
              <div className="space-y-1 flex-1">
                <Label
                  htmlFor="time"
                  className={"uppercase text-[10px] font-bold tracking-wide"}
                >
                  Απο ωρα
                </Label>
                <Input
                  id="fromTime"
                  type="time"
                  value={fromTime}
                  className={"text-sm"}
                  onChange={(e) => setFromTime(e.target.value)}
                />
              </div>
              <div className="space-y-1 flex-1">
                <Label
                  htmlFor="time"
                  className={"uppercase text-[10px] font-bold tracking-wide"}
                >
                  Εως ωρα
                </Label>
                <Input
                  id="toTime"
                  type="time"
                  value={toTime}
                  className={"text-sm"}
                  onChange={(e) => setToTime(e.target.value)}
                />
              </div>
            </div>
          </div>

          <DialogFooter className="pt-4">
            <Button variant="secondary">Άκυρο</Button>
            <Button onClick={handleApply}>Εφαρμογή</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}

      {/* Date/Time Selectors */}
      {/* <section className="p-4 bg-white border-b">
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
      </section> */}

      {/* Search Bar */}
      {/*<section className="p-4">
         <Input
          className="text-sm"
          placeholder="Αναζήτηση μοντέλου, πινακίδας ή κατηγορίας"
        /> */}
      {/* <SearchBar />
        <ul className="space-y-2">
          {filtered.map((item) => (
            <li key={item.carID} className="text-lg font-medium">
              {item.carModel}
            </li>
          ))}
          {!filtered.length && <p>No results found.</p>}
        </ul>         
      </section>*/}
      {/* NEEDS FIXING*/}

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
              carId={car.carId}
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
