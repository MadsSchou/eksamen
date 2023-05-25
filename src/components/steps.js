import { Steps } from "antd";
import { ShakeOutlined, HomeOutlined, ProfileOutlined, CreditCardOutlined } from "@ant-design/icons";

export default function Flow(props) {
  function checkStatus(val) {
    if (val < props.step) {
      return "finish";
    } else if (val === props.step) {
      return "process";
    } else if (val > props.step) {
      return "wait";
    }
  }
  return (
    <>
      <Steps
        style={{ paddingInline: 180, paddingTop: 50 }}
        size="small"
        direction="horizontal"
        responsive="true"
        items={[
          {
            title: "Billettype",
            status: checkStatus(0),
            icon: <ShakeOutlined />,
          },
          {
            title: "Camp Område",
            status: checkStatus(1),
            icon: <HomeOutlined />,
          },
          {
            title: "Personlig info",
            status: checkStatus(2),
            icon: <ProfileOutlined />,
          },
          {
            title: "Checkout",
            status: checkStatus(3),
            icon: <CreditCardOutlined />,
          },
        ]}
      />
    </>
  );
}
