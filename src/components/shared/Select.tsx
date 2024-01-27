import React, { useEffect, useRef, useState } from "react";
import { SelectArrow } from "../icons";

interface ISelectOption {
  value: string;
  text: string;
}

export function getSelectDisplay(
  options: ISelectOption[],
  value?: string,
): string {
  return options.find((option) => option.value == value)?.text as string;
}

interface ISelect {
  options: ISelectOption[];
  containerClassName?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  initialValue?: string;
  removeBorder?: boolean;
  valueClassName?: string;
}

const Select: React.FC<ISelect> = ({
  options,
  containerClassName,
  onBlur,
  error,
  initialValue,
  onChange,
  removeBorder,
  valueClassName,
}) => {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [selectValue, setSelectValue] = useState(initialValue);

  useEffect(() => {
    if (contentRef.current) {
      if (isOpen) {
        contentRef.current.style.maxHeight = "220px";
        contentRef.current.style.overflow = "scroll";
        // contentRef.current.style.padding = "1rem";
      } else if (!isOpen && contentRef.current) {
        contentRef.current.style.maxHeight = 0 + "px";
        // contentRef.current.style.padding = "0rem";
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (clickCount > 1 && onBlur) {
      onBlur();
    }
  }, [clickCount]);

  useEffect(() => {
    if (selectValue != initialValue) {
      if (onChange) {
        onChange(selectValue as string);
      }
      if (onBlur) {
        onBlur();
      }
      setIsOpen(false);
    }
  }, [selectValue, error]);

  useEffect(() => {
    setSelectValue(initialValue);
  }, [initialValue]);

  return (
    <>
      <div className={`${containerClassName} relative z-10`}>
        <div
          aria-description="Select box"
          onClick={() => {
            setIsOpen(!isOpen);
            setClickCount(clickCount + 1);
          }}
          className={`flex cursor-pointer items-center justify-between gap-1 ${
            !removeBorder && "border"
          } ${
            error?.length ? "form-field-error " : "border-grey-mid"
          } px-3 py-3`}
        >
          <p className={`font-secondary ${valueClassName}`}>
            {getSelectDisplay(options, selectValue) ?? "Select Option"}
          </p>
          <SelectArrow
            className={` ${
              isOpen ? "rotate-180" : "rotate-0"
            } transition-all duration-300`}
          />
        </div>
        <div className="absolute left-0 top-full z-10 w-full bg-gray-100 ">
          <div
            ref={contentRef}
            className={` accordion-item-content z-100 bg-grey-light relative max-h-0 overflow-hidden`}
          >
            {options.map((option) => (
              <div
                onClick={() => {
                  setSelectValue(option.value);
                  setClickCount(clickCount + 1);
                }}
                key={option.value}
                className="custom-select-option"
              >
                <p>{option.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Select;
