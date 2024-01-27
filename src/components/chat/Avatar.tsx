import React from "react";

interface IAvatar {
  initials: string;
}

const Avatar: React.FC<IAvatar> = ({ initials }) => {
  return (
    <div className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-[#4F46E5]">
      <p className="text-[11px] text-white">{initials}</p>
    </div>
  );
};

export default Avatar;
