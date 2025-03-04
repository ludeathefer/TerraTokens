import {
  Brain,
  Caravan,
  FileSpreadsheet,
  Flower,
  GitCompareArrows,
  House,
  Layers2,
  Menu,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react"; // Import for Lucide icon type

const sidebarItems = [
  { to: "/", icon: House, label: "Dashboard" },
  { to: "/marketplace", icon: FileSpreadsheet, label: "Marketplace" },
  // {to:"/transaction-history"}
  { to: "/history", icon: Flower, label: "History" },
  // {to:"/land-detail"}
];

import { FC } from "react";
import { Separator } from "../ui/separator";

interface SidebarButtonProps {
  to: string;
  icon: LucideIcon;
  label: string;
  isActive: boolean;
  sidebarExpanded: boolean;
}
interface SidebarProps {
  className?: string;
  sidebarExpanded: boolean;
  setSidebarExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  activePage: string;
}

const SidebarButton: FC<SidebarButtonProps> = ({
  to,
  icon: Icon,
  label,
  isActive,
  sidebarExpanded,
}) => {
  return (
    <Link to={to}>
      <Button
        variant={isActive ? "secondary" : "ghost"}
        size="sm"
        className={cn(
          "w-full flex justify-start",
          sidebarExpanded ? "" : "rounded-full justify-center",
          isActive
            ? "dark:text-[#0C8CE9] border border-[#C8C8C8] dark:bg-[#F1F1F1]  dark:hover:bg-[#F1F1F1] "
            : " dark:hover:bg-[#F1F1F1] dark:hover:text-black "
        )}
      >
        <Icon className={cn(sidebarExpanded ? "mr-2 h-4 w-4" : "")} />
        <p className={cn(sidebarExpanded ? "block" : "hidden")}>{label}</p>
      </Button>
    </Link>
  );
};

export const Sidebar: FC<SidebarProps> = ({
  className,
  sidebarExpanded,
  setSidebarExpanded,
  activePage,
}) => {
  return (
    <div className={cn("pb-12 bg-white border-r border-white/10", className)}>
      <div className="space-y-4 py-4 min-w-20">
        <div className="px-4 py-2">
          <div
            className={cn(
              "flex flex-row items-center mb-1 text-black ",
              sidebarExpanded ? "" : "justify-center"
            )}
          >
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setSidebarExpanded(!sidebarExpanded)}
              className={cn(
                "w-full flex justify-start dark:hover:bg-[#F1F1F1]",
                sidebarExpanded ? "" : "rounded-full justify-center"
              )}
            >
              <Menu className={cn(sidebarExpanded ? "mr-2 h-4 w-4" : "")} />
              <h2
                className={
                  sidebarExpanded
                    ? "block text-lg font-bold tracking-tight"
                    : "hidden"
                }
              >
                TerraTokens
              </h2>
            </Button>
          </div>
          <div className="space-y-1 text-black ">
            {sidebarItems.map((item, index) => (
              <div key={index}>
                <SidebarButton
                  to={item.to}
                  icon={item.icon}
                  label={item.label}
                  isActive={activePage === item.to}
                  sidebarExpanded={sidebarExpanded}
                />
                {index === 2 || index === 3 ? (
                  <Separator className="mt-1 dark:bg-white/10" />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
