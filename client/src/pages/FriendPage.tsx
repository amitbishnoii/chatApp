import { useEffect, useState } from "react";
import {
    Home,
    MessageCircle,
    Plus,
    PlusSquare,
    Search,
    UserPlus,
} from "lucide-react";
import { findUserService } from "../services/userService";
import useAuth from "../hooks/useAuth";

const people = [
    {
        username: "maya.chen",
        name: "Maya Chen",
        detail: "3 mutual friends",
        initials: "MC",
        avatar: "avatar-lilac",
        badge: "new",
    },
    {
        username: "jordanframes",
        name: "Jordan Ellis",
        detail: "8 mutual friends",
        initials: "JE",
        avatar: "avatar-blue",
    },
    {
        username: "alex.rivera",
        name: "Alex Rivera",
        detail: "Suggested for you",
        initials: "AR",
        avatar: "avatar-orange",
        badge: "new",
    },
    {
        username: "noahwrites",
        name: "Noah Williams",
        detail: "5 mutual friends",
        initials: "NW",
        avatar: "avatar-green",
    },
    {
        username: "sophia.lane",
        name: "Sophia Lane",
        detail: "2 mutual friends",
        initials: "SL",
        avatar: "avatar-pink",
    },
    {
        username: "theo.martin",
        name: "Theo Martin",
        detail: "Suggested for you",
        initials: "TM",
        avatar: "avatar-gold",
    },
    {
        username: "ria.kapoor",
        name: "Ria Kapoor",
        detail: "6 mutual friends",
        initials: "RK",
        avatar: "avatar-red",
    },
    {
        username: "sam.woods",
        name: "Sam Woods",
        detail: "4 mutual friends",
        initials: "SW",
        avatar: "avatar-teal",
    },
];

const FriendPage = () => {
    const [username, setUsername] = useState<string>("");
    const { user } = useAuth();

    useEffect(() => {
        if (!user) {
            return;
        }
        const timeout = setTimeout(() => {
            const fn = async () => {
                await findUserService(username, user?.id);
            };
            fn();
        }, 600);

        return () => {
            clearTimeout(timeout);
        };
    }, [username]);

    return (
        <main className="explore-page">
            <header className="explore-header">
                <div className="explore-brand">
                    <span className="brand-mark">✦</span>
                    <span>mingle</span>
                </div>
                <div className="explore-search-wrap">
                    <Search size={18} strokeWidth={2.2} />
                    <input
                        type="search"
                        aria-label="Search people"
                        placeholder="Search people"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    {username && (
                        <button
                            className="search-clear"
                            type="button"
                            onClick={() => setUsername("")}
                            aria-label="Clear search"
                        >
                            ×
                        </button>
                    )}
                </div>
                <nav className="explore-nav" aria-label="Main navigation">
                    <button type="button" aria-label="Home">
                        <Home size={20} />
                    </button>
                    <button type="button" aria-label="Messages">
                        <MessageCircle size={20} />
                    </button>
                    <button type="button" aria-label="Create">
                        <PlusSquare size={20} />
                    </button>
                    <button
                        type="button"
                        className="avatar-button"
                        aria-label="Your profile"
                    >
                        AM
                    </button>
                </nav>
            </header>

            <section className="explore-intro">
                <div>
                    <p className="eyebrow">Build your circle</p>
                    <h1>Find people</h1>
                </div>
                <span className="people-count">
                    {people.length} suggestions
                </span>
            </section>

            <section className="people-grid" aria-label="Suggested people">
                {people.map((person) => (
                    <article className="person-card" key={person.username}>
                        <div
                            className={`profile-avatar ${person.avatar}`}
                            aria-hidden="true"
                        >
                            {person.initials}
                            <span className="avatar-status" />
                        </div>
                        <div className="person-info">
                            <div className="person-name-row">
                                <h2>{person.username}</h2>
                                {person.badge && (
                                    <span className="new-badge">new</span>
                                )}
                            </div>
                            <p>{person.name}</p>
                            <span className="person-detail">
                                {person.detail}
                            </span>
                        </div>
                        <button className="add-friend-button" type="button">
                            <UserPlus size={16} />
                            <span>Add friend</span>
                        </button>
                    </article>
                ))}
            </section>

            <div className="invite-panel">
                <div className="invite-icon">
                    <Plus size={20} />
                </div>
                <div>
                    <h2>Know someone who should be here?</h2>
                    <p>Invite friends to join your circle.</p>
                </div>
                <button type="button" className="invite-button">
                    Invite friends
                </button>
            </div>
        </main>
    );
};

export default FriendPage;
