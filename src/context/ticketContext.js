import { createContext, useReducer } from "react";

export const TicketContext = createContext();
export const UpdateContext = createContext();

const myGlobalValue = {
  ticketList: [],
  vipTicket: "",
  basicTicket: "",
  tent2: "",
  tent3: "",
  area: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  zipCode: "",
  country: "",
  checkbox: false,
};
console.log(myGlobalValue);

export function reducer(state, action) {
  switch (action.action) {
    case "ADD_TO_BASKET":
      const updatedTicketList = [
        ...state.ticketList,
        {
          basicTicket: action.payload.basicTicket,
          vipTicket: action.payload.vipTicket,
        },
      ];
      console.log(updatedTicketList); // Log the updated ticketList array
      return {
        ...state,
        ticketList: updatedTicketList,
      };
    default:
      return state;
  }
}

export const TicketProvider = ({ children }) => {
  const [ticketInfo, setTicketInfo] = useReducer(reducer, myGlobalValue);

  console.log(ticketInfo.ticketList);

  return (
    <TicketContext.Provider value={ticketInfo.ticketList}>
      <UpdateContext.Provider value={setTicketInfo}>{children}</UpdateContext.Provider>
    </TicketContext.Provider>
  );
};
