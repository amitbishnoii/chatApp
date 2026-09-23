import { Paperclip, Plus, Send } from "lucide-react";

const MessageInput = () => {
    return (
        <div className="flex w-full items-center gap-2 rounded-2xl border border-white/10 bg-[#17171b] p-2 shadow-[0_16px_40px_rgba(0,0,0,0.28)]">
            <button
                type="button"
                aria-label="Add an attachment"
                className="grid size-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/4 text-slate-400 transition hover:border-indigo-300/30 hover:bg-indigo-500/15 hover:text-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400/50"
            >
                <Plus size={19} strokeWidth={2.2} />
            </button>
            <div className="relative flex min-w-0 flex-1 items-center">
                <input
                    type="text"
                    placeholder="Write a message..."
                    aria-label="Message"
                    className="w-full bg-transparent px-2 py-2 text-sm text-slate-100 outline-none placeholder:text-slate-500"
                />
                <button
                    type="button"
                    aria-label="Add an attachment"
                    className="mr-1 grid size-8 shrink-0 place-items-center rounded-lg text-slate-500 transition hover:bg-white/6 hover:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-400/50"
                >
                    <Paperclip size={17} />
                </button>
            </div>
            <button
                type="button"
                aria-label="Send message"
                className="grid size-10 shrink-0 place-items-center rounded-xl bg-indigo-500 text-white shadow-lg shadow-indigo-950/30 transition hover:-translate-y-0.5 hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-300/60"
            >
                <Send size={17} fill="currentColor" />
            </button>
        </div>
    );
};

export default MessageInput;
