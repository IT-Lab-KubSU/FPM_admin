import {Button, Input, User} from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import {DotsIcon} from "../icons/accounts/dots-icon";
import {InfoIcon} from "../icons/accounts/info-icon";
import {TrashIcon} from "../icons/accounts/trash-icon";
import {HouseIcon} from "../icons/breadcrumb/house-icon";
import {SettingsIcon} from "../icons/sidebar/settings-icon";
import {TableWrapper} from "../table";
import {AddNew} from "./addNew";
import {RenderNewCell} from "./renderNewCell";
import {columns, INewProps, news} from "./news";
import {DownloadIcon} from "../icons/download-icon";

export const News = () => {
    return (
        <div className="my-14 max-w-[95rem] px-4 mx-auto w-full flex flex-col gap-4">
            <ul className="flex gap-2">
                <li className="flex gap-2">
                    <HouseIcon/>
                    <Link href={"/"}>
                        <span>Главная</span>
                    </Link>
                    <span> / </span>
                </li>
                <li className="flex gap-2">
                    <Link href={"/news"}>
                        <span>Новости</span>
                    </Link>
                    <span> / </span>
                </li>
            </ul>

            <h3 className="text-xl font-semibold">Все новости</h3>
            <div className="flex justify-between flex-wrap gap-4 items-center">
                <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
                    <Input
                        classNames={{
                            input: "w-full",
                            mainWrapper: "w-full",
                        }}
                        placeholder="Найти новость"
                    />
                    <SettingsIcon/>
                    <TrashIcon/>
                    <InfoIcon/>
                    <DotsIcon/>
                </div>
                <div className="flex flex-row gap-3.5 flex-wrap">
                    <AddNew/>
                    <Button color="primary" startContent={<DownloadIcon height={"20"} width={"20"}/>}>
                        Выгрузить в csv
                    </Button>
                </div>
            </div>
            <div className="max-w-[95rem] mx-auto w-full">
                <TableWrapper<INewProps> items={news} columns={columns} RenderCell={RenderNewCell}/>
            </div>
        </div>
    );
};
