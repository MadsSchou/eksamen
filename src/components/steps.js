import { ConfigProvider, Steps } from "antd";
import {
  ShakeOutlined,
  HomeOutlined,
  ProfileOutlined,
  CreditCardOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

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
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#F5C065",
          },
        }}
      >
        <Steps
          size="default"
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
            {
              title: "Confirmation",
              status: checkStatus(4),
              icon: <CheckCircleOutlined />,
            },
          ]}
        />
      </ConfigProvider>
    </>
  );
}
