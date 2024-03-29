import { useContext, useState } from "react";
import useMyEvent from "../../Hooks/useMyEvent";
import MyProvider from "../../Provider/Provider";
import Profile from "../../components/Profile";
import MyEventsCart from "./MyEventsCart";
import useAxios from "../../Hooks/useAxios";
import { useSelector } from "react-redux";
import { Input } from "@/components/ui/input";

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
          <Profile />
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
            <select
              name="category"
              id="category"
              className="outline-none p-2   border"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              <option value="">All Categories</option>
              <option value="Sports">Sports</option>
              <option value="BirthDay">BirthDay</option>
              <option value="Study">Study</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-5">
          {isLoading === true && <p className="px-4 text-black">Loading...</p>}
          {ownEvent?.ownEvents?.length
            ? ownEvent?.ownEvents
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
            : null}
        </div>
      </div>
    </section>
  );
};

export default MyEvents;
