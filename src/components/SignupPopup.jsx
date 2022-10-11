import React from "react";
import { Popup, PopupInner } from "../styles/Popup.styled";
import { AiOutlineClose } from "react-icons/ai";

export const SignupPopup = (props) => {
  return props.trigger ? (
    <Popup>
      <PopupInner>
        <AiOutlineClose
          className="btn-close"
          size={35}
          onClick={() => props.setTrigger(false)}
        />
        {props.children}
      </PopupInner>
    </Popup>
  ) : (
    ""
  );
};
