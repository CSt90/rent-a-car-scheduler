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
import DialogBlockRow from "@/components/DialogBlockRow";

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

  const addLeadingZero = (x) => {
    x = parseInt(x);
    return x < 10 ? "0" + String(x) : String(x);
  };

  const handleApply = () => {
    if (!fromDate || !fromTime) return;
    let formattedFromDate =
      fromDate.getFullYear() +
      "-" +
      addLeadingZero(fromDate.getMonth() + 1) +
      "-" +
      addLeadingZero(fromDate.getDate());

    let formattedToDate =
      toDate.getFullYear() +
      "-" +
      addLeadingZero(toDate.getMonth() + 1) +
      "-" +
      addLeadingZero(toDate.getDate());

    const filterFromDateTime = new Date(`${formattedFromDate}T${fromTime}`);
    const filterToDateTime = new Date(`${formattedToDate}T${toTime}`);

    // console.log(formattedFromDate);
    console.log(filterFromDateTime);
    console.log(filterToDateTime);

    // const result = fleet.filter((car) => {
    //   const carAvailable = new Date(car.availableAfter);
    //   return carAvailable > filterDateTime;
    // });

    // setFiltered(result);
  };

  const query = searchParams.q || "";
  const [statusFilter, setStatusFilter] = useState(["Available"]);
  let filtered_fleet;
  query !== ""
    ? (filtered_fleet = fleet_data.filter((item) =>
        item.carModel.toLowerCase().includes(query.toLowerCase())
      ))
    : (filtered_fleet = []);

  const linkButtonStyle =
    "px-4 py-3 rounded-lg border-[2px] border-cyan-300 text-cyan-300 hover:bg-cyan-300/20 active:bg-cyan-300/20 text-center";

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-[family-name:var(--font-geist-sans)]">
      {/* Header */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Διαθεσιμότητα στόλου</h1>
        {/* <Button variant="outline">
          <Menu />
        </Button> */}
        <UserMenu />
      </header>

      <Dialog className={""}>
        <DialogTrigger asChild>
          <Button className="w-[92.5vw] sm:w-[97.5vw] mt-4 mx-4 uppercase font-bold tracking-wide font-[family-name:var(--font-geist-sans)] items-center">
            <CalendarSearch />
            <span className="text-[12px]">Αναζητηση περιοδου</span>
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle></DialogTitle>
          </DialogHeader>

          <div className="space-y-4 font-[family-name:var(--font-geist-sans)]">
            <div className="flex flex-row gap-2 items-center justify-between">
              <DialogBlockRow
                inputId1="fromDate"
                inputId2="fromTime"
                inputValue1={fromDate}
                inputValue2={fromTime}
                input1ChangeFunc={setFromDate}
                input2ChangeFunc={setFromTime}
                labelValue1="Απο Ημερομηνια"
                labelValue2="Απο Ωρα"
              />
            </div>
            <div className="flex flex-row gap-2 items-center justify-between">
              <DialogBlockRow
                inputId1="toDate"
                inputId2="toTime"
                inputValue1={toDate}
                inputValue2={toTime}
                input1ChangeFunc={setToDate}
                input2ChangeFunc={setToTime}
                labelValue1="Εως Ημερομηνια"
                labelValue2="Εως Ωρα"
              />
            </div>
          </div>

          <DialogFooter className="pt-4">
            <Button variant="secondary">Άκυρο</Button>
            <Button onClick={handleApply}>Εφαρμογή</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
      {/* <section className="p-4">
        <MultiSelect
          options={statusList}
          onValueChange={setStatusFilter}
          defaultValue={statusFilter}
          placeholder="Επιλογή κατάστασης"
          variant="inverted"
          animation={2}
          maxCount={4}
        />
      </section> */}

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

      {/* Footer */}
      <footer className="bg-white text-center text-sm text-gray-500 py-4">
        © 2025 Rent-A-Car Fleet Manager
      </footer>
    </div>
  );
}
