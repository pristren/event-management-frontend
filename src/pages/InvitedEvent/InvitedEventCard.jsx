import { Link, useNavigate } from "react-router-dom";
import invitedCardImage from "../../assets/invite-card-banner.png";
import moment from "moment/moment";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import useAxios from "@/Hooks/useAxios";

const InvitedEventCard = ({ event, setInvitedEvent }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { Axios } = useAxios();

  const handleJoin = async (id) => {
    await Axios.put(`/join/${id}`, { email: user?.email }).then((res) => {
      if (res.status === 200) {
        const allEvents = async () => {
          const res = await Axios.get("/all-events");
          const data = await res.data;
          setInvitedEvent(
            data?.data?.filter(
              (event) =>
                event?.joinedPeople?.find((v) => v === user?.email) &&
                event?.userId !== user._id
            )
          );
        };
        allEvents();
      }
    });
  };

  const handleUnJoin = async (id) => {
    await Axios.put(`/unjoin/${id}`, { email: user?.email }).then((res) => {
      if (res.status === 200) {
        const allEvents = async () => {
          const res = await Axios.get("/all-events");
          const data = await res.data;
          setInvitedEvent(
            data?.data?.filter(
              (event) =>
                event?.joinedPeople?.find((v) => v === user?.email) &&
                event?.userId !== user._id
            )
          );
        };
        allEvents();
      }
    });
  };

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
            {moment(event?.event_date?.date_start).format("MMMM D, YYYY")},{" "}
            {moment(event?.event_time?.time_start).format("hh:mm a")} -{" "}
            {moment(event?.event_date?.date_end).format("MMMM D, YYYY")},{" "}
            {moment(event?.event_time?.time_end).format("hh:mm a")}
          </p>

          <p className="text-sm font-medium text-[#333]">
            Joined People: {event.joinedPeople?.length}
            {console.log(event.joinRejected)}
          </p>

          <div className="flex gap-3">
            {event?.joinRejected.find((e) => e === user?.email) ? (
              <Button
                className="w-full text-[#33BDEF] bg-[#33BDEF] bg-opacity-[0.15] hover:bg-opacity-80 hover:text-white transition duration-200 block text-center py-2 mt-7 hover:bg-[#33BDEF]"
                onClick={() => handleJoin(event?._id)}
              >
                Join
              </Button>
            ) : (
              <Button
                className="w-full text-[#ff0303] bg-[#ec542d] bg-opacity-[0.15] hover:bg-opacity-80 hover:text-white transition duration-200 block text-center py-2 mt-7   hover:bg-[#ec542d]"
                onClick={() => handleUnJoin(event?._id)}
              >
                Not Join
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvitedEventCard;
