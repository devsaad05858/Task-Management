import { useLanguage } from "@/components/languageSwitcher/languageContext";
import React, { useState } from "react";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

const Input = ({
  id,
  className,
  icon: Icon,
  padding,
  errors,
  title,
  name,
  type,
  placeHolder,
  important,
  onChange,
  value,
  width,
  ...props
}) => {
  const [isShown, setShow] = useState(false);
  const { direction } = useLanguage();

  return (
    <label
      htmlFor={"input-box--" + (id ?? name)}
      className={`flex flex-col gap-y-1 ${
        width ? width : "w-full"
      } ${"text-black"}`}
    >
      <p className="flex gap-1 text-lg font-semibold">
        {title} {important && <span className="text-red-600">*</span>}
      </p>
      <div className="relative">
        <input
          {...props}
          onChange={onChange}
          value={value}
          placeholder={`${placeHolder}`}
          type={type === "password" && !isShown ? "password" : "text"}
          className={`${padding} outline-none transition-all duration-300 ${
            errors ? "" : "text-grayColor border-grayColor"
          } ${Icon ? "pl-12" : "pl-4"} ${className}`}
          id={"input-box--" + (id ?? name)}
        />
        {Icon && (
          <span className="absolute left-0 grid h-[49px] w-[49px] place-items-center max-sm:translate-y-[-48px] sm:-top-[2px]">
            <Icon className="h-[25px] w-[25px] " />
          </span>
        )}
        {type === "password" && (
          <span
            className={`absolute ${
              direction === "ltr" ? "right-0" : "left-0"
            } top-[1px] grid h-[60px] w-[49px] cursor-pointer place-items-center md:-top-[1px] `}
            onClick={() => setShow((prev) => !prev)}
          >
            {isShown ? (
              <HiOutlineEye className="lg:text-xl" />
            ) : (
              <HiOutlineEyeOff className="lg:text-xl" />
            )}
          </span>
        )}
      </div>
      {errors && <span className="mt-1 text-xs text-red-600">{errors}</span>}
    </label>
  );
};

export default Input;
