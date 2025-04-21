import Introduction from "@/components/Introduction";
import Dashboard from "@/components/dashboard/Dashboard";


const components = {
    'introduction': Introduction,
    'dashboard': Dashboard,
};

const MainPanel = ({ activeComponent }) => {

    const ActiveComponent = components[activeComponent];

    return (
        <div>
            {ActiveComponent && <ActiveComponent />}
        </div>
    );
}

export default MainPanel;