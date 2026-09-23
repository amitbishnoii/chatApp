import React, { useState } from "react";
import { setupService } from "../services/userService";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const SetupProfile = () => {
    const [bio, setBio] = useState<string>("");
    const [profilePicture, setProfilePicture] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();
    const { setupPartialData } = useAuth();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            return;
        }
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setProfilePicture(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        }
    };

    const handleSubmit = async () => {
        const payload = new FormData();
        payload.append("profilePicture", profilePicture!);
        payload.append("bio", bio);
        setLoading(true);
        const setupRes = await setupService(
            payload,
            localStorage.getItem("token")!,
        );
        setLoading(false);
        if (setupRes.success) {
            setupPartialData({
                bio: setupRes.user.bio,
                firstName: setupRes.user.firstName,
                lastName: setupRes.user.firstName,
            });
            navigate("/chat");
        } else {
            setError(setupRes.message);
            return;
        }
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-[#070a14] px-5 py-10 text-white sm:px-8 lg:px-10">
            <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />
            <div className="pointer-events-none absolute -right-20 bottom-14 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />

            <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl items-center justify-center">
                <div className="animate-[setup-card-in_700ms_cubic-bezier(.22,1,.36,1)_both] grid w-full overflow-hidden rounded-4xl border border-white/10 bg-white/5 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl motion-reduce:animate-none lg:grid-cols-[0.92fr_1.08fr]">
                    <aside className="animate-[setup-panel-in_650ms_120ms_cubic-bezier(.22,1,.36,1)_both] border-b border-white/10 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.35),rgba(10,14,26,0.6)_55%)] p-6 motion-reduce:animate-none sm:p-8 lg:border-r lg:border-b-0">
                        <div className="mb-8 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-500/20 text-lg font-bold text-violet-300">
                                C
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-[0.22em] text-violet-200/75">
                                    Chat AI
                                </p>
                                <p className="text-sm text-slate-300">
                                    Profile setup
                                </p>
                            </div>
                        </div>

                        <div className="flex h-full min-h-90 flex-col justify-center rounded-[28px] border border-white/10 bg-[#0f172a]/70 p-4 shadow-inner shadow-violet-500/10">
                            <div className="mb-4 flex items-center justify-between">
                                <span className="text-xs font-medium uppercase tracking-[0.22em] text-violet-200/80">
                                    Preview
                                </span>
                                <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-emerald-300">
                                    Live
                                </span>
                            </div>

                            <div className="relative mx-auto h-62.5 w-full max-w-70 overflow-hidden rounded-[26px] border border-violet-400/40 bg-slate-900 shadow-[0_20px_50px_rgba(139,92,246,0.28)]">
                                {preview ? (
                                    <img
                                        src={preview}
                                        alt="Profile preview"
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[linear-gradient(135deg,rgba(139,92,246,0.25),rgba(15,23,42,0.9))] text-violet-200">
                                        <span className="text-xs uppercase tracking-[0.2em] text-violet-100/80">
                                            Upload photo to see Preview
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </aside>

                    <main className="animate-[setup-panel-in_650ms_220ms_cubic-bezier(.22,1,.36,1)_both] p-6 motion-reduce:animate-none sm:p-8 lg:p-10">
                        <div className="mb-8">
                            <h1 className="text-[clamp(2.5rem,5vw,3.75rem)] font-semibold leading-[.98] tracking-[-.045em] text-white">
                                Set up your profile
                            </h1>
                            <p className="mt-3 max-w-136 text-[.98rem] leading-[1.7] tracking-[.005em] text-slate-300">
                                Add a profile photo and a short bio so your
                                friends and conversation partners know who you
                                are.
                            </p>
                        </div>

                        <div className="space-y-6 scrollbar-thin scrollbar-thumb-[#5b5a8a] scrollbar-track-transparent">
                            <div className="space-y-2">
                                <label
                                    htmlFor="bio"
                                    className="block text-sm font-medium tracking-[.08em] text-slate-200"
                                >
                                    Bio
                                </label>
                                <textarea
                                    id="bio"
                                    rows={4}
                                    placeholder="Tell people a little about yourself..."
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    className="w-full resize-none rounded-2xl border border-white/10 bg-[#0f172a]/70 px-4 py-3 text-[.95rem] leading-[1.65] tracking-[.005em] text-white outline-none transition placeholder:text-slate-500 focus:border-violet-400 focus:ring-4 focus:ring-violet-400/10"
                                />
                            </div>

                            <div className="rounded-2xl border border-dashed border-violet-400/30 bg-violet-500/5 p-4 text-sm text-slate-300">
                                <div className="flex items-center justify-between gap-4">
                                    <div>
                                        <p className="font-medium text-white">
                                            {preview
                                                ? "Image selected"
                                                : "Add a profile picture"}
                                        </p>
                                        <p className="mt-1 text-slate-400">
                                            PNG, JPG, or WEBP. Square images
                                            look best.
                                        </p>
                                    </div>
                                    <input
                                        id="picture"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="peer sr-only"
                                    />
                                    <label
                                        htmlFor="picture"
                                        className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-violet-400/40 bg-violet-500/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-violet-200 transition hover:bg-violet-500/15"
                                    >
                                        {preview ? "Change" : "Upload"}
                                    </label>
                                </div>
                            </div>

                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className={`flex h-12 w-full items-center justify-center rounded-xl px-4 text-sm font-semibold text-white transition focus:outline-none focus-visible:ring-4 focus-visible:ring-violet-400/25 ${loading ? "cursor-not-allowed bg-violet-700/60" : "bg-violet-500 shadow-lg shadow-violet-500/25 hover:bg-violet-400"}`}
                            >
                                {loading
                                    ? "Creating profile..."
                                    : "Create Profile"}
                            </button>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default SetupProfile;
