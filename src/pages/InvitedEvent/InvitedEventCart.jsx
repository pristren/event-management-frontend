import { Link } from "react-router-dom";
import invitedCardImage from "../../assets/invite-card-banner.png";

const InvitedEventCart = () => {
  return (
    <div>
      <div className="rounded-xl border border-[#D3D3D3] shadow-primary overflow-hidden">
        <figure className="w-full max-h-44 overflow-hidden">
          <img className="w-full h-auto" src={invitedCardImage} />
        </figure>

        <div className="p-6">
          <h2 className="text-2xl mb-1"> Lunch Menu Upto 50% </h2>
          <p className="text-gray-500 mb-2"> 3 hours | 12 jun 2021, 10:00 am</p>

          <p className="text-sm font-medium text-[#333]">
            24 People have joined
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
