import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const NextIcon = () => {
  return (
    <svg
      stroke="currentColor"
      fill="#7D7D7D"
      strokeWidth="0"
      viewBox="0 0 24 24"
      height="28"
      width="28"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M13.1714 12.0007L8.22168 7.05093L9.63589 5.63672L15.9999 12.0007L9.63589 18.3646L8.22168 16.9504L13.1714 12.0007Z"></path>
    </svg>
  );
};

const PrevIcon = () => {
  return (
    <svg
      stroke="currentColor"
      fill="#7D7D7D"
      strokeWidth="0"
      viewBox="0 0 24 24"
      height="28"
      width="28"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path>
    </svg>
  );
};

export default function Calender({ setEventDate }) {
  const [value, onChange] = useState(new Date());
  //   var daysOfWeek = [
  //     "Sunday",
  //     "Monday",
  //     "Tuesday",
  //     "Wednesday",
  //     "Thursday",
  //     "Friday",
  //     "Saturday",
  //   ];

  //   var dayName = daysOfWeek[value.getDay()];
  //   setNewDate(dayName);
  useEffect(() => {
    setEventDate(value);
  }, [value]);

  return (
    <div className="w-full">
      <Calendar
        onChange={onChange}
        value={value}
        className={"customizeCalender"}
        prev2Label={null}
        next2Label={null}
        nextLabel={<NextIcon />}
        prevLabel={<PrevIcon />}
      />
    </div>
  );
}
