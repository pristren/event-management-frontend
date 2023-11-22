import { Link } from "react-router-dom";
// import invitedCardImage from "../../assets/invite-card-banner.png";

const MyEventsCart = ({ event }) => {
  console.log("event ", event);

  const calculateTime = (timeStartStr, timeEndStr) => {
    const timeStartMinutes = convertToMinutes(timeStartStr);
    const timeEndMinutes = convertToMinutes(timeEndStr);

    let timeDiffMinutes = timeEndMinutes - timeStartMinutes;
    if (timeDiffMinutes < 0) {
      timeDiffMinutes += 24 * 60;
    }
    const hours = Math.floor(timeDiffMinutes / 60);
    const minutes = timeDiffMinutes % 60;

    return hours;
  };
  function convertToMinutes(timeStr) {
    const [hours, minutes] = timeStr.split(":").map(Number);
    return hours * 60 + minutes;
  }

  const dateShow = (data) => {
    const inputDate = new Date(data);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      inputDate
    );

    return formattedDate;
  };

  return (
    <div>
      <div className="rounded-xl border border-[#D3D3D3] shadow-primary overflow-hidden">
        <figure className="w-full max-h-44 overflow-hidden">
          <img className="w-full h-auto" src={event?.event_images[0]?.image} />
        </figure>

        <div className="p-6">
          <h2 className="text-2xl mb-1"> {event?.event_title} </h2>
          <p className="text-gray-500 mb-2">
            {" "}
            {calculateTime(
              event?.event_time?.time_start,
              event?.event_time?.time_end
            )}{" "}
            hours | {dateShow(event?.event_date)}, 10:00 am
          </p>

          <p className="text-sm font-medium text-[#333]">
            {event?.joinedPeople?.length} People have joined
          </p>

          <Link
            className="w-full text-[#33BDEF] bg-[#33BDEF] bg-opacity-[0.15] hover:bg-opacity-80 hover:text-white transition duration-200 block text-center py-2 mt-7"
            to="#"
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyEventsCart;
