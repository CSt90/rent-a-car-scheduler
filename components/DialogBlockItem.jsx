import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const DialogBlockItem = (props) => {
  const {
    labelHtmlFor,
    inputId,
    inputType,
    inputValue,
    inputChangeFunc,
    labelValue,
  } = props;
  return (
    <div className="space-y-1 flex-1">
      <Label
        htmlFor={labelHtmlFor}
        className={"uppercase text-[10px] font-bold tracking-wide"}
      >
        Απο Ημερομηνια
      </Label>
      <Input
        id={inputId} // "fromDate"
        type={inputType} // "date"
        value={inputValue} //fromDate
        className={"text-sm"}
        onChange={(e) => inputChangeFunc(e.target.value)} //setFromDate(e.target.value)
      />
    </div>
  );
};

export default DialogBlockItem;
