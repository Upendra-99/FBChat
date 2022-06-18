import React, { useState } from "react";
import {
  FiletypeGif,
  EmojiSmile,
  Camera,
  HandThumbsUpFill,
  Controller,
} from "react-bootstrap-icons";
import { IoSend } from "react-icons/io5";
import styles from "./FBChat.module.css";

const FacebookChat = () => {
  const initialFormState = { id: null, name: "", status: false };
  const [showgif, setShowGif] = useState(false);
  const [chat, setChat] = useState(initialFormState);
  const [chats, setChats] = useState([]);
  const [gifdata, setGifData] = useState([]);
  const [gifInInput, setGifInInput] = useState("");

  const handleChange = (e) => {
    setChat({
      id: chats.length + 1,
      name: e.target.value,
      status: false,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!chat.name) {
      alert("Type a message");
      return;
    } else {
      setChats([...chats, chat]);
      setChat(initialFormState);
    }
  };

  const handleGifSubmit = (e) => {
    e.preventDefault();

    console.log("chat", e.target)

    if (gifInInput) {
      let payload = {
        id: chats.length + 1,
        url: e.target.value,
      }
      setChats([...chats, payload]);
    } else {
      alert("Choose a Giphy");
      return;
    }
    // console.log("chat", chats) 

  };

  async function searchMovies(movie_name) {
    try {
      let res = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=Nk9jbCQyUYyoducTJRrbQNgp26VTQlA4&q=${movie_name}&limit=25&offset=0&rating=g&lang=en`
      );
      let data = await res.json();
      // console.log(data.data.images);
      setGifData(data.data)
      return data.data;
    } catch (e) {
      console.log("e", e);
    }
  }
  var timerID;

  function debounce(func, time) {
    // func are our main function nnow
    if (timerID) {
      clearTimeout(timerID);
    }

    timerID = setTimeout(function () {
      func();
    }, time);
  }
  function returnPromises() {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Promise Executed...");
        resolve("Sample Data");
      }, 3000);
    });
  }

  async function ExecuteFunction() {
    var getData = await returnPromises();
    console.log(getData);
  }

  async function main() {
    let name = document.getElementById("gif").value;
    let res = await searchMovies(name);
    console.log("res", res);
  }


  function onGifSend(x) {
    var t = x.target.src;
    var m = {
      id: chats.length + 1,
      name: "",
      url: t,
    };
    setChats([...chats, m]);
    setChat(initialFormState);
    setShowGif(!showgif);
  }

  ExecuteFunction();

  return (
    <div>
      <div className={styles.Container}>
        <div className={styles.Chatbox}>
          <div className={styles.messagebox}>
            {chats.reverse().map((item) => {
              if (!item.name.length) {
                return <img className={styles.chatimggif} src={item.url} alt="" />;
              } else {
                return <div className={styles.message}>{item.name}</div>;
              }
            })}
          </div>
          <div className={styles.input_group}>
            {showgif ? (
              <form onSubmit={handleGifSubmit}>
                <input
                  id="gif"
                  type="text"
                  className={styles.form_control}
                  placeholder="Serach a GIF"
                  onInput={(e) => debounce(main, 1000)}
                />
                <button
                  className={`${styles.btn} ${styles.btn_outline_secondary}`}
                  type="submit"
                >
                  <IoSend />
                </button>
              </form>
            ) : (
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  className={styles.form_control}
                  placeholder="Type a message..."
                  onChange={(e) => handleChange(e)}
                  value={chat.name}
                />
                <img src="'https://giphy.com/gifs/sideonedummy-microwave-vomit-sideonedummy-records-3o6Zt3Gp2GpmxnLfJ6'" alt="" />

                <button
                  className={`${styles.btn} ${styles.btn_outline_secondary}`}
                  type="submit"
                >
                  <IoSend />
                </button>
              </form>
            )}

            <div className={styles.icons_container}>
              <div className={styles.icons_box}>
                <FiletypeGif
                  onClick={() => setShowGif(!showgif)}
                  className={styles.icons}
                />
                <EmojiSmile className={styles.icons} />
                <Controller className={styles.icons} />
                <Camera className={styles.icons} />
              </div>
              <div className={styles.thumsup_box}>
                <HandThumbsUpFill className={styles.thums_up} />
              </div>
            </div>
          </div>

        </div>
        <div className={styles.Inputbox}></div>
        <div className={styles.gifs_box}>
          {gifdata.map((gif) => {
            return (
              <img
                onClick={(e) => onGifSend(e)}
                className={styles.gifimg}
                src={gif.images.original.url}
                alt=""
              />
            );
          })}
        </div>
      </div>

    </div>

  );
};

export default FacebookChat;
