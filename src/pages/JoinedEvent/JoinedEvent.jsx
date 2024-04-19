import useAxios from "@/Hooks/useAxios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import JoinedEventCard from "./joinedEventCard";
import Profile from "@/components/Profile";
import Loader from "@/components/Loader/Loader";

const JoinedEvent = () => {
  const { user } = useSelector((state) => state.auth);
  const [joinedEvents, setJoinedEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const { Axios } = useAxios();
  const state = useSelector((state) => state.auth);
  const [uploadImages, setUploadImages] = useState([]);
  const [profile_images, setProfileImages] = useState("");
  useEffect(() => {
    setUploadImages(state?.user?.profile_images);
    const profile = localStorage.getItem("profile_image");
    if (!profile) {
      setProfileImages(state?.user?.profile_images[0]);
    }
  }, []);

  useEffect(() => {
    const profile = localStorage.getItem("profile_image");
    if (profile) {
      setProfileImages(JSON.parse(profile));
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    if (user?.phone) {
      Axios.get(`/joined-event/${user?.email}`)
        .then((res) => {
          setJoinedEvents(res.data?.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user?.email]);
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
          <h1 className="text-[black] font-bold text-2xl">Joined Events</h1>
          <Profile profile_images={state.user.currentProfile}/>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 px-5">
          {!loading ? (
            joinedEvents &&
            joinedEvents.map((event, i) => {
              return (
                <JoinedEventCard
                  event={event}
                  key={i}
                  setLoading={setLoading}
                  setJoinedEvent={setJoinedEvents}
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

export default JoinedEvent;
