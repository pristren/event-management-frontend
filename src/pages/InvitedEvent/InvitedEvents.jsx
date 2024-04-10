import React, { useContext, useEffect, useState } from "react";
import Profile from "../../components/Profile";
import InvitedEventCard from "./InvitedEventCard";
import MyProvider from "../../Provider/Provider";
import useMyEvent from "../../Hooks/useMyEvent";
import useAxios from "../../Hooks/useAxios";
import { useSelector } from "react-redux";
import Loader from "@/components/Loader/Loader";

const InvitedEvents = () => {
  const { isExpand, setIsExpand } = useContext(MyProvider);

  const { Axios } = useAxios();

  const { user } = useSelector((state) => state.auth);
  // console.log(user);

  const [invitedEvents, setInvitedEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    if (user?.phone) {
      Axios.get(`/invited-event/${user?.phone}`)
        .then((res) => {
          setInvitedEvents(res.data?.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user?.phone]);
  // useEffect(() => {
  //   setLoading(true);
  //   const allEvents = async () => {
  //     const res = await Axios.get("/all-events");
  //     const data = await res.data;
  //     console.log(data?.data);
  //     setInvitedEvent(
  //       data?.data?.filter(
  //         (event) =>
  //           event?.joinedPeople?.find((v) => v === user?.email) &&
  //           event?.userId !== user._id
  //       )
  //     );
  //     setLoading(false);
  //   };
  //   allEvents();
  // }, []);

  return (
    <section className="flex">
      <div className="w-full">
        <div className="flex items-center justify-between pt-4 pb-5 sm:pb-10 px-4">
          <span
            className="cursor-pointer sm:hidden"
            onClick={() => setIsExpand(!isExpand)}
          >
            <svg
              stroke="currentColor"
              fill="black"
              strokeWidth="0"
              viewBox="0 0 448 512"
              height="23px"
              width="23px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"></path>
            </svg>
          </span>
          <h1 className="text-[black] font-bold text-2xl">Invited Events</h1>
          <Profile />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 px-5">
          {!loading ? (
            invitedEvents &&
            invitedEvents.map((event, i) => {
              return (
                <InvitedEventCard
                  event={event}
                  key={i}
                  setLoading={setLoading}
                  setInvitedEvent={setInvitedEvents}
                />
              );
            })
          ) : (
            <div className="min-h-full">
        <Loader></Loader>
      </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default InvitedEvents;
