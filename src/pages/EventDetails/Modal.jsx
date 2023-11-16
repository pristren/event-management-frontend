import { Modal } from "flowbite-react";
import Image from "../../assets/members/1.png";
import MemberCard from "./MemberCard";

function Modals({ openModal, setOpenModal }) {
  function onCloseModal() {
    setOpenModal(false);
    setEmail("");
  }

  const arr = [{}, {}, {}];

  return (
    <>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Joined member
            </h3>
            <div className="flex flex-col gap-2">
              {arr?.map((member, index) => (
                <MemberCard key={index} />
              ))}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Modals;
