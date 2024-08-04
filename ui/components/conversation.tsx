import React, { useEffect, useRef } from "react";
import Avatar from "./avatar";

interface ConversationItemProps {
  right: boolean;
  content: string;
  username: string;
}

function ConversationItem({ right, content, username }: ConversationItemProps) {
  if (right) {
    return (
      <div className="w-full flex justify-end">
        <div className="flex gap-3 justify-end">
          <div className="max-w-[65%] bg-violet-500 p-3 text-sm rounded-xl rounded-br-none">
            <p className="text-white">{content}</p>
          </div>
          <div className="mt-auto">
            <Avatar>{username}</Avatar>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex gap-3 w-full">
      <div className="mt-auto">
        <Avatar color="rgb(245 158 11)">{username}</Avatar>
      </div>
      <div className="max-w-[65%] bg-gray-200 p-3 text-sm rounded-xl rounded-bl-none">
        <p>{content}</p>
      </div>
    </div>
  );
}

interface ConversationProps {
  data: Array<{
    id: string;
    user_id: string;
    content: string;
  }>;
  auth: {
    id: string;
  };
  users: Map<string, string>;
}

export default function Conversation({ data, auth, users }: ConversationProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollTo(0, ref.current.scrollHeight);
  }, [data]);

  return (
    <div className="p-4 space-y-4 overflow-auto" ref={ref}>
      {data.map((item) => (
        <ConversationItem
          right={item.user_id === auth.id}
          content={item.content}
          username={users.get(item.user_id) || "Unknown user"}
          key={item.id}
        />
      ))}
    </div>
  );
}
