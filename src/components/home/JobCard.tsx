import React, { useState } from "react";
import { Clock, Location } from "../icons";
import Modal from "../shared/Modal";

interface IJobCard {
  title: string;
  wage: string;
  description: string;
  location: string;
  createdAt: string;
}

const JobCard: React.FC<IJobCard> = ({
  title,
  wage,
  description,
  location,
  createdAt,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full rounded-[10px] border border-[#F3F4F6] bg-white px-4 py-6 lg:max-w-[388px]"
      >
        <div className="flex justify-between ">
          <p className="font-semibold text-[#374151] lg:text-lg">{title}</p>
          <p className="text-xs text-[#B45309] lg:text-lg">
            £{wage}
            <span className="text-[#4B5563] lg:text-xs">/hr</span>
          </p>
        </div>

        <div className="mt-2 pb-12">
          <p className="text-xs text-[#4B5563] lg:text-sm">{description}</p>
        </div>

        <div className="flex gap-2">
          <div className="flex items-center gap-1 rounded-[7px] bg-[#F3F4F6] px-[8px] py-[6px] text-[#374151]">
            <Location />
            <p className="text-[10px]">{location}</p>
          </div>

          <div className="flex items-center gap-1 rounded-[7px] bg-[#F3F4F6] px-[8px] py-[6px] text-[#374151]">
            <Clock />
            <p className="text-[10px]">{createdAt}</p>
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(!isOpen)}>
        <div>
          <div className=" ">
            <h3
              className="text-lg font-medium leading-6 text-[#0B131D]"
              id="modal-title"
            >
              Job Details
            </h3>

            <div className="mt-5 rounded-[10px] bg-[#F3F4F6] p-3">
              <div className="flex justify-between ">
                <p className="font-semibold text-[#374151] lg:text-lg">
                  {title}
                </p>
                <p className="text-xs text-[#B45309] lg:text-lg">
                  £{wage}
                  <span className="text-[#4B5563] lg:text-xs">/hr</span>
                </p>
              </div>

              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Consequatur amet labore.
                </p>
              </div>

              <div className="mt-9 flex gap-2">
                <div className="flex items-center gap-1 rounded-[7px] bg-[#E5E7EB] px-[8px] py-[6px] text-[#374151]">
                  <Location />
                  <p className="text-[10px]">{location}</p>
                </div>

                <div className="flex items-center gap-1 rounded-[7px] bg-[#E5E7EB] px-[8px] py-[6px] text-[#374151]">
                  <Clock />
                  <p className="text-[10px]">{createdAt}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 flex items-center justify-end gap-4 sm:mt-6">
          <button
            onClick={() => setIsOpen(false)}
            className="border border-[#1F2937] px-3 py-2.5 text-[#1F2937]"
          >
            Cancel
          </button>
          <button className="bg-[#D97706] px-3 py-2.5 text-white">
            I&apos;m interested
          </button>
        </div>
      </Modal>
    </>
  );
};

export default JobCard;
