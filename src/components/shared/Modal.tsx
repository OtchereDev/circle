import React from "react";
interface ISharedModal {
  isOpen: boolean;
  onClose: () => void;
  isLoading?: boolean;
  children: React.ReactNode;
}

const Modal: React.FC<ISharedModal> = ({
  isOpen,
  onClose,
  isLoading,
  children,
}) => {
  return isOpen ? (
    <div
      className="fixed inset-0 z-10 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
          onClick={() => !isLoading && onClose()}
        ></div>

        <span
          className="hidden sm:inline-block sm:h-screen sm:align-middle"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="relative inline-block transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-[467px] sm:p-6 sm:align-middle">
          {children}
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Modal;
