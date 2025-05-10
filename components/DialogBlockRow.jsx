import * as React from "react";
import { Label } from "@/components/ui/label";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const DialogBlockRow = (props) => {
  const {
    inputId1,
    inputId2,
    inputValue1,
    inputValue2,
    input1ChangeFunc,
    input2ChangeFunc,
    labelValue1,
    labelValue2,
  } = props;
  return (
    <div className="flex flex-row gap-4 w-full">
      <div className="space-y-1 flex-3/4">
        <Label
          htmlFor={inputId1}
          className={"uppercase text-[10px] font-bold tracking-wide"}
        >
          {labelValue1}
        </Label>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start",
                !inputValue1 && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {inputValue1 ? (
                format(inputValue1, "dd/MM/yyyy")
              ) : (
                <span>ηη/μμ/εεεε</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              id={inputId1} // "fromDate"
              mode="single"
              selected={inputValue1}
              onSelect={input1ChangeFunc}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="space-y-1  flex-1/4">
        <Label
          htmlFor={inputId2}
          className={"uppercase text-[10px] font-bold tracking-wide"}
        >
          {labelValue2}
        </Label>
        <Input
          id={inputId2} // "fromDate"
          type="time" // "date"
          value={inputValue2} //fromDate
          className={"text-sm"}
          onChange={(e) => input2ChangeFunc(e.target.value)} //setFromDate(e.target.value)
        />
      </div>
    </div>
  );
};

export default DialogBlockRow;
