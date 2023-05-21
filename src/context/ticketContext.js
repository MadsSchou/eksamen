import { createContext, useReducer } from "react";

export const StoreContext = createContext();
export const DispatchContext = createContext();

const myGlobalValue = {
  basket: [],
};

console.log(myGlobalValue);

export function reducer(state, action) {
  console.log(state, action);
  switch (action.action) {
    case "ADD_TO_BASKET":
      const exists = state.basket.find((item) => item.id === action.payload.id);
      if (exists) {
        //Map creates a new array
        const nextBasket = state.basket.map((item) => {
          if (item.id == action.payload.id) {
            //found it
            //take the original array and spead it
            const copy = { ...item };
            copy.amount++;
            return copy;
          } else {
            return item;
          }
        });
        //Efterligner min basket
        return { ...state, basket: nextBasket };
      } else {
        const newItem = action.payload;
        //Amount property
        newItem.amount = 1;
        return { ...state, basket: state.basket.concat(newItem) };
      }
  }
  // Hvad skal den her?
  return [];
}

export const TicketProvider = ({ children }) => {
  const [data, dispatch] = useReducer(reducer, myGlobalValue);

  return (
    <StoreContext.Provider value={data}>
      <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
    </StoreContext.Provider>
  );
};
