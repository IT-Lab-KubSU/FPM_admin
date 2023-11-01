import React from "react";
import { Sidebar } from "./sidebar.styles";
import { HomeIcon } from "../icons/sidebar/home-icon";
import { PaymentsIcon } from "../icons/sidebar/payments-icon";
import { BalanceIcon } from "../icons/sidebar/balance-icon";
import { DevIcon } from "../icons/sidebar/dev-icon";
import { ViewIcon } from "../icons/sidebar/view-icon";
import { SettingsIcon } from "../icons/sidebar/settings-icon";
import { CollapseItems } from "./collapse-items";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { useSidebarContext } from "../layout/layout-context";
import { usePathname } from "next/navigation";
import {NewIcon} from "../icons/new-icon";
import {FpmLogo} from "../icons/fpm-logo";
import {LeadsIcon} from "../icons/leads-icon";
import {PlanIcon} from "../icons/plan-icon";

export const SidebarWrapper = () => {
  const { collapsed, setCollapsed } = useSidebarContext();
  const pathname = usePathname()
  return (
    <aside className="h-screen z-[202] sticky top-0">
      {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed} />
      ) : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className={Sidebar.Header()}>
          <div className="flex items-center gap-2">
            <div className={"pr-3"}>
              <FpmLogo />
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-medium m-0 text-default-900 -mb-4 whitespace-nowrap">
                FPM
              </h3>
              <span className="text-xs font-medium text-default-500">
              KubSU
            </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between h-full font-semibold">
          <div className={Sidebar.Body()}>
            <SidebarItem
              title="Dashboard"
              icon={<HomeIcon />}
              isActive={pathname === "/"}
              href="/"
            />
            <SidebarMenu title="Главное меню">
              <SidebarItem
                isActive={/\/news.*/.test(pathname)}
                title="Новости"
                icon={<NewIcon />}
                href="/news"
              />
              <SidebarItem
                  isActive={/\/leads.*/.test(pathname)}
                  title="Заявки"
                  icon={<LeadsIcon />}
                  href="/leads"
              />
              <SidebarItem
                  isActive={/\/curriculum.*/.test(pathname)}
                  title="Учебный план"
                  icon={<PlanIcon />}
                  href="/curriculum"
              />
              {/*<CollapseItems*/}
              {/*  icon={<BalanceIcon />}*/}
              {/*  items={["Banks Accounts", "Credit Cards", "Loans"]}*/}
              {/*  title="Balances"*/}
              {/*/>*/}
            </SidebarMenu>

            <SidebarMenu title="Основные разделы">
              <SidebarItem
                isActive={pathname === "/settings"}
                title="Настройки"
                icon={<SettingsIcon />}
              />
            </SidebarMenu>
          </div>
        </div>
      </div>
    </aside>
  );
};
