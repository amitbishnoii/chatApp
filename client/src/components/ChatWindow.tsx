import MessageInput from "./MessageInput";

const ChatWindow = () => {
    const messages = [
        {
            text: "Hey! I was just thinking about you. How has your week been?",
            time: "10:24 AM",
            incoming: true,
        },
        {
            text: "It has been really good! I finally started working on that side project.",
            time: "10:26 AM",
            incoming: false,
        },
        {
            text: "No way, that is exciting. You have to show me what you have so far.",
            time: "10:27 AM",
            incoming: true,
        },
        {
            text: "Of course. I think you will like the direction it is going in.",
            time: "10:29 AM",
            incoming: false,
        },
        {
            text: "Perfect. Coffee this weekend and you can give me the full tour ☕",
            time: "10:31 AM",
            incoming: true,
        },
    ];

    return (
        <main className="fixed inset-y-5 left-98 right-5 flex flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0a0a0c] text-slate-100 shadow-[0_24px_80px_rgba(0,0,0,0.6)]">
            <header className="flex items-center gap-4 border-b border-white/10 bg-[#0f0f12] px-7 py-5">
                <div className="relative">
                    <div className="grid size-12 place-items-center rounded-full bg-[#e6e6e6] text-sm font-bold text-black">
                        MC
                    </div>
                    <span className="absolute bottom-0 right-0 size-3.5 rounded-full border-2 border-[#0f0f12] bg-[#39ff88]" />
                </div>
                <div className="min-w-0">
                    <h1 className="truncate text-base font-bold text-white">
                        Maya Chen
                    </h1>
                    <p className="mt-0.5 text-xs font-medium text-[#39ff88]/90">
                        Active now
                    </p>
                </div>
            </header>

            <section className="flex-1 overflow-y-auto bg-[#0a0a0c] px-7 py-7">
                <div className="mx-auto flex max-w-3xl flex-col gap-4">
                    <div className="flex items-center gap-4 py-2 text-[10px] font-bold uppercase tracking-[0.25em] text-slate-600">
                        <span className="h-px flex-1 bg-white/10" />
                        <span>Today</span>
                        <span className="h-px flex-1 bg-white/10" />
                    </div>

                    {messages.map((message) => (
                        <div
                            key={`${message.time}-${message.text}`}
                            className={`flex ${message.incoming ? "justify-start" : "justify-end"}`}
                        >
                            <div
                                className={`max-w-[min(75%,34rem)] px-4 py-3 ${
                                    message.incoming
                                        ? "rounded-2xl rounded-tl-md border border-white/10 bg-[#17171b] text-slate-100"
                                        : "rounded-2xl rounded-tr-md bg-[#ff2e55] text-white"
                                }`}
                            >
                                <p className="text-sm leading-6">
                                    {message.text}
                                </p>
                                <p
                                    className={`mt-1.5 text-[10px] font-semibold tracking-wide ${
                                        message.incoming
                                            ? "text-slate-600"
                                            : "text-white/70"
                                    }`}
                                >
                                    {message.time}
                                </p>
                            </div>
                        </div>
                    ))}
                    <MessageInput />
                </div>
            </section>
        </main>
    );
};

export default ChatWindow;
