import { useState } from "react";

import ControlPanel from "./ControlPanel";
import MainPanel from "./MainPanel";
import { LuPanelLeft } from "../utils/icons";

const DashboardContainer = () => {

    const [activeComponent, setActiveComponent] = useState('introduction');

    return (
        <div className="flex h-screen bg-[var(--root-color)]">
            <aside className="w-1/6">
                <ControlPanel onButtonClick={setActiveComponent} />
            </aside>

            <main className="flex flex-col flex-1 text-[var(--font-color)] bg-[var(--work-panel-bg)] m-2 rounded-2xl">
                <header className="flex items-center w-full h-12 rounded-t-2xl border-b border-[var(--secondary-color)] px-5">
                    <div className="w-10 border-r border-[var(--secondary-color)]">
                        <LuPanelLeft size={20} />
                    </div>
                    <h1 className="ml-4">Dashboard</h1>
                </header>

                <section className="flex-1 rounded-2xl overflow-y-scroll">
                    <MainPanel activeComponent={activeComponent} />
                </section>
            </main>
        </div>
    );
}

export default DashboardContainer;
