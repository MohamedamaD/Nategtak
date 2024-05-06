import React, { useState } from "react";
import { BiCheck, BiX } from "react-icons/bi";
import { motion } from "framer-motion";
import "./Popup.css";
export const Popup = ({ props }) => {
  const [isClose, setIsClose] = useState(false);
  return (
    <motion.div
      className="__popup"
      animate={isClose ? { x: "100%", opacity: 0 } : { opacity: [0, 1] }}
      transition={{ ease: "easeInOut", duration: 1 }}
    >
      <div className="__popup__card">
        <div className="__popup__card__body">
          {props.popup.isSuccess ? (
            <BiCheck size={60} color="darkgreen" />
          ) : (
            <BiX size={60} color="#c32e2e" />
          )}
          <div className="my-4 text-center">
            <h1>{props.popup.value}</h1>
            <p>{props.popup.paragraph}</p>
          </div>
          <button
            className="btn btn-primary w-50"
            onClick={() => {
              setIsClose(true);
              props.setPopup({
                isActive: false,
              });
            }}
          >
            close
          </button>
        </div>
      </div>
    </motion.div>
  );
};
