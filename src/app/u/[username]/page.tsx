"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";

function pages() {
  const [message, setMessage] = useState("");
  const { data: session } = useSession();
  const [suggestMessages, setSugestMessages] = useState<string[]>([]);

  const suggestMessage = async () => {
    try {
      const res = await axios.post(`/api/suggest-messages`);
      const data = res.data && res.data.length ? res.data.split("||") : [];
      setSugestMessages(data);
    } catch (error) {
      console.log(error);
    } finally {
      const data =
        "What's a movie or book you could watch or read over and over again?||If you could instantly learn any new skill, what would it be?||What's a small, unexpected moment of kindness you've witnessed recently";
      console.log(data.split("||"));
      setSugestMessages(data.split("||"));
    }
  };

  const onSentMessage = async () => {
    try {
      const res = await axios.post(`/api/send-message`, {
        username: session?.user?.username,
        content: message,
      });
      if ((res.status = 200)) {
        toast("Message sent successfully!");
      }
    } catch (error) {
    } finally {
      setMessage("");
    }
  };
  return (
    <div
      className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 bg-white
      rounded w-full max-w-6xl "
    >
      <h1 className="text-4xl font-bold mb-4 text-center">
        Public Profile Link
      </h1>

      <div className="mb-4">
        <h2 className="text-sm font-semibold mb-2">
          Send Anonymous Message to @{session?.user?.username}
        </h2>
        <div className="text-center">
          <textarea
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            className="border rounded-sm w-full p-2 mr-2"
            rows={3}
            placeholder="Write your  anonymous message here"
          />
          <Button
            onClick={onSentMessage}
            className="cursor-pointer mt-4"
            disabled={!message}
          >
            Sent it
          </Button>
        </div>
      </div>
      <div>
        <div>
          <Button
            onClick={() => suggestMessage()}
            className="cursor-pointer mt-4 bg-gray-800 text-white"
          >
            Suggest Messages
          </Button>
          <p> Click on any messsage below to select it.</p>
        </div>
        <div className="mt-5 border p-3 rounded-sm">
          <h2 className="text-2xl font-bold mb-4">Messages</h2>
          <ul>
            {suggestMessages.map((message, index) => (
              <li
                key={index}
                onClick={(e) => setMessage(message)}
                className={`border rounded-sm p-2 mb-2 cursor-pointer hover:bg-gray-100 ${index % 2 !== 0 ? "bg-gray-100" : ""}`}
              >
                {message}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default pages;
