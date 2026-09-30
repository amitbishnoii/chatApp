import { CalendarDays } from "lucide-react";

const DateDivider = ({ date }: { date: Date }) => {
    const isSameDay = (a: Date, b: Date) =>
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate();

    const getDateLabel = (date: Date) => {
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        if (isSameDay(date, today)) return "Today";
        if (isSameDay(date, yesterday)) return "Yesterday";

        return date.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };
    const labelDate = new Date(date);
    const label = getDateLabel(labelDate);
    return (
        <div
            role="separator"
            aria-label={label}
            className="flex w-full items-center gap-3 py-3"
        >
            <span aria-hidden="true" className="h-px flex-1 bg-white/8" />
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-[#141417] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400 shadow-sm shadow-black/20">
                <CalendarDays
                    aria-hidden="true"
                    className="size-3 text-[#ff6480]/80"
                    strokeWidth={1.75}
                />
                {label}
            </span>
            <span aria-hidden="true" className="h-px flex-1 bg-white/8" />
        </div>
    );
};

export default DateDivider;
