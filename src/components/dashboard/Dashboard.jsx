import DropFileUploader from "../fileupload/DropFileUploader";
import PlaceholderChart from "../charts/PlaceHolderChart";

const Dashboard = () => {
    return (
        <div className="m-5 h-96 bg-[var(--secondary-root)] border border-[var(--secondary-color)] rounded-2xl overflow-hidden">
            <PlaceholderChart/>
        </div>


    );
}
export default Dashboard;