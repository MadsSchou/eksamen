import React from "react";
import { Steps } from "antd";
import { ShakeOutlined, ProfileOutlined, CreditCardOutlined, HomeOutlined } from "@ant-design/icons";
import { useState } from "react";

function flow() {
  const [current, setCurrent] = useState(0);
  return (
    <>
      <Steps onChange={setCurrent} current={current} className="steps">
        <Steps.step title="Billettype" icon={<ShakeOutlined />} />
        <Steps.step title="Camp Område " icon={<HomeOutlined />} />
        <Steps.step title="Personlig Info" icon={<ProfileOutlined />} />
        <Steps.step title="CheckOut" icon={<CreditCardOutlined />} />
      </Steps>
    </>
  );
}

export default flow;

//Ændre farve
// .ant-steps-item-process .ant-steps-item-icon {
//     background: #46b3cb !important;
// }
