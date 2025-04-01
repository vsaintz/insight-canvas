import { LuPanelLeft } from "../utils/icons";

const WorkPanel = () => {
    return (
        <div className="flex flex-col gap-5 text-[var(--font-color)]">
            <div className="flex items-center w-full h-12 bg-[var(--work-panel-bg)] rounded-t-2xl border-b border-b-[var(--secondary-color)]">
                <div className="mx-5 w-10 border-r border-r-[var(--secondary-color)]">
                    <LuPanelLeft size={20} />
                </div>
                <div>
                    Dashboard
                </div>
            </div>

            <div className="h-96 m-3 bg-[var(--secondary-color)] rounded-2xl">

            </div>


        </div>
    );
}

export default WorkPanel;