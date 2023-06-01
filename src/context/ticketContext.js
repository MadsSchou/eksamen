import { createContext, useReducer } from "react";
import Timer from "@/components/Timer/timer";

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
  timer: 0,
};

//Vi definere en reducer function med et to parametre: state og action
export function reducer(state, action) {
  // (switch state operator med cases
  // Tjekker hvilken action some bliver dispatched - actionType have været mere beskrivende.
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
    case "SET_RESERVATION_ID":
      return {
        ...state,
        resid: action.payload,
      };
    case "ADD_TO_BASKET":
      // Tager vores nuværende state og laver en kopi ved brug af spread operator
      const copy = { ...state };
      // Pluser 1 til kurv
      copy[action.payload.key]++;
      console.log(state, action);
      // returner det opdateret antal til kurven
      return copy;

    case "SET_AREA":
      const copy2 = { ...state };
      copy2.area = action.payload.area;
      copy2.greenCamping = action.payload.greenCamping;
      console.log(state, action);
      return copy2;

    case "SET_TIMER":
      return {
        ...state,
        timer: action.payload,
      };

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
