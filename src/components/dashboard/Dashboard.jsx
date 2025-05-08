import { BsLayoutSplit } from "react-icons/bs";
import DataPreviewTable from "@/components/table/DataPreviewTable"
import PlaceholderChart from "@/components/charts/PlaceholderChart";

const Dashboard = () => {
    return (
        <div className="h-full flex flex-col">
            <div className="flex justify-center items-center mx-5 mt-5 h-[500px] bg-[var(--color-bg-secondary)] border border-[var(--color-bg-tertiary)] rounded-2xl overflow-hidden">
                <PlaceholderChart />
            </div>

            <div className="flex w-full justify-between p-5 items-center text-sm">
                <div className="flex gap-5 p-2 bg-[var(--color-bg-primary)] rounded-2xl border border-[var(--color-bg-tertiary)]">
                    <button className="bg-[var(--color-button-bg)] py-1 px-3 rounded-xl border border-[var(--color-button-border)] cursor-pointer">
                        Overview
                    </button>
                    <button className="py-1 px-3 rounded-xl border border-transparent hover:bg-[var(--color-button-bg)] hover:border-[var(--color-button-border)] transition-colors duration-20 cursor-pointer">
                        Delete Columns
                    </button>
                    <button className="py-1 px-3 rounded-xl border border-transparent hover:bg-[var(--color-button-bg)] hover:border-[var(--color-button-border)] transition-colors duration-200 cursor-pointer">
                        Delete Columns
                    </button>
                </div>
                <div className="p-2">
                    <button className="flex items-center gap-3 py-1 px-3 rounded-lg bg-[var(--color-button-bg)] border border-[var(--color-button-border)] cursor-pointer hover:bg-[var(--color-bg-primary)]">
                        <BsLayoutSplit size={16} />
                        <span>Customize Column</span>
                    </button>
                </div>
            </div>

            <div className="mx-5 m-auto mb-5 h-fit bg-[var(--color-bg-secondary)] border border-[var(--color-bg-tertiary)] rounded-2xl">
                <DataPreviewTable />
            </div>
        </div>



    );
}
export default Dashboard;