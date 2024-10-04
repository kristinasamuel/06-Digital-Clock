//  digital clock
"use client";
// import hooks from react
import { useState, useEffect, useMemo } from "react";
// import button from components use shadcn library
import { Button } from "./ui/button";
import { Card } from "./ui/card";
// export a default function Digital clock
export default function DigitalClock() {
  const [time, setTime] = useState<Date>(new Date());
  const [is24Hour, setIs24Hour] = useState<boolean>(true);
  const [mounted, setMounted] = useState<boolean>(false);
  //  now we use useeffect hooks
  useEffect(() => {
    setMounted(true);
    const intervel = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(intervel);
  }, []);
  //  set the format of the time (for 24 hour or 12 hour)
  const formattedTime = useMemo<string>(() => {
    if (!mounted) return "";
    // set time in 24 hour format
    const hours = is24Hour
      ? // now we use if else statement if the time is 24 hour then show time in 24 format or in the else time in 12 hour then show 12 hour format
        // show time in 24-hour format
        time.getHours().toString().padStart(2, "0")
      : // show time in 12-hour format
        (time.getHours() % 12 || 12).toString().padStart(2, "0");
    // Set Format for  minutes
    const minutes = time.getMinutes().toString().padStart(2, "0");
    // Set Format for seconds
    const seconds = time.getSeconds().toString().padStart(2, "0");
    // Return formatted time string
    return `${hours}:${minutes}:${seconds}`;
  }, [time, is24Hour, mounted]);
  return (
    <div className="flex items-center justify-center h-screen bg-zinc-300">
      <Card className="md:p-8 p-4 shadow-lg rounded-2xl ">
        <div className="flex flex-col items-center justify-center">
          <div className="text-2xl font-bold tracking-tight">
            Digital Clock{" "}
          </div>
          <div className="text-sm md:text-lg text-gray-500 dark:text-gray-400 mb-4  ">
          Current Time Display: Hours, Minutes, and Seconds.
          </div>
          <div className="text-3xl md:text-6xl font-bold tracking-tight text-red-600">
            {formattedTime}
          </div>
          <div className="mt-4 flex item-center">          
            <Button
              variant={is24Hour ? "default" : "outline"}
              onClick={() => setIs24Hour(false)}
              className="font-bold text-black bg-slate-300 hover:bg-slate-200"
            >
              12-Hour Format
            </Button>
            <Button
              variant={is24Hour ? "default" : "outline"}
              onClick={() => setIs24Hour(true)}
              className="mr-2 font-bold text-black bg-slate-300 hover:bg-slate-100"
            >
              24-Hour Format
              </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
