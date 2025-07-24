const DashBoard = () => {
    return (
        <>
        <div className="flex flex-col w-full h-screen">

            <div className="__sidebar w-[var(--sidebar-width)]">
            </div>

            <div className="__chartarea w-[var(--chart-area)]">
            </div>

            <div className="__rightsidebar w-[var(--chart-area)]">
            </div>
        </div>
        </>
    );
}

export default DashBoard;