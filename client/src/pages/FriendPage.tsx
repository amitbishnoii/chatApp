import { useEffect, useState } from "react";
import {
    Home,
    MessageCircle,
    Plus,
    PlusSquare,
    Search,
    Sparkles,
    UserPlus,
} from "lucide-react";
import { addFriendService, findUserService } from "../services/userService";
import useAuth from "../hooks/useAuth";

const people = [
    {
        username: "maya.chen",
        name: "Maya Chen",
        detail: "3 mutual friends",
        initials: "MC",
        avatar: "bg-[linear-gradient(145deg,#8c79b9,#483c73)]",
        badge: "new",
    },
    {
        username: "jordanframes",
        name: "Jordan Ellis",
        detail: "8 mutual friends",
        initials: "JE",
        avatar: "bg-[linear-gradient(145deg,#5d9bd1,#315279)]",
    },
    {
        username: "alex.rivera",
        name: "Alex Rivera",
        detail: "Suggested for you",
        initials: "AR",
        avatar: "bg-[linear-gradient(145deg,#e09a60,#9a4d38)]",
        badge: "new",
    },
    {
        username: "noahwrites",
        name: "Noah Williams",
        detail: "5 mutual friends",
        initials: "NW",
        avatar: "bg-[linear-gradient(145deg,#80b48b,#38654f)]",
    },
    {
        username: "sophia.lane",
        name: "Sophia Lane",
        detail: "2 mutual friends",
        initials: "SL",
        avatar: "bg-[linear-gradient(145deg,#d987aa,#793f67)]",
    },
    {
        username: "theo.martin",
        name: "Theo Martin",
        detail: "Suggested for you",
        initials: "TM",
        avatar: "bg-[linear-gradient(145deg,#d5b068,#80632d)]",
    },
    {
        username: "ria.kapoor",
        name: "Ria Kapoor",
        detail: "6 mutual friends",
        initials: "RK",
        avatar: "bg-[linear-gradient(145deg,#c9766e,#6f3438)]",
    },
    {
        username: "sam.woods",
        name: "Sam Woods",
        detail: "4 mutual friends",
        initials: "SW",
        avatar: "bg-[linear-gradient(145deg,#5fa9a4,#285d62)]",
    },
];

const FriendPage = () => {
    const [username, setUsername] = useState<string>("");
    const [ID, setID] = useState<string>("");
    const { user } = useAuth();

    useEffect(() => {
        if (!user) {
            return;
        }
        const timeout = setTimeout(() => {
            if (username.trim() === "") {
                return;
            }
            const fn = async () => {
                await findUserService(username, user.accessToken);
            };
            fn();
        }, 600);

        return () => {
            clearTimeout(timeout);
        };
    }, [username]);

    const handleSendRequest = async () => {
        if (!user) {
            return;
        }
        await addFriendService(
            { reqSenderId: user?.id, reqReceiverId: ID },
            user?.accessToken,
        );
    };

    return (
        <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_4%_10%,rgba(104,79,151,.12),transparent_22rem),radial-gradient(circle_at_96%_76%,rgba(26,116,110,.1),transparent_26rem),#101112] px-[5vw] pb-16 max-[760px]:px-4.5 max-[760px]:pb-11">
            <header className="mx-auto grid max-w-360 grid-cols-[1fr_minmax(240px,430px)_1fr] items-center gap-6 border-b border-[#292b2e] py-6.25 max-[760px]:grid-cols-[1fr_auto] max-[760px]:gap-4.5">
                <div className="flex items-center gap-2.5">
                    <div className="grid size-9.5 place-items-center rounded-xl bg-emerald-400 text-[#07110d] shadow-[0_8px_24px_rgba(52,211,153,.2)]">
                        <Sparkles size={18} strokeWidth={2.5} />
                    </div>
                    <h2 className="m-0 text-[25px] font-extrabold leading-none tracking-[-.06em] text-white">
                        Chat<span className="text-emerald-400">.AI</span>
                    </h2>
                </div>
                <div className="flex min-w-0 items-center gap-2.5 rounded-[7px] border border-[#34373b] bg-[#191b1e] px-3.5 py-2.75 text-[#858b92] focus-within:border-[#747b84] max-[760px]:col-span-full max-[760px]:row-start-2">
                    <Search size={18} strokeWidth={2.2} />
                    <input
                        type="search"
                        aria-label="Search people"
                        placeholder="Search people"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full min-w-0 border-0 bg-transparent text-[13px] text-[#f4f1ec] outline-none placeholder:text-[#777d85]"
                    />
                </div>

                {/* <input
                    type="text"
                    placeholder="id"
                    value={ID}
                    onChange={(e) => setID(e.target.value)}
                />

                <button onClick={handleSendRequest}>send request</button> */}

                <nav
                    className="flex items-center justify-end gap-4.5 max-[760px]:gap-3.25"
                    aria-label="Main navigation"
                >
                    <button
                        className="grid place-items-center border-0 bg-transparent p-0 text-[#d7d9dc] hover:text-[#d5f36b] max-[760px]:hidden"
                        type="button"
                        aria-label="Home"
                    >
                        <Home size={20} />
                    </button>
                    <button
                        className="grid place-items-center border-0 bg-transparent p-0 text-[#d7d9dc] hover:text-[#d5f36b]"
                        type="button"
                        aria-label="Messages"
                    >
                        <MessageCircle size={20} />
                    </button>
                    <button
                        className="grid place-items-center border-0 bg-transparent p-0 text-[#d7d9dc] hover:text-[#d5f36b] max-[760px]:hidden"
                        type="button"
                        aria-label="Create"
                    >
                        <PlusSquare size={20} />
                    </button>
                    <button
                        type="button"
                        className="size-7.75 rounded-full border-0 bg-[#d5f36b] text-[10px] font-bold text-[#111214]"
                        aria-label="Your profile"
                    >
                        AM
                    </button>
                </nav>
            </header>

            <section className="mx-auto flex max-w-360 items-end justify-between pb-7.25 pt-14.5 max-[760px]:pt-11.75">
                <div>
                    <p className="mb-2.5 text-[11px] font-bold uppercase tracking-[.16em] text-[#a6bdff]">
                        Build your circle
                    </p>
                    <h1 className="m-0 text-[clamp(43px,6vw,76px)] font-normal leading-[.86] tracking-[-.07em] text-[#f4f1ec]">
                        Find people
                    </h1>
                </div>
                <span className="pb-1 text-xs text-[#7e858d]">
                    {people.length} suggestions
                </span>
            </section>

            <section
                className="mx-auto grid max-w-360 grid-cols-2 gap-3 max-[760px]:grid-cols-1"
                aria-label="Suggested people"
            >
                {people.map((person) => (
                    <article
                        className="flex min-w-0 items-center gap-3.75 rounded-[10px] border border-[#292c30] bg-[linear-gradient(110deg,rgba(25,27,30,.96),rgba(25,27,30,.76))] p-[17px_18px] shadow-[0_10px_30px_rgba(0,0,0,.08)] transition duration-200 hover:-translate-y-0.5 hover:border-[#4a4e55] hover:bg-[#1d2023] hover:shadow-[0_14px_34px_rgba(0,0,0,.16)] max-[760px]:p-3.75 max-[520px]:gap-2.75"
                        key={person.username}
                    >
                        <div
                            className={`relative grid size-14.5 flex-[0_0_58px] place-items-center rounded-full border-[3px] border-[#282b30] text-sm font-bold tracking-[.02em] text-white shadow-[0_0_0_1px_#101112] max-[520px]:size-12.5 max-[520px]:flex-[0_0_50px] ${person.avatar}`}
                            aria-hidden="true"
                        >
                            {person.initials}
                            <span className="absolute bottom-px -right-px size-3 rounded-full border-2 border-[#191b1e] bg-[#75dc9c]" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                                <h2 className="overflow-hidden m-0 truncate text-sm font-bold text-[#f4f1ec]">
                                    {person.username}
                                </h2>
                                {person.badge && (
                                    <span className="rounded-sm bg-[rgba(213,243,107,.1)] px-1.5 py-0.75 text-[9px] font-bold uppercase tracking-[.04em] text-[#d5f36b]">
                                        new
                                    </span>
                                )}
                            </div>
                            <p className="my-1.25 mb-1.75 overflow-hidden truncate text-xs text-[#a9adb2]">
                                {person.name}
                            </p>
                            <span className="text-[10px] text-[#737a82]">
                                {person.detail}
                            </span>
                        </div>
                        <button
                            className="flex min-w-27 flex-[0_0_auto] items-center justify-center gap-1.75 rounded-md border-0 bg-[#d5f36b] px-3 py-2.5 text-[11px] font-bold text-[#111214] transition duration-200 hover:-translate-y-px hover:bg-[#e5ff91] max-[520px]:size-10.5 max-[520px]:min-w-0 max-[520px]:p-0"
                            type="button"
                        >
                            <UserPlus size={16} />
                            <span className="max-[520px]:hidden">
                                Add friend
                            </span>
                        </button>
                    </article>
                ))}
            </section>

            <div className="mx-auto mt-7 flex max-w-360 items-center gap-3.5 rounded-[10px] border border-dashed border-[#3c4148] bg-[rgba(25,27,30,.45)] p-[18px_20px] text-[#a9adb2] max-[760px]:flex-wrap max-[760px]:items-start">
                <div className="grid size-9.5 flex-[0_0_38px] place-items-center rounded-lg bg-[rgba(213,243,107,.1)] text-[#d5f36b]">
                    <Plus size={20} />
                </div>
                <div>
                    <h2 className="mb-1 m-0 text-[13px] text-[#e2e3e4]">
                        Know someone who should be here?
                    </h2>
                    <p className="m-0 text-[11px]">
                        Invite friends to join your circle.
                    </p>
                </div>
                <button
                    type="button"
                    className="ml-auto flex items-center justify-center gap-1.75 rounded-md border-0 bg-[#d5f36b] px-3.5 py-2.5 text-[11px] font-bold text-[#111214] transition duration-200 hover:-translate-y-px hover:bg-[#e5ff91] max-[760px]:mt-1 max-[760px]:ml-13 max-[760px]:w-full"
                >
                    Invite friends
                </button>
            </div>
        </main>
    );
};

export default FriendPage;
