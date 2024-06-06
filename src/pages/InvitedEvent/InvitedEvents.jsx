import React, { useContext, useEffect, useState } from "react";
import Profile from "../../components/Profile";
import InvitedEventCard from "./InvitedEventCard";
import MyProvider from "../../Provider/Provider";
import useMyEvent from "../../Hooks/useMyEvent";
import useAxios from "../../Hooks/useAxios";
import { useSelector } from "react-redux";
import Loader from "@/components/Loader/Loader";
import { Input } from "@/components/ui/input";

const InvitedEvents = () => {
  const { isExpand, setIsExpand } = useContext(MyProvider);

  const { Axios } = useAxios();
  const { user } = useSelector((state) => state.auth);
  const [invitedEvents, setInvitedEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState("");
  const [category, setCategory] = useState("");
  const [input, setInput] = useState("");

  const handleSelectChange = (e) => {
    setCategory(e.target.value);
  };

  useEffect(() => {
    setLoading(true);
    if (user?.onlyPhone) {
      Axios.get(
        `/invited-event/phone=${user?.onlyPhone}&code=${user?.countryCode}`
      )
        .then((res) => {
          if (user?.blocked_users?.length > 0) {
            const filtered = res.data?.data?.filter(
              (e) => !user?.blocked_users?.includes(e?.userId)
            );
            setInvitedEvents(
              filtered.sort(
                (a, b) =>
                  new Date(b.event_date.date_start) -
                  new Date(a.event_date.date_start)
              )
            );
          } else {
            setInvitedEvents(
              res.data?.data.sort(
                (a, b) =>
                  new Date(b.event_date.date_start) -
                  new Date(a.event_date.date_start)
              )
            );
          }
          // setInvitedEvents(res.data?.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
          setShowMessage("");
        });
    } else if (user?.email) {
      if (user?.onlyPhone === null) {
        setShowMessage(
          "Please update your phone number to see invited event lists!"
        );
        setLoading(false);
        return;
      }
    }
  }, [user?.onlyPhone]);

  return (
    <section className="flex">
      <div className="w-full px-4">
        <div className="flex items-center justify-between pt-4 pb-5 sm:pb-10 ">
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
          <Profile profile_images={user?.currentProfile} />
        </div>

        <div className=" pb-12 flex justify-between">
          <div className="w-2/4">
            <h3 className="text-gray-500 mb-2">Filter By Name</h3>
            <Input
              className="focus-visible:ring-0  focus-visible:ring-offset-0 "
              placeholder="Type event name..."
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <div>
            <h3 className="mb-2 text-gray-500">Filter By Category</h3>
            <div className="relative">
              <select
                name="category"
                id="category"
                className="outline-none p-2 border cursor-pointer"
                onChange={handleSelectChange}
                value={category}
              >
                <option value="">All Categories</option>
                <option value="Game">Game</option>
                <option value="Tournament">Tournament</option>
                <option value="Free Play">Free Play</option>
                <option value="3vs3">3vs3</option>
                <option value="others">Others</option>
              </select>
            </div>
          </div>
        </div>

        {!loading && invitedEvents?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 px-5">
            {invitedEvents
              ?.filter((event) =>
                event?.category
                  ?.toLowerCase()
                  ?.includes(category?.toLowerCase())
              )
              ?.filter((event) =>
                event?.event_title
                  ?.toLowerCase()
                  ?.includes(input?.toLowerCase())
              )

              ?.map((event, i) => {
                return (
                  <InvitedEventCard
                    event={event}
                    key={i}
                    setLoading={setLoading}
                    setInvitedEvent={setInvitedEvents}
                  />
                );
              })}
          </div>
        ) : !loading && showMessage ? (
          <div className="min-h-full w-full">
            <h1 className="text-left text-lg text-gray-700">{showMessage}</h1>
          </div>
        ) : !loading && invitedEvents?.length === 0 ? (
          <div className="min-h-full w-full">
            <h1 className="text-left text-lg text-gray-700">
              No one has invited you to any event yet!.
            </h1>
          </div>
        ) : (
          <div className="min-h-full">
            <Loader></Loader>
          </div>
        )}
      </div>
    </section>
  );
};

export default InvitedEvents;
