import { cn } from "@/lib/utils"

export default function Button({
    label,
    LeftIcon: LeftIcon,
    RightIcon: RightIcon,
    textColor = "text-white",
    bgColor = "bg-bg-secondary",
    className = "",
    ...props
}) {
    return (
        <button
            className={cn(
                "flex items-center gap-2 px-4 py-3 rounded-2xl font-medium transition-colors duration-200 cursor-pointer mb-5",
                textColor,
                bgColor,
                className
            )}
            {...props}
        >
            {LeftIcon && <LeftIcon className="w-5 h-5" />}
            {label && <span>{label}</span>}
            {RightIcon && <RightIcon className="w-5 h-5" />}
        </button>
    )
}
