import React from "react";

function Area(props) {
  return (
    <div>
      <p>
        Der er {props.available} pladser ledige i {props.area}
      </p>
    </div>
  );
}

export default Area;
