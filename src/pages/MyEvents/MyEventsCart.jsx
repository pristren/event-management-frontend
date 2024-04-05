import moment from "moment/moment";
import { Link, useNavigate } from "react-router-dom";
// import invitedCardImage from "../../assets/invite-card-banner.png";

const MyEventsCart = ({ event, handleDelete }) => {
  const navigate = useNavigate();
  let eventTimeStart;

  if (event?.event_time?.time_start?.length < 6) {
    eventTimeStart = event?.event_time?.time_start;
  } else {
    eventTimeStart = moment(event?.event_time?.time_start).format("hh:mm a");
  }

  let eventEndTime;
  if (event?.event_time?.time_end?.length < 6) {
    eventEndTime = event?.event_time?.time_end;
  } else {
    eventEndTime = moment(event?.event_time?.time_end).format("hh:mm a");
  }
  return (
    <div>
      <div className="rounded-xl border border-[#D3D3D3] shadow-primary overflow-hidden">
        <figure
          className="w-full max-h-44 overflow-hidden cursor-pointer"
          onClick={() => navigate(`/event-details/${event?._id}`)}
        >
          <img className="w-full h-auto" src={event?.event_images[0]?.image} />
        </figure>

        <div className="p-6">
          <div
            className="cursor-pointer"
            onClick={() => navigate(`/event-details/${event?._id}`)}
          >
            <h2 className="text-2xl mb-1"> {event?.event_title} </h2>
            <p className="text-gray-500 mb-2">
              {/* {moment(event?.event_time?.time_end).diff(
                moment(event?.event_time?.time_start),
                "hours"
              ) == 0
                ? `${moment(event?.event_time?.time_end).diff(
                    moment(event?.event_time?.time_start),
                    "minutes"
                  )} minutes `
                : `${moment(event?.event_time?.time_end).diff(
                    moment(event?.event_time?.time_start),
                    "hours"
                  )} hours `}
              | 
              {moment(event?.event_date).format("MMMM D, YYYY")},{" "} */}
              {moment(event?.event_date?.date_start).format("MMMM D, YYYY")},{" "}
              {eventTimeStart}
              {moment(event?.event_date?.date_end).format("MMMM D, YYYY")},{" "}
              {eventEndTime}
            </p>

            <p className="text-sm font-medium text-[#333]">
              {event?.joinedPeople?.length} People have joined
            </p>
          </div>

          <div className="flex justify-between gap-4">
            <Link
              className="rounded-lg w-full text-[#33BDEF] bg-[#33BDEF] bg-opacity-[0.15] hover:bg-opacity-80 hover:text-white transition duration-200 block text-center py-2 mt-7"
              to={`/update-event/${event?._id}`}
            >
              Edit
            </Link>
            <button
              className="rounded-lg w-full text-white bg-[#f77979]  hover:text-white transition duration-200 block text-center py-2 mt-7"
              onClick={() => handleDelete(event?._id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyEventsCart;
