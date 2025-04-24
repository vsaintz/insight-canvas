import {
    FaGitlab,
    TbDashboard,
    AiOutlineFundProjectionScreen,
    IoDocumentTextOutline,
    FiActivity,
    IoMdMore,
    CiSettings,
    IoMdHelpCircleOutline,
} from "@/components/utils/icons";

const ControlPanel = ({ onButtonClick }) => {

    const branding = {
        icon: <FaGitlab size={20} className="text-[var(--color-text-primary)]" />,
        title: "Insight Canvas"
    };

    const tools = [
        { id: 'introduction', icon: <IoDocumentTextOutline size={16} />, title: "Introduction" },
        { id: 'dashboard', icon: <TbDashboard size={16} />, title: "Dashboard", },
        { id: 'projects', icon: <AiOutlineFundProjectionScreen size={16} />, title: "Projects", },
        { id: 'charts', icon: <FiActivity size={16} />, title: "Charts" }
    ];

    const userOptions = [
        { id: 1, icon: <CiSettings size={16} />, title: "Settings" },
        { id: 2, icon: <IoMdHelpCircleOutline size={16} />, title: "Get Help" }
    ];

    const profile = {
        icon: <img src="/2bf09ffc1dccf19ba1ba7cf7535cbb0.jpg" className="w-10 h-10 rounded-lg" alt="Profile Picture" />,
        username: "Emma Myers",
        email: "emma.myers@gmail.com"
    };

    return (
        <div className="flex flex-col gap-7 h-full">

            {/* Branding Section */}
            <div className="p-6 text-[var(--color-text-primary)]">
                <div className="flex items-center gap-3 mb-5">
                    {branding.icon}
                    <h1 className="text-base font-semibold">{branding.title}</h1>
                </div>
            </div>

            {/* Tools Section */}
            <div className="flex flex-col gap-1 px-6  text-[var(--color-text-primary)]">
                {tools.map((tool) => (
                    <button
                        key={tool.id}
                        className={"flex items-center gap-2 p-1 my-[2px]  w-full rounded-lg hover:bg-[var(--color-bg-tertiary)]"}
                        onClick={() => onButtonClick(tool.id)}>
                        {tool.icon}
                        <span className="tracking-wide">{tool.title}</span>
                    </button>
                ))}
            </div>

            {/* Profile Section */}
            <div className="mt-auto p-5">
                <div className="my-10 text-[var(--color-text-primary)]">
                    {userOptions.map((userOption) => (
                        <button
                            key={userOption.id}
                            className={"flex items-center gap-2 p-1 my-[2px]  w-full rounded-lg hover:bg-[var(--color-bg-tertiary)]"}>
                            {userOption.icon}
                            <span className="text-sm tracking-wide">{userOption.title}</span>
                        </button>
                    ))}
                </div>

                <div className="flex gap-3 text-[var(--color-text-primary)] p-2">
                    {profile.icon}
                    <div className="flex flex-col">
                        <span className="text-sm">{profile.username}</span>
                        <span className="text-[0.7rem] text-gray-300">{profile.email}</span>
                    </div>
                    <button className="mx-auto hover:bg-[var(--color-bg-tertiary)] rounded-lg cursor-pointer"><IoMdMore size={20} /></button>
                </div>
            </div>

        </div>
    );
};

export default ControlPanel;
