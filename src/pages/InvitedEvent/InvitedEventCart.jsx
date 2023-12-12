import { Link, useNavigate } from "react-router-dom";
import invitedCardImage from "../../assets/invite-card-banner.png";
import moment from "moment/moment";

const InvitedEventCart = ({ event }) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="rounded-xl border border-[#D3D3D3] shadow-primary overflow-hidden ">
        <figure
          className="w-full max-h-44 overflow-hidden cursor-pointer"
          onClick={() => navigate(`/event-details/${event?._id}`)}
        >
          <img className="w-full h-auto" src={event?.event_images[0]?.image} />
        </figure>

        <div className="p-6">
          <h2
            className="text-2xl mb-1 cursor-pointer"
            onClick={() => navigate(`/event-details/${event?._id}`)}
          >
            {" "}
            {event?.event_title}{" "}
          </h2>
          <p className="text-gray-500 mb-2">
            {" "}
            {moment(event?.event_time?.time_end).diff(
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
            | {moment(event?.event_date).format("MMMM D, YYYY")},{" "}
            {moment(event?.event_time?.time_start).format("hh:mm a")}
          </p>

          <p className="text-sm font-medium text-[#333]">
            Joined People: {event.joinedPeople?.length}
          </p>

          <Link
            className="w-full text-[#33BDEF] bg-[#33BDEF] bg-opacity-[0.15] hover:bg-opacity-80 hover:text-white transition duration-200 block text-center py-2 mt-7"
            to="#"
          >
            Joined
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InvitedEventCart;
