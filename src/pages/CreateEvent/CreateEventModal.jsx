import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

export default function CreateEventModal({
  openModal,
  handleCloseModal,
  createdEvent,
}) {
  // console.log(createdEvent);

  const url = window?.location?.href;
  const path = url.split("/create-event")[0];
  function copyToClipboard() {
    // Get the text from the input field
    const textToCopy = document.getElementById("textToCopy").value;

    // Create a temporary textarea element
    const textarea = document.createElement("textarea");
    textarea.value = textToCopy;

    // Make the textarea out of the viewport by setting the position off-screen
    textarea.style.position = "absolute";
    textarea.style.left = "-9999px";

    // Append the textarea to the document
    document.body.appendChild(textarea);

    // Select the text in the textarea
    textarea.select();

    // Copy the selected text to the clipboard
    document.execCommand("copy");

    // Remove the textarea
    document.body.removeChild(textarea);

    // Alert or provide feedback to the user
    alert("Text has been copied to the clipboard!");
  }
  return (
    <>
      <Transition appear show={openModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={handleCloseModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="w-full max-w-lg mx-auto bg-[#ffffff] rounded-lg p-6">
                    <div className="flex justify-between items-center">
                      <div className="text-xl font-semibold">
                        Share this Event
                      </div>
                      <button className="ml-auto" onClick={handleCloseModal}>
                        <svg
                          stroke="currentColor"
                          fill="red"
                          strokeWidth="0"
                          viewBox="0 0 1024 1024"
                          height="22px"
                          width="22px"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M512 0C229.232 0 0 229.232 0 512c0 282.784 229.232 512 512 512 282.784 0 512-229.216 512-512C1024 229.232 794.784 0 512 0zm0 961.008c-247.024 0-448-201.984-448-449.01 0-247.024 200.976-448 448-448s448 200.977 448 448-200.976 449.01-448 449.01zm181.008-630.016c-12.496-12.496-32.752-12.496-45.248 0L512 466.752l-135.76-135.76c-12.496-12.496-32.752-12.496-45.264 0-12.496 12.496-12.496 32.752 0 45.248L466.736 512l-135.76 135.76c-12.496 12.48-12.496 32.769 0 45.249 12.496 12.496 32.752 12.496 45.264 0L512 557.249l135.76 135.76c12.496 12.496 32.752 12.496 45.248 0 12.496-12.48 12.496-32.769 0-45.249L557.248 512l135.76-135.76c12.512-12.512 12.512-32.768 0-45.248z"></path>
                        </svg>
                        <span className="sr-only">Close modal</span>
                      </button>
                    </div>
                    <div className="border-t pt-6 mt-2 ">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2 pb-3">
                          <LinkIcon className="w-6 h-6 text-gray-500" />
                          <input
                            className="w-full border rounded-lg px-3"
                            readOnly
                            type="text"
                            id="textToCopy"
                            value={`${path}/event-details/${createdEvent._id}`}
                          />
                          <button onClick={copyToClipboard}>Copy</button>
                        </div>
                        {/* <div className="grid grid-cols-4 gap-4">
                          <button className="flex items-center justify-center ">
                            <FacebookIcon className="w-10 h-10 text-blue-600 border p-2" />
                            <span className="sr-only">Share on Facebook</span>
                          </button>
                          <button
                            className="flex items-center justify-center"
                            variant="outline"
                          >
                            <TwitterIcon className="w-10 h-10 text-blue-400 border p-2" />
                            <span className="sr-only">Share on Twitter</span>
                          </button>
                          <button
                            className="flex items-center justify-center"
                            variant="outline"
                          >
                            <LinkedinIcon className="w-10 h-10 text-blue-700 border p-2" />
                            <span className="sr-only">Share on LinkedIn</span>
                          </button>
                          <button
                            className="flex items-center justify-center"
                            variant="outline"
                          >
                            <MailIcon className="w-10 h-10 text-gray-500 border p-2" />
                            <span className="sr-only">Share via Email</span>
                          </button>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
function FacebookIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function LinkIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function LinkedinIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function MailIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function PanelBottomCloseIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <line x1="3" x2="21" y1="15" y2="15" />
      <path d="m15 8-3 3-3-3" />
    </svg>
  );
}

function TwitterIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}
