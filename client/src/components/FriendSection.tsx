import { PlusIcon, SearchIcon, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export interface FriendShape {
    username: string;
    firstName: string;
    lastName: string;
    profilePicture: string;
}

interface FriendSectionProp {
    friends: FriendShape[];
    selectedFriend: FriendShape | undefined;
    onSelect: (friend: FriendShape) => void;
}

const FriendSection = ({
    friends,
    onSelect,
    selectedFriend,
}: FriendSectionProp) => {
    const navigate = useNavigate();

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
                            Your friends
                        </h2>
                    </div>
                    <button
                        className="grid size-10 place-items-center rounded-xl border border-white/10 bg-[#17171b] text-xl font-light text-white transition hover:border-[#ff2e55]/50 hover:bg-[#ff2e55] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#ff2e55]/60"
                        aria-label="Start a new message"
                        onClick={() => navigate("/find-people")}
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
                <p className="px-3 pb-1 pt-1 text-[10px] font-bold uppercase tracking-[0.25em] text-[#ff6480]/80">
                    Recent conversations
                </p>
                {friends.map((friend, index) => {
                    return (
                        <div
                            onClick={() => onSelect(friend)}
                            key={friend.username}
                            className={`group flex cursor-pointer items-center gap-3 rounded-2xl border p-3 transition duration-200 ${
                                friend.username === selectedFriend?.username
                                    ? "border-[#ff2e55]/30 bg-[#ff2e55]/10"
                                    : "border-transparent hover:border-white/10 hover:bg-white/5"
                            }`}
                        >
                            <div className="relative shrink-0">
                                {friend.profilePicture ? (
                                    <img
                                        src={friend.profilePicture}
                                        alt={`${friend.firstName} ${friend.lastName}`}
                                        className="size-11 rounded-full border border-white/10 object-cover"
                                        onError={(e) => {
                                            e.currentTarget.style.display =
                                                "none";
                                            e.currentTarget.nextElementSibling?.classList.remove(
                                                "hidden",
                                            );
                                        }}
                                    />
                                ) : null}
                                <div
                                    className={`${friend.profilePicture ? "hidden" : "flex"} size-11 items-center justify-center rounded-full border border-white/10 bg-[#17171b] text-[13px] font-semibold text-slate-300`}
                                >
                                    <User
                                        className="size-6"
                                        strokeWidth={1.75}
                                    />
                                </div>
                                {index === 0 && (
                                    <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-[#0a0a0c] bg-[#39ff88]" />
                                )}
                            </div>

                            <div className="min-w-0 flex-1">
                                <div className="flex items-center justify-between gap-2">
                                    <p
                                        className={`truncate text-[13px] font-semibold ${
                                            friend.username ===
                                            selectedFriend?.username
                                                ? "text-[#ff6480]"
                                                : "text-slate-100"
                                        }`}
                                    >
                                        {friend.firstName} {friend.lastName}
                                    </p>
                                    <span className="shrink-0 text-[10px] font-medium text-slate-500">
                                        2 hours ago
                                    </span>
                                </div>
                                <p className="truncate text-[11px] text-slate-500">
                                    @{friend.username}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="border-t border-white/10 px-5 py-3.5 text-[11px] font-medium tracking-wide text-[#ff6480]/80">
                {friends.length} conversations{" "}
                <span className="mx-1 text-[#ff6480]/40">•</span>{" "}
                <span className="text-[#39ff88]/80">3 online</span>
            </div>
        </aside>
    );
};

export default FriendSection;
