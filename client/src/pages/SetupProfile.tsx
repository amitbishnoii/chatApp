import React, { useState } from "react";
import { setupService } from "../services/userService";

const SetupProfile = () => {
    const [bio, setBio] = useState<string>("");
    const [profilePicture, setProfilePicture] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

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
        const setupRes = await setupService(payload);
    };

    return (
        <div className="flex items-center justify-center bg-[#0d0c0b] px-5 py-10 sm:px-10 lg:px-14">
            <div className="w-full max-w-lg rounded-[2rem] border border-[#2b2926] bg-[#161513] p-7 sm:p-10">
                <h1 className="text-3xl font-semibold tracking-tight text-[#f2ede4] sm:text-4xl">
                    Set up your profile
                </h1>
                <p className="mt-3 text-[15px] leading-relaxed text-[#8c877e]">
                    Add a photo and a short bio so people know who you are.
                </p>

                <div className="mt-9 space-y-8">
                    {/* Photo */}
                    <label
                        htmlFor="picture"
                        className="group flex cursor-pointer items-center gap-5"
                    >
                        <input
                            id="picture"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="peer sr-only"
                        />

                        <span
                            className={`relative flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-[1.75rem] border-2 transition-all duration-200 peer-focus-visible:ring-4 peer-focus-visible:ring-[#ff6a1a]/40 ${
                                preview
                                    ? "border-transparent shadow-[6px_6px_0_0_#ff6a1a]"
                                    : "border-dashed border-[#3a3733] bg-[#1d1c1a] group-hover:border-[#ff6a1a]"
                            }`}
                        >
                            {preview ? (
                                <img
                                    src={preview}
                                    alt="Profile preview"
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.75"
                                    strokeLinecap="round"
                                    className="h-7 w-7 text-[#8c877e] transition-colors group-hover:text-[#ff6a1a]"
                                    aria-hidden="true"
                                >
                                    <path d="M12 5v14M5 12h14" />
                                </svg>
                            )}
                        </span>

                        <span>
                            <span className="block text-[15px] font-medium text-[#f2ede4]">
                                {preview ? "Change photo" : "Upload a photo"}
                            </span>
                            <span className="mt-0.5 block text-sm text-[#8c877e]">
                                Square photos work best
                            </span>
                        </span>
                    </label>

                    {/* Bio */}
                    <div>
                        <label
                            htmlFor="bio"
                            className="mb-2 block text-sm font-medium text-[#cbc5b9]"
                        >
                            Bio
                        </label>
                        <input
                            id="bio"
                            type="text"
                            placeholder="Tell people a little about you"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            className="h-12 w-full rounded-xl border border-[#2b2926] bg-[#1d1c1a] px-4 text-[15px] text-[#f2ede4] outline-none transition placeholder:text-[#5e5a53] focus:border-[#ff6a1a] focus:ring-4 focus:ring-[#ff6a1a]/15"
                        />
                    </div>

                    <button
                        onClick={handleSubmit}
                        className="flex h-12 w-full items-center justify-center rounded-xl bg-[#ff6a1a] px-4 text-sm font-semibold text-[#0d0c0b] transition hover:bg-[#ff8140] active:translate-y-px focus:outline-none focus-visible:ring-4 focus-visible:ring-[#ff6a1a]/30"
                    >
                        Finish Setup
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SetupProfile;
