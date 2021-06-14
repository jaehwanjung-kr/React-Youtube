import Axios from "axios";
import React, { useEffect, useState } from "react";

function Subscribe(props) {
  const [SubscribeNumber, setSubscribeNumber] = useState(0);
  const [Subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    let variable = { userTo: props.userTo };

    Axios.post("/api/subscribe/subscribeNumber", variable).then((response) => {
      if (response.data.success) {
        setSubscribeNumber(response.data.subscribeNumber);
      } else {
        alert("구독자 수 정보를 받아오지 못했음");
      }
    });

    let subscribedVariable = {
      userTo: props.userTo,
      userFrom: localStorage.getItem("userId"),
    };

    Axios.post("/api/subscribe/subscribed", subscribedVariable).then(
      (response) => {
        if (response.data.success) {
          setSubscribed(response.data.subscribed);
        } else {
          alert("정보 받아오지 못함");
        }
      }
    );
  }, []);

  const onSubscribe = () => {
    let subscribeVarialbe = {
      userTo: props.userTo,
      userFrom: props.userFrom,
    };
    // 이미 구독중이라면
    if (Subscribed) {
      Axios.post("/api/subscribe/unSubscribe", subscribeVarialbe).then(
        (response) => {
          if (response.data.success) {
          } else {
            alert("구독 취소하는데에 실패");
          }
        }
      );

      // 아직 구독 중이 아니라면
    } else {
      Axios.post("/api/subscribe/subsribe", subscribeVarialbe).then(
        (response) => {
          if (response.data.success) {
          } else {
            alert("구독 하는데에 실패");
          }
        }
      );
    }
  };
  return (
    <div>
      <button
        style={{
          backgroundColor: `${Subscribe ? "#CC0000" : "#AAAAAA"}`,
          borderRadius: "4px",
          color: "white",
          padding: "10px 16px",
          fontWeight: "500",
          fontSize: "1rem",
          textTransform: "uppercase",
        }}
        onClick={onSubscribe}
      >
        {SubscribeNumber} {Subscribed ? "Subscribed" : "Subscribe"}
      </button>
    </div>
  );
}

export default Subscribe;
