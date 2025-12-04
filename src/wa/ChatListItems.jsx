import { getStrDate } from "../xtra/dates";

const ChatListItems = ({ name, number, lastMessage, time, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex items-center justify-between px-4 py-3 border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
    >
      {/* Left side: name + last message */}
      <div className="flex-1">
        <div className="font-medium text-gray-900">
          {name || number}
        </div>

        <div className="text-sm text-gray-500 truncate max-w-[80%]">
          {lastMessage}
        </div>
      </div>

      {/* Right side: time */}
      <div className="ml-4 text-xs text-gray-500 whitespace-nowrap">
        {getStrDate(time)}
      </div>
    </div>
  );
};

export default ChatListItems;
