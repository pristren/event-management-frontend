import { Link } from "react-router-dom";
import invitedCardImage from "../../assets/invite-card-banner.png";

const InvitedEventCart = () => {
  return (
    <div>
      <div className="">
        <figure className="w-full max-h-48 overflow-hidden">
          <img className="w-full h-auto" src={invitedCardImage} />
        </figure>

        <div className="border border-t-0 p-6">
          <h2 className="text-3xl mb-1"> Lunch Menu Upto 50% </h2>
          <p className="text-gray-500 mb-4"> 3 hours | 12 jun 2021, 10:00 am</p>

          <p className="text-sm font-medium text-[#333] mb-3">
            24 People have joined
          </p>

          <h4 className="text-lg font-semibold"> Description : </h4>
          <p className="text-base text-[#828282]">
            Best Burgers in Town! Pass by for Lunch! Let your friends, work
            colleagues or family join you. You all benefit from a 50% discount
            on your lunch menu! we look forward to you! 🍔🍟🍔🍟
          </p>

          <Link
            className="w-full text-[#33BDEF] bg-[#33BDEF] bg-opacity-[0.15] hover:bg-opacity-80 hover:text-white transition duration-200 block text-center py-2 mt-10"
            to="#"
          >
            Join
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InvitedEventCart;
