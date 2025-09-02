import { useState, useEffect } from "react"
import {
    Box, PanelLeft, X, TriangleDashed, ChevronDown, Activity,
    Download, ChevronUp, Settings, Database, FileText, User, MessageCircleQuestionMark, LogOut
} from 'lucide-react'

export default function Sidebar({ onMobileClose, onSelectChart }) {
    const [collapsed, setCollapsed] = useState(false)
    const [chartsMenuOpen, setChartsMenuOpen] = useState(false)
    const [settingsMenuOpen, setSettingMenuOpen] = useState(false)
    const [logoHovered, setLogoHovered] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768)
        checkMobile()
        window.addEventListener("resize", checkMobile)
        return () => window.removeEventListener("resize", checkMobile)
    }, [])

    const SidebarButton = ({ icon: Icon, label, onClick, rightIcon: RightIcon }) => (
        <button
            onClick={onClick}
            className={`group flex items-center rounded-xl hover:bg-bg-hover text-sm w-full transition
      ${collapsed ? "justify-center p-2" : "gap-2 p-2"}`}
        >
            <Icon size={20} />
            {!collapsed && <span className="flex-1 text-left">{label}</span>}
            {!collapsed && RightIcon && (
                <RightIcon
                    size={16}
                    className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                />
            )}
        </button>
    )

    const sidebarItems = [
        { icon: Activity, label: 'Analytics', onClick: () => console.log('Analytics button clicked') },
        { icon: Database, label: 'Preprocessing', onClick: () => console.log('Preprocessing button clicked') },
        { icon: FileText, label: 'Reports', onClick: () => console.log('Reports button clicked') },
        { icon: Download, label: 'Export', onClick: () => console.log('Export button clicked') },
    ]

    const charts = [
        { label: 'Bar Chart', value: 'bar' },
        { label: 'Pie Chart', value: 'pie' },
        { label: 'Scatter Chart', value: 'scatter' },
        { label: 'Area Chart', value: 'area' },
    ]

    return (
        <aside
            className={`flex flex-col h-full font-medium border-r border-border py-3 px-2 transition-all duration-300 bg-bg-primary ${collapsed ? "w-16" : "w-80"}`}
        >
            <div>
                <div className="flex justify-between items-center px-3">
                    <div
                        className="flex gap-3 items-center overflow-hidden cursor-pointer"
                        onMouseEnter={() => setLogoHovered(true)}
                        onMouseLeave={() => setLogoHovered(false)}
                        onClick={() => collapsed && setCollapsed(false)}
                    >
                        {collapsed
                            ? (logoHovered
                                ? <PanelLeft size={20} />
                                : <TriangleDashed size={20} />)
                            : <>
                                <TriangleDashed size={20} />
                                <h1 className="text-lg">Insight Canvas</h1>
                            </>
                        }
                    </div>

                    {!collapsed && (
                        isMobile
                            ? (
                                <X
                                    size={22}
                                    className="cursor-pointer hover:opacity-70 transition"
                                    onClick={onMobileClose}
                                />
                            )
                            : (
                                <PanelLeft
                                    size={22}
                                    className="cursor-pointer hover:opacity-70 transition"
                                    onClick={() => setCollapsed(true)}
                                />
                            )
                    )}
                </div>

                <div className="mt-10 p-2 rounded-md opacity-70">
                    {!collapsed && (
                        <div className="flex gap-3">
                            <span className="text-lg">Dashboard</span>
                        </div>
                    )}
                </div>

                <div className="mt-3 rounded-md relative">
                    <SidebarButton
                        onClick={() => setChartsMenuOpen((prev) => !prev)}
                        icon={Box}
                        label="Charts"
                        rightIcon={ChevronDown}
                    />
                    {chartsMenuOpen && !collapsed && (
                        <div className="flex flex-col border-l border-border pl-3 ml-5 mt-3 items-start">
                            {charts.map((item, i) => (
                                <button
                                    key={i}
                                    onClick={() => onSelectChart(item.value)}
                                    className="w-full text-left text-sm p-2 cursor-pointer rounded-xl hover:bg-bg-hover"
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    )}
                    {chartsMenuOpen && collapsed && (
                        <div className="absolute top-0 left-full ml-5 min-w-52 flex flex-col border border-border bg-bg-secondary rounded-xl p-2 z-50">
                            {charts.map((item, i) => (
                                <button
                                    key={i}
                                    onClick={() => onSelectChart(item.value)}
                                    className="w-full text-left text-sm p-2 cursor-pointer rounded-xl hover:bg-bg-hover"
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex flex-col gap-3 mt-3">
                    {sidebarItems.map((items, i) => (
                        <SidebarButton
                            key={i}
                            icon={items.icon}
                            label={items.label}
                            onClick={items.onClick}
                        />
                    ))}
                </div>
            </div>

            <div className="mt-auto flex w-full relative">
                <SidebarButton
                    onClick={() => setSettingMenuOpen((prev) => !prev)}
                    icon={Settings}
                    label="Settings"
                    rightIcon={ChevronUp} />
                {settingsMenuOpen && (
                    <div className="absolute bottom-full left-0 w-full p-2 mb-3 flex flex-col gap-2 items-start bg-bg-secondary rounded-md">
                        <SidebarButton icon={User} label="Account" />
                        <SidebarButton icon={MessageCircleQuestionMark} label="Help" />
                        <SidebarButton icon={LogOut} label="Log Out" />
                    </div>
                )}
            </div>
        </aside>
    )
}
