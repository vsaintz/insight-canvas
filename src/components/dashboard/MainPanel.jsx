import Introduction from "../Introduction";
import Dashboard from "./Dashboard";

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