import { useState } from "react";

import ControlPanel from "@/components/dashboard/ControlPanel";
import MainPanel from "@/components/dashboard/MainPanel";
import { LuPanelLeft } from "@/components/utils/icons";

const DashboardContainer = () => {

    const [activeComponent, setActiveComponent] = useState('introduction');

    return (
        <div className="flex h-screen bg-[var(--color-bg-primary)]">
            <aside className="w-1/6">
                <ControlPanel onButtonClick={setActiveComponent} />
            </aside>

            <main className="flex flex-col flex-1 text-[var(--color-text-primary)] bg-[var(--color-panel-work)] m-2 rounded-2xl">
                <header className="flex items-center w-full h-12 rounded-t-2xl border-b border-[var(--color-bg-tertiary)] px-5">
                    <div className="w-10 border-r border-[var(--color-bg-tertiary)]">
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
