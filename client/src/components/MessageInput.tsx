import { Paperclip, Plus, Send } from "lucide-react";
import { useState } from "react";

const MessageInput = ({ onSend }: { onSend: (text: string) => void }) => {
    const [messageOutput, setMessageOutput] = useState<string>("");

    return (
        <div className="flex w-full items-center gap-2 rounded-2xl border border-white/10 bg-[#17171b] p-2 shadow-[0_16px_40px_rgba(0,0,0,0.28)]">
            <button
                type="button"
                aria-label="Add an attachment"
                className="grid size-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/4 text-slate-400 transition hover:border-[#ff6480]/50 hover:bg-[#ff6480]/10 hover:text-[#ff8aa1] focus:outline-none focus:ring-2 focus:ring-[#ff6480]/50"
            >
                <Plus size={19} strokeWidth={2.2} />
            </button>
            <div className="relative flex min-w-0 flex-1 items-center">
                <input
                    type="text"
                    placeholder="Write a message..."
                    value={messageOutput}
                    onChange={(e) => setMessageOutput(e.target.value)}
                    aria-label="Message"
                    className="w-full bg-transparent px-2 py-2 text-sm text-slate-100 outline-none placeholder:text-slate-500"
                />
                <button
                    type="button"
                    aria-label="Add an attachment"
                    className="mr-1 grid size-8 shrink-0 place-items-center rounded-lg text-slate-500 transition hover:bg-[#ff6480]/10 hover:text-[#ff8aa1] focus:outline-none focus:ring-2 focus:ring-[#ff6480]/50"
                >
                    <Paperclip size={17} />
                </button>
            </div>
            <button
                type="button"
                aria-label="Send message"
                onClick={() => onSend(messageOutput)}
                className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#ff6480] text-white shadow-lg shadow-[#ff6480]/20 transition hover:-translate-y-0.5 hover:bg-[#ff4d6d] focus:outline-none focus:ring-2 focus:ring-[#ff6480]/60"
            >
                <Send size={17} fill="currentColor" />
            </button>
        </div>
    );
};

export default MessageInput;
