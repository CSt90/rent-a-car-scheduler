import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const CarDataCard = (props) => {
  const { carModel, licensePlate, color, location, status } = props;
  let textColorAvailable, statusColorAvailable;
  status === "Available"
    ? (textColorAvailable = "text-green-700")
    : (textColorAvailable = "text-red-700");
  status === "Available"
    ? (statusColorAvailable = "bg-green-200/55")
    : (statusColorAvailable = "bg-red-200/55");

  let avlTextGR;
  if (status === "Available") avlTextGR = "Διαθέσιμο";
  if (status === "Rented") avlTextGR = "Ενοικιασμένο";
  if (status === "In Service") avlTextGR = "Επισκευή";
  if (status === "Maintenance") avlTextGR = "Συντήρηση";

  return (
    <Card className="gap-2">
      <div
        className={`flex flex-row gap-1 text-sm ml-auto mr-4 px-2 -my-2 items-center ${statusColorAvailable} -py-1 rounded-xs`}
      >
        <span className={`${textColorAvailable} p-0 mb-[2px]`}>&#x25cf;</span>
        <span
          className={`${textColorAvailable} text-xs font-semibold flex-end`}
        >
          {avlTextGR}
        </span>
      </div>
      <CardContent className="px-4 space-y-1">
        <h2 className="text-lg font-semibold">{carModel}</h2>
        <p className="text-sm text-gray-500">Αρ. κυκλοφορίας: {licensePlate}</p>
        <p className="text-sm text-gray-500">Χρώμα: {color}</p>
        {/* <p className="text-sm">
            Status:{" "}
            <span className="text-green-600 font-semibold">Διαθέσιμο</span>
        </p> */}
        <p className="text-sm text-gray-500">Τοποθεσία: {location}</p>

        {/* <img
            src="https://via.placeholder.com/300x180?text=Toyota+Corolla"
            alt="Toyota Corolla"
            className="rounded-t-xl w-[50%] h-20 object-cover"
        /> */}
        <div className="flex flex-col gap-2 pt-2">
          <Button variant="outline" className="w-full">
            Επεξεργασία
          </Button>
          <Button className="w-full">Δέσμευση</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CarDataCard;
