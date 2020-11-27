import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import api from '../../../services/api';
import { useAuth } from '../../../contexts/auth';
import { GiftedChat } from "react-native-gifted-chat";

const Reply = () => {

  const { params } = useRoute();
  const { comment } = params;
  const { forum_id } = params;

  const { token } = useAuth();
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [replies, setReplies] = useState([]);
  const [newMessage, setNewMessage] = useState({})
  const [loading, setLoading] = useState(false);
  const [lastMessage, setLastMessage] = useState(0);

  const [socket, setSocket] = useState(io(`http://26.57.205.136:3333/comment`));

  useEffect(() => {
    socket.emit('join comment', { idRoom: `${forum_id}-${comment._id}` })
    socket.on('new message', message => setNewMessage(message));
  }, [socket]);

  useEffect(() => {
    if (newMessage.reply_id == undefined) {
      return;
    }

    async function handleNewMessage() {
      setTotal(prevTotal => prevTotal += 1);

      let message = {
        _id: newMessage.reply_id,
        text: newMessage.reply_content,
        createdAt: newMessage.publi_date,
        user: {
          _id: newMessage.user_id.user_id,
          name: newMessage.user_id.username,
          avatar: newMessage.user_id.user_img_id.img_url
        }
      }
      setReplies(prevReplies => [message, ...prevReplies]);
    };

    handleNewMessage();
  }, [newMessage]);

  useEffect(() => {

    async function getContent() {

      await loadReplies();
      //lógica do like
    }
    if (replies.length == 0)
      getContent()
  }, []);

  async function loadReplies() {

    if (loading) {
      return;
    }

    if (total > 0 && replies.length == total) {
      return;
    }

    setLoading(true);

    const response = await api.get(`comment/${comment._id}/reply?page=${page}&lastMessage=${lastMessage}`);
    setTotal(response.headers['x-total-count']);
    setPage(page + 1);

    let earlierReplies = response.data.map((reply) => (
      {
        _id: reply.reply_id,
        text: reply.reply_content,
        createdAt: reply.publi_date,
        user: {
          _id: reply.user_id.user_id,
          name: reply.user_id.username,
          avatar: reply.user_id.user_img_id.img_url
        }
      }
    ));

    if(lastMessage == 0)
      setLastMessage(earlierReplies[0]._id);

    setReplies(prevReplies => [...prevReplies, ...earlierReplies]);
    setLoading(false);
  };

  async function sendReply(message) {
    await api.post(
      `/comment/${comment._id}/reply?forum=${forum_id}`,
      { reply_content: message.text },
      {
        headers: {
          Authorization: token
        }
      }
    )
  }

  async function handleSetLiked() {
    //lógica para registrar o like
  }
  return (
    <GiftedChat
      messages={replies}
      user={{
        _id: 35
      }}
      onSend={(props) => sendReply(props[0])}
      infiniteScroll
      loadEarlier
      onLoadEarlier={loadReplies}
    />
  )
}

export default Reply;