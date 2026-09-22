import { PlusIcon, SearchIcon } from "lucide-react";

const friends = [
    {
        name: "Maya Chen",
        message: "That sounds perfect!",
        time: "2m",
        color: "bg-rose-500",
        initials: "MC",
        online: true,
        unread: 2,
    },
    {
        name: "Alex Morgan",
        message: "See you in a bit",
        time: "18m",
        color: "bg-cyan-500",
        initials: "AM",
        online: true,
        unread: 0,
    },
    {
        name: "Jordan Lee",
        message: "Sent a photo",
        time: "1h",
        color: "bg-amber-500",
        initials: "JL",
        online: false,
        unread: 0,
    },
    {
        name: "Sam Rivera",
        message: "Let's catch up soon",
        time: "3h",
        color: "bg-violet-500",
        initials: "SR",
        online: true,
        unread: 4,
    },
    {
        name: "Taylor Kim",
        message: "Thanks for the update",
        time: "Yesterday",
        color: "bg-emerald-500",
        initials: "TK",
        online: false,
        unread: 0,
    },
];

const FriendSection = () => {
    return (
        <aside className="fixed inset-y-5 left-5 z-10 flex w-[min(22rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0a0a0c] text-slate-100 shadow-[0_28px_90px_rgba(0,0,0,0.6)]">
            <div className="border-b border-white/10 bg-[#0f0f12] px-5 pb-5 pt-6">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="size-2 rounded-full bg-[#39ff88]" />
                            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-500">
                                Messages
                            </p>
                        </div>
                        <h2 className="mt-2 text-2xl font-bold tracking-[-0.03em] text-white">
                            Your people
                        </h2>
                        <p className="mt-1 text-xs text-slate-500">
                            Stay close to the people who matter.
                        </p>
                    </div>
                    <button
                        className="grid size-10 place-items-center rounded-xl border border-white/10 bg-[#17171b] text-xl font-light text-white transition hover:border-[#ff2e55]/50 hover:bg-[#ff2e55] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#ff2e55]/60"
                        aria-label="Start a new message"
                    >
                        <PlusIcon />
                    </button>
                </div>
                <div className="mt-5 flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-3.5 py-3 text-sm text-slate-500 transition focus-within:border-[#ff2e55]/50 focus-within:text-slate-300">
                    <span
                        aria-hidden="true"
                        className="text-lg leading-none text-slate-500"
                    >
                        <SearchIcon />
                    </span>
                    <span className="text-[13px]">Search conversations</span>
                </div>
            </div>

            <div className="flex-1 space-y-1.5 overflow-y-auto p-3">
                <p className="px-3 pb-1 pt-1 text-[10px] font-bold uppercase tracking-[0.25em] text-slate-600">
                    Recent conversations
                </p>
                {friends.map((friend, index) => (
                    <div
                        key={friend.name}
                        className={`group flex cursor-pointer items-center gap-3 rounded-2xl border p-3 transition duration-200 ${
                            index === 0
                                ? "border-[#ff2e55]/30 bg-[#ff2e55]/10"
                                : "border-transparent hover:border-white/10 hover:bg-white/5"
                        }`}
                    >
                        <div className="relative shrink-0">
                            <div
                                className={`grid size-11 place-items-center rounded-full ${friend.color} text-xs font-bold text-white ring-4 ring-[#0a0a0c]`}
                            >
                                {friend.initials}
                            </div>
                            {friend.online && (
                                <span className="absolute bottom-0 right-0 size-3 rounded-full border-2 border-[#0a0a0c] bg-[#39ff88]" />
                            )}
                        </div>
                        <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-2">
                                <p className="truncate text-[13px] font-semibold text-slate-100">
                                    {friend.name}
                                </p>
                                <span className="shrink-0 text-[10px] font-medium text-slate-500">
                                    {friend.time}
                                </span>
                            </div>
                            <div className="mt-1.5 flex items-center justify-between gap-2">
                                <p className="truncate text-xs text-slate-400 transition group-hover:text-slate-300">
                                    {friend.message}
                                </p>
                                {friend.unread > 0 && (
                                    <span className="grid size-5 shrink-0 place-items-center rounded-full bg-[#ff2e55] text-[10px] font-bold text-white">
                                        {friend.unread}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="border-t border-white/10 px-5 py-3.5 text-[11px] font-medium tracking-wide text-slate-500">
                5 conversations <span className="mx-1 text-slate-700">•</span>{" "}
                <span className="text-[#39ff88]/80">3 online</span>
            </div>
        </aside>
    );
};

export default FriendSection;
