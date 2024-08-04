"use client";

import Avatar from "@/components/avatar";
import Conversation from "@/components/conversation";
import Login from "@/components/login";
import ChatList from "@/components/room";
import useConversations from "@/libs/useConversation";
import useLocalStorage from "@/libs/useLocalStorage";
import useWebsocket from "@/libs/websocket";
import Head from "next/head";
import { useEffect, useState, FormEvent } from "react";

interface MessageData {
  id: string;
  content: string;
  user_id: string;
}

interface Users {
  [key: string]: string;
  get_target_user: (id: string) => string;
}

interface Room {
  id: string;
  users: Users;
}

interface User {
  id: string;
}

const Home: React.FC = () => {
  const [room, setSelectedRoom] = useState<Room | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [showLogIn, setShowLogIn] = useState(false);
  const [auth, setAuthUser] = useLocalStorage<User | false>("user", false);
  const [isLoading, messages, setMessages, fetchConversations] =
    useConversations("");

  const handleTyping = (mode: string) => {
    setIsTyping(mode === "IN");
  };

  const handleMessage = (msg: string, userId: string) => {
    setMessages((prev: MessageData[]) => {
      const item = { id: "", content: msg, user_id: userId }; // Assuming id is generated elsewhere
      return [...prev, item];
    });
  };

  const onMessage = (data: string) => {
    try {
      const messageData = JSON.parse(data);
      switch (messageData.chat_type) {
        case "TYPING":
          handleTyping(messageData.value[0]);
          break;
        case "TEXT":
          handleMessage(messageData.value[0], messageData.user_id);
          break;
        default:
          break;
      }
    } catch (e) {
      console.log(e);
    }
  };

  const sendMessage = useWebsocket(onMessage);

  const updateFocus = () => {
    if (!room || !auth || typeof auth === "boolean") return;
    const data = {
      id: 0,
      chat_type: "TYPING",
      value: ["IN"],
      room_id: room.id,
      user_id: auth.id,
    };
    sendMessage(JSON.stringify(data));
  };

  const onFocusChange = () => {
    if (!room || !auth || typeof auth === "boolean") return;
    const data = {
      id: 0,
      chat_type: "TYPING",
      value: ["OUT"],
      room_id: room.id,
      user_id: auth.id,
    };
    sendMessage(JSON.stringify(data));
  };

  const submitMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!room || !auth || typeof auth === "boolean") return;

    const message = (e.target as any).message.value;
    if (message === "") {
      return;
    }
    if (!room.id) {
      alert("Please select chat room!");
      return;
    }
    const data = {
      id: 0,
      chat_type: "TEXT",
      value: [message],
      room_id: room.id,
      user_id: auth.id,
    };
    sendMessage(JSON.stringify(data));
    (e.target as any).message.value = "";
    handleMessage(message, auth.id);
    onFocusChange();
  };

  const updateMessages = (data: Room) => {
    if (!data.id) return;
    fetchConversations(data.id);
    setSelectedRoom(data);
  };

  const signOut = () => {
    window.localStorage.removeItem("user");
    setAuthUser(false);
  };

  useEffect(() => setShowLogIn(!auth), [auth]);

  return (
    <div>
      <Head>
        <title>Rust with react chat app</title>
        <meta name="description" content="Rust with react chat app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Login show={showLogIn} setAuth={setAuthUser} />
      <div
        className={`${
          !auth && "hidden"
        } bg-gradient-to-b from-orange-400 to-rose-400 h-screen p-12`}
      >
        <main className="flex w-full max-w-[1020px] h-[700px] mx-auto bg-[#FAF9FE] rounded-[25px] backdrop-opacity-30 opacity-95">
          <aside className="bg-[#F0EEF5] w-[325px] h-[700px] rounded-l-[25px] p-4 overflow-auto relative">
            {auth && typeof auth !== "boolean" && (
              <ChatList onChatChange={updateMessages} userId={auth.id} />
            )}
            <button
              onClick={signOut}
              className="text-xs w-full max-w-[295px] p-3 rounded-[10px] bg-violet-200 font-semibold text-violet-600 text-center absolute bottom-4"
            >
              LOG OUT
            </button>
          </aside>
          {room?.id && auth && typeof auth !== "boolean" && (
            <section className="rounded-r-[25px] w-full max-w-[690px] grid grid-rows-[80px_minmax(450px,_1fr)_65px]">
              <div className="rounded-tr-[25px] w-full">
                <div className="flex gap-3 p-3 items-center">
                  <Avatar color="rgb(245 158 11)">
                    {room.users.get_target_user(auth.id)}
                  </Avatar>
                  <div>
                    <p className="font-semibold text-gray-600 text-base">
                      {room.users.get_target_user(auth.id)}
                    </p>
                    <div className="text-xs text-gray-400">
                      {isTyping ? "Typing..." : "10:15 AM"}
                    </div>
                  </div>
                </div>
                <hr className="bg-[#F0EEF5]" />
              </div>
              {isLoading && room.id && (
                <p className="px-4 text-slate-500">Loading conversation...</p>
              )}
              <Conversation data={messages} auth={auth} users={room.users} />
              <div className="w-full">
                <form
                  onSubmit={submitMessage}
                  className="flex gap-2 items-center rounded-full border border-violet-500 bg-violet-200 p-1 m-2"
                >
                  <input
                    onBlur={onFocusChange}
                    onFocus={updateFocus}
                    name="message"
                    className="p- text-black placeholder-gray-600 text-sm w-full rounded-full bg-violet-200 focus:outline-none"
                    placeholder="Type your message here..."
                  />
                  <button
                    type="submit"
                    className="bg-violet-500 rounded-full py-2 px-6 font-semibold text-white text-sm"
                  >
                    Sent
                  </button>
                </form>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default Home;
