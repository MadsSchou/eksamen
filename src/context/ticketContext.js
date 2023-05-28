import { createContext, useReducer } from "react";
import Timer from "@/components/timer";

export const StoreContext = createContext();
export const DispatchContext = createContext();

const myGlobalValue = {
  vipTicket: 0,
  basicTicket: 0,
  tent2: 0,
  tent3: 0,
  area: "",
  greenCamping: false,
  people: [],
};

export function reducer(state, action) {
  switch (action.action) {
    case "REMOVE_ONE_FROM_BASKET":
      const copyRemove = { ...state };
      copyRemove[action.payload.key]--;
      console.log(state, action);
      return copyRemove;

    case "ADD_PEOPLE":
      return {
        ...state,
        people: action.payload,
      };

    case "ADD_TO_BASKET":
      const copy = { ...state };
      copy[action.payload.key]++;
      console.log(state, action);
      return copy;

    case "SET_AREA":
      const copy2 = { ...state };
      copy2.area = action.payload.area;
      copy2.greenCamping = action.payload.greenCamping;
      console.log(state, action);
      return copy2;

    default:
      return state;
  }
}

export const TicketProvider = ({ children }) => {
  const [data, dispatch] = useReducer(reducer, myGlobalValue);

  return (
    <StoreContext.Provider value={data}>
      {/* <Timer /> */}
      <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
    </StoreContext.Provider>
  );
};
