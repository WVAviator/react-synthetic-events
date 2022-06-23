declare const useReceiveEvent: <E extends Event>(event: string, callback: (payload: E) => void) => void;
export default useReceiveEvent;
