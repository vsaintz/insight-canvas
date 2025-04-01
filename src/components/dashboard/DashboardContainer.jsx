import ControlPanel from "./ControlPanel";
import WorkPanel from "./MainPanel";

const DashboardContainer = () => {
    return (
        <div className="flex h-screen bg-[var(--root-color)]">
            <div className="w-1/6 bg-[var(--root-color)]">
                <ControlPanel />
            </div>

            <div className="flex-1 bg-[var(--work-panel-bg)] m-2 rounded-2xl">
                <WorkPanel />
            </div>
        </div>
    );
}

export default DashboardContainer;
