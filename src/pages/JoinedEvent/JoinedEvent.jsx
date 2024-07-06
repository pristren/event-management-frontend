import useAxios from "@/Hooks/useAxios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import JoinedEventCard from "./JoinedEventCard";
import Profile from "@/components/Profile";
import Loader from "@/components/Loader/Loader";
import { Input } from "@/components/ui/input";

const JoinedEvent = () => {
  const { user, accessToken } = useSelector((state) => state.auth);
  const [joinedEvents, setJoinedEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const { Axios } = useAxios();
  const state = useSelector((state) => state.auth);
  // const [uploadImages, setUploadImages] = useState([]);
  // const [profile_images, setProfileImages] = useState("");
  const [category, setCategory] = useState("");
  const [input, setInput] = useState("");

  const handleSelectChange = (e) => {
    setCategory(e.target.value);
  };
  // useEffect(() => {
  //   setUploadImages(state?.user?.profile_images);
  //   const profile = localStorage.getItem("profile_image");
  //   if (!profile) {
  //     setProfileImages(state?.user?.profile_images[0]);
  //   }
  // }, []);

  // useEffect(() => {
  //   const profile = localStorage.getItem("profile_image");
  //   if (profile) {
  //     setProfileImages(JSON.parse(profile));
  //   }
  // }, []);

  useEffect(() => {
    setLoading(true);
    if (user?.email) {
      Axios.get(`/my-joinedEvents/${user?.email}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
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
          <h1 className="text-[black] font-bold text-2xl">Joined Events</h1>
          <Profile profile_images={state?.user?.currentProfile} />
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
                <option value="">Choose a category</option>
                <option value="Culture">Culture</option>
                <option value="Food">Food</option>
                <option value="Music">Music</option>
                <option value="Sport">Sport</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {!loading && joinedEvents?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 px-5">
            {joinedEvents
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
                  <JoinedEventCard
                    event={event}
                    key={i}
                    setLoading={setLoading}
                    setJoinedEvent={setJoinedEvents}
                  />
                );
              })}
          </div>
        ) : !loading && joinedEvents?.length === 0 ? (
          <div className="min-h-full w-full">
            <h1 className="text-left text-lg text-gray-700">
              You have not joined any event yet.
            </h1>
          </div>
        ) : (
          <div className="min-h-full">
            <Loader></Loader>
          </div>
        )}

        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 px-5">
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
        </div> */}
      </div>
    </section>
  );
};

export default JoinedEvent;
