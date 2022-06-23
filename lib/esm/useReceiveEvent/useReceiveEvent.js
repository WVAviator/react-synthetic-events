import { useEffect } from "react";
var useReceiveEvent = function (event, callback) {
    useEffect(function () {
        window.addEventListener(event, callback);
        return function () {
            window.removeEventListener(event, callback);
        };
    });
};
export default useReceiveEvent;
