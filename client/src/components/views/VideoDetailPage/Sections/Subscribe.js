import Axios from "axios";
import React, { useEffect, useState } from "react";

function Subscribe(props) {
  const userTo = props.userTo;
  const userFrom = props.userFrom;

  const [SubscribeNumber, setSubscribeNumber] = useState(0);
  const [Subscribed, setSubscribed] = useState(false);

  const onSubscribe = () => {
    let subscribeVariable = {
      userTo: userTo,
      userFrom: userFrom,
    };
    // 이미 구독중이라면
    if (Subscribed) {
      Axios.post("/api/subscribe/unSubscribe", subscribeVariable).then(
        (response) => {
          if (response.data.success) {
            setSubscribeNumber(SubscribeNumber - 1);
            setSubscribed(!Subscribed);
          } else {
            alert("구독 취소하는데에 실패");
          }
        }
      );

      // 아직 구독 중이 아니라면
    } else {
      Axios.post("/api/subscribe/subscribe", subscribeVariable).then(
        (response) => {
          if (response.data.success) {
            setSubscribeNumber(SubscribeNumber + 1);
            setSubscribed(!Subscribed);
          } else {
            alert("구독 하는데에 실패");
          }
        }
      );
    }
  };

  useEffect(() => {
    const subscribeNumberVariable = {
      userTo: userTo,
      userFrom: userFrom,
    };

    Axios.post("/api/subscribe/subscribeNumber", subscribeNumberVariable).then(
      (response) => {
        if (response.data.success) {
          setSubscribeNumber(response.data.subscribeNumber);
        } else {
          alert("구독자 수 정보를 받아오지 못했음");
        }
      }
    );

    Axios.post("/api/subscribe/subscribed", subscribeNumberVariable).then(
      (response) => {
        if (response.data.success) {
          setSubscribed(response.data.subscribed);
        } else {
          alert("정보 받아오지 못함");
        }
      }
    );
  }, []);

  return (
    <div>
      <button
        onClick={onSubscribe}
        style={{
          backgroundColor: `${Subscribed ? "#AAAAAA" : "#CC0000"}`,
          borderRadius: "4px",
          color: "white",
          padding: "10px 16px",
          fontWeight: "500",
          fontSize: "1rem",
          textTransform: "uppercase",
        }}
      >
        {SubscribeNumber} {Subscribed ? "Subscribed" : "Subscribe"}
      </button>
    </div>
  );
}

export default Subscribe;
