import React from "react";
import { useNotification } from "./NotificationProvider";
export { useNotification };

export const handleNewNotification = (dispatch, messege = "", state = 200) => {
    let tipoerror = "";

    switch (state) {
        case 200:
                tipoerror = "SUCCESS";
            break;
        case 404:
                tipoerror = "ERROR";
            break;

        default:
                tipoerror = "ERROR";
            break;
    }

    dispatch({
      type: tipoerror,
      message: messege,
      title: "Successful Request"
    })
}