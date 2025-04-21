import { BsLayoutSplit } from "react-icons/bs";
import DataPreviewTable from "@/components/table/DataPreviewTable"
import PlaceholderChart from "@/components/charts/PlaceholderChart";

const Dashboard = () => {
    return (
        <div className="h-full flex flex-col">
            <div className="flex justify-center items-center m-5 h-[500px] bg-[var(--secondary-root)] border border-[var(--secondary-color)] rounded-2xl overflow-hidden">
                <PlaceholderChart />
            </div>

            <div className="flex w-full justify-between p-5 items-center text-sm">
                <div className="flex gap-5 p-2 bg-[var(--root-color)] rounded-2xl border border-[var(--secondary-color)]">
                    <button className="bg-[var(--button-background)] py-1 px-3 rounded-xl border border-[var(--button-border)] cursor-pointer">
                        Overview
                    </button>
                    <button className="py-1 px-3 rounded-xl border border-transparent hover:bg-[var(--button-background)] hover:border-[var(--button-border)] transition-colors duration-20 cursor-pointer">
                        Delete Columns
                    </button>
                    <button className="py-1 px-3 rounded-xl border border-transparent hover:bg-[var(--button-background)] hover:border-[var(--button-border)] transition-colors duration-200 cursor-pointer">
                        Delete Columns
                    </button>
                </div>
                <div className="p-2">
                    <button className="flex items-center gap-3 py-1 px-3 rounded-lg bg-[var(--button-background)] border border-[var(--button-border)] cursor-pointer hover:bg-[var(--root-color)]">
                        <BsLayoutSplit size={16} />
                        <span>Customize Column</span>
                    </button>
                </div>
            </div>

            <div className="mx-5 mb-5 h-fit bg-[var(--secondary-root)] border border-[var(--secondary-color)] rounded-2xl">
                <DataPreviewTable />
            </div>
        </div>



    );
}
export default Dashboard;