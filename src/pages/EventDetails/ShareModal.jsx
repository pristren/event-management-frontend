import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

export default function ShareModal({ openModal, handleCloseModal }) {
  const url = window?.location?.href;
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
  //   console.log(openModal);
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
                      <button
                        className="ml-auto focus-visible:outline-none"
                        onClick={handleCloseModal}
                      >
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
                            value={`${url}}`}
                          />
                          <button onClick={copyToClipboard}>Copy</button>
                        </div>
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
