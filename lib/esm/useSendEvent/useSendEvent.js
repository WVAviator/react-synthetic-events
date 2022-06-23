var useSendEvent = function (event) {
    var sendEvent = function (payload) {
        var customEvent = new CustomEvent(event, { detail: payload });
        window.dispatchEvent(customEvent);
    };
    return sendEvent;
};
export default useSendEvent;
