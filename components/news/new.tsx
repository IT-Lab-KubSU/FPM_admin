'use client'
import {
    Button, Chip,
    Input
} from "@nextui-org/react";
import Link from "next/link";
import React, {useEffect, useState, use} from "react";
import {TrashIcon} from "../icons/accounts/trash-icon";
import {HouseIcon} from "../icons/breadcrumb/house-icon";
import {AddNew} from "./addNew";
import {DownloadIcon} from "../icons/download-icon";
import {NewTable} from "./newTable";
import {DeleteItemsLayout} from "../table/deleteItemssLayout";
import {New as INew, NewsApi} from "../../definitions";
import {DateFormatterOptions} from "@react-aria/i18n";
import {Image} from "@nextui-org/image";

const newsApi = new NewsApi()

interface INewProps {
    id: number
}

export const New = ({id}: INewProps) => {
    const {data} = use(newsApi.getNewById(id));
    // const [data, setData] = useState<INew>({
    //     id: 0,
    //     title: "",
    //     text: "",
    //     images: [],
    //     status: true,
    //     creationTime: 0,
    // });
    //
    // useEffect( () => {
    //     newsApi.getNewById(id).then(({data}) => {
    //         setData(data)
    //     })
    // }, [id])
    //

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
                <li className="flex gap-2">
                    <Link href={`/news/${id}`}>
                        <span>{id}</span>
                    </Link>
                    <span> / </span>
                </li>
            </ul>

            <h3 className="font-semibold">Новость #{id}</h3>
            <h1 className={"text-2xl font-semibold"}>{data.title}</h1>
            <div className={"flex gap-4"}>
                {data.images.map((image) => <>
                    <Image
                        src={image}
                        alt={""}
                    />
                </>)}
            </div>
            <div>
                {data.text}
            </div>
            <div>
                <Chip size="md" variant="flat" color="primary" className={"whitespace-nowrap"}>
                    {new Date(data.creationTime).toLocaleString("ru-RU", {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric'
                    })}
                </Chip>
            </div>
        </div>
    );
}