import { useContext, useEffect, useState } from "react";
import useMyEvent from "../../Hooks/useMyEvent";
import MyProvider from "../../Provider/Provider";
import Profile from "../../components/Profile";
import MyEventsCart from "./MyEventsCart";
import useAxios from "../../Hooks/useAxios";
import { useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import OthersCategoryModal from "./OthersCategoryModal";
import Loader from "@/components/Loader/Loader";

const MyEvents = () => {
  const { ownEvent, setMyEvent, isLoading } = useMyEvent();
  const { isExpand, setIsExpand } = useContext(MyProvider);
  const { user } = useSelector((state) => state.auth);
  const { Axios } = useAxios();
  const handleDelete = async (id) => {
    const res = await Axios.delete(`/events/${id}`);
    if (res.data.message) {
      Axios.get(`/my-events/${user?._id}`).then((res) => setMyEvent(res.data));
    }
  };
  const [category, setCategory] = useState("");
  const [input, setInput] = useState("");

  const [openModal3, setOpenModal3] = useState(false);

  const handleSelectChange = (e) => {
    setCategory(e.target.value);
    if (e.target.value === "others") {
      setOpenModal3(true);
    }
  };

  const otherCategory = (e) => {
    setCategory(e.target.value);
  };

  function handleCloseModal3() {
    setOpenModal3(false);
  }
  function handleOpenModal3() {
    setOpenModal3(true);
  }

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
          <h1 className="text-[black] font-bold text-2xl">My Events</h1>
          <Profile profile_images={user?.currentProfile} />
        </div>

        <div className="p-5 pb-12 flex justify-between">
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
                {/* <option value="others" onClick={handleOpenModal3}>
                  Others
                </option> */}
              </select>
              {/* {openModal3 && (
                <OthersCategoryModal
                  openModal={openModal3}
                  handleCloseModal={handleCloseModal3}
                  otherCategory={otherCategory}
                />
              )} */}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-5">
          {isLoading === true && (
            <div className="min-h-full">
              <Loader></Loader>
            </div>
          )}
          {ownEvent?.ownEvents?.length ? (
            ownEvent?.ownEvents
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
              ?.map((event, idx) => (
                <MyEventsCart
                  key={idx}
                  event={event}
                  handleDelete={handleDelete}
                />
              ))
          ) : ownEvent?.ownEvents?.length === 0 ? (
            <div className="">
              <h1 className="text-left text-lg text-gray-700">
                No event created yet!
              </h1>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default MyEvents;
