import { useEffect, useState } from "react";

interface Message {
  id: string;
  content: string;
  user_id: string;
  // Add other relevant fields if necessary
}

const fetchRoomData = async (
  room_id: string
): Promise<Message[] | undefined> => {
  if (!room_id) return;
  const url = `http://localhost:8080/conversations/${room_id}`;
  try {
    let resp = await fetch(url).then((res) => res.json());
    return resp;
  } catch (e) {
    console.log(e);
  }
};

export default function useConversations(
  room_id: string
): [
  boolean,
  Message[],
  React.Dispatch<React.SetStateAction<Message[]>>,
  (id: string) => void
] {
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);

  const updateMessages = (resp: Message[] = []) => {
    setIsLoading(false);
    setMessages(resp);
  };

  const fetchConversations = (id: string) => {
    setIsLoading(true);
    fetchRoomData(id).then(updateMessages);
  };

  useEffect(() => {
    fetchConversations(room_id);
  }, [room_id]);

  return [isLoading, messages, setMessages, fetchConversations];
}
