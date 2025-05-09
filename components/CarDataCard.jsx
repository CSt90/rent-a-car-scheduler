import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const CarDataCard = (props) => {
  const { carId, carModel, licensePlate, color, location, status } = props;
  const nextAvl = "04/06/2025 18:40";
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

  const env = process.env.NODE_ENV;
  let _BASE_URL_;
  if (env == "development") {
    _BASE_URL_ = "http://localhost:3000";
  } else if (env == "production") {
    _BASE_URL_ = "https://rent-a-car-scheduler.vercel.app";
  }

  return (
    <Card className="gap-2">
      <div
        className={`flex flex-row gap-1 text-sm ml-auto mr-4 px-3 -my-[6px] items-center ${statusColorAvailable} py-[1px] pt-[2px] rounded-xl`}
      >
        <span className={`${textColorAvailable} p-0 -ml-1 mb-[2px]`}>
          &#x25cf;
        </span>
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
        {status !== "Available" && (
          <p className="text-sm text-gray-500">Διαθέσιμο ξανά: {nextAvl}</p>
        )}

        {/* <img
            src="https://via.placeholder.com/300x180?text=Toyota+Corolla"
            alt="Toyota Corolla"
            className="rounded-t-xl w-[50%] h-20 object-cover"
        /> */}
        <div className="flex flex-col gap-2 pt-2">
          <a href={`${_BASE_URL_}/manage/vehicle/${carId}`}>
            <Button variant="outline" className="w-full">
              Διαχείρηση
            </Button>
          </a>

          <a href={`${_BASE_URL_}/reserveVehicle/${carId}`}>
            <Button className="w-full">Δέσμευση</Button>
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export default CarDataCard;
