"use client"
import {
    Button, Chip,
    Input
} from "@nextui-org/react";
import Link from "next/link";
import React, {useState} from "react";
import {TrashIcon} from "../icons/accounts/trash-icon";
import {HouseIcon} from "../icons/breadcrumb/house-icon";
import {AddNew} from "./addNew";
import {DownloadIcon} from "../icons/download-icon";
import {NewTable} from "./newTable";
import {DeleteItemsLayout} from "../table/deleteItemssLayout";
import {NewsApi} from "../../definitions";

const newsApi = new NewsApi()

export const News = () => {
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState<number[]>([]);
    const [refreshData, setRefreshData] = useState(false);

    return (
        <div className="my-8 max-w-[95rem] px-4 mx-auto w-full flex flex-col gap-4">
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
                        onInput={event => {
                            if (event.target) { // @ts-ignore
                                setSearch(event.target.value);
                            }
                        }}
                        placeholder="Найти новость"
                    />
                    <DeleteItemsLayout items={selected}
                                       deleteFunc={newsApi.deleteNews}
                                       setRefreshData={setRefreshData}
                                       color={"danger"}
                                       tooltipContent={"Удалить выбранное"}>
                        <Chip color="danger" className={"h-unit-10 px-3"} radius={"md"}>
                            <TrashIcon/>
                        </Chip>
                    </DeleteItemsLayout>
                </div>
                <div className="flex flex-row gap-3.5 flex-wrap">
                    <AddNew setRefreshData={setRefreshData}/>
                    <Button color="primary" startContent={<DownloadIcon height={"20"} width={"20"}/>}>
                        Выгрузить в csv
                    </Button>
                </div>
            </div>
            <div className="max-w-[95rem] mx-auto w-full">
                <NewTable search={search} setRefreshData={setRefreshData} setSelected={setSelected}
                          refreshData={refreshData}/>
            </div>
        </div>
    );
}