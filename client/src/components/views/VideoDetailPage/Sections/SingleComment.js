import React, { useState } from "react";
import { Comment, Avatar, Button, Input } from "antd";
import Axios from "axios";
import { useSelector } from "react-redux";
import LikeDislikes from "./LikeDislikes";

const { TextArea } = Input;

function SingleComment(props) {
  const user = useSelector((state) => state.user);
  const [OpenReply, setOpenReply] = useState(false);
  const [CommentValue, setCommentValue] = useState("");
  const onClickReplyOpen = () => {
    setOpenReply(!OpenReply);
  };

  const onHandleChange = (event) => {
    setCommentValue(event.currentTarget.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const variables = {
      content: CommentValue,
      writer: user.userData._id,
      postId: props.postId,
      responseTo: props.comment._id,
    };

    Axios.post("/api/comment/saveComment", variables).then((response) => {
      if (response.data.success) {
        setCommentValue("");
        setOpenReply(!OpenReply);
        props.refreshFunction(response.data.result);
      } else {
        alert(" 코멘트 저장에 실패");
      }
    });
  };

  const actions = [
    <LikeDislikes
      userId={localStorage.getItem("userId")}
      commentId={props.comment._id}
    />,
    <span onClick={onClickReplyOpen} key="comment-basic-reply-to">
      Reply to
    </span>,
  ];
  return (
    <div>
      <Comment
        actions={actions}
        author={props.comment.writer.name}
        avatar={<Avatar src={props.comment.writer.image} alt="image" />}
        content={<p>{props.comment.content}</p>}
      ></Comment>

      {OpenReply && (
        <form style={{ display: "flex" }} onSubmit={onSubmit}>
          <TextArea
            style={{ width: "100%", borderRadius: "5px" }}
            onChange={onHandleChange}
            value={CommentValue}
            placeholder="코멘트를 입력하세요"
          />
          <br />
          <Button style={{ width: "20%", height: "52px" }} onClick={onSubmit}>
            Submit
          </Button>
        </form>
      )}
    </div>
  );
}

export default SingleComment;
