import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import fleet_data from "@/app/fleet_data.json";
import CarDataCard from "@/components/CarDataCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Home() {
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
        <Button variant="outline">Logout</Button>
      </header>

      {/* Date/Time Selectors */}
      <section className="p-4 bg-white border-b">
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
          <div className="flex-1">
            <label className="text-sm font-medium">Ημ/νία</label>
            <Input type="date" className="mt-1" />
          </div>
          <div className="flex-1">
            <label className="text-sm font-medium">Ώρα</label>
            <Input type="time" className="mt-1" />
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="p-4">
        <Input placeholder="Αναζήτηση μοντέλου, πινακίδας ή κατηγορίας" />
      </section>

      {/* Car Cards */}
      <main className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {fleet_data
          .filter((car) => car.status === "Available")
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
        <hr className="w-full border-b-[1px] border-gray-400" />

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Μη διαθέσιμα αυτοκίνητα</AccordionTrigger>
            <AccordionContent>
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
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </main>

      {/* Footer */}
      <footer className="bg-white text-center text-sm text-gray-500 py-4">
        © 2025 Rent-A-Car Fleet Manager
      </footer>
    </div>
  );
}
