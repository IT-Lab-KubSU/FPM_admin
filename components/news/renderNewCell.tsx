import {Tooltip, Chip, DropdownTrigger, DropdownMenu, DropdownItem, Dropdown, getKeyValue} from "@nextui-org/react";
import React, {SetStateAction} from "react";
import {DeleteIcon} from "../icons/table/delete-icon";
import {EditIcon} from "../icons/table/edit-icon";
import {EyeIcon} from "../icons/table/eye-icon";
import {DateFormatterOptions} from "@react-aria/i18n";
import {New, NewsApi} from "../../definitions";
import {DeleteItemsLayout} from "../table/deleteItemssLayout";
import Link from "next/link";

const newsApi = new NewsApi()

interface Props {
    item: New
    columnKey: string | React.Key,
    setRefreshData: React.Dispatch<SetStateAction<boolean>>
}

export const RenderNewCell = ({item, columnKey, setRefreshData}: Props) => {
    const changeStatus = async (key: React.Key) => {
        await newsApi.updateNew({...item, status: key === "true"});
        setRefreshData(value => !value);
    }
    const cellValue = getKeyValue(item, columnKey);
    switch (columnKey) {
        case "status":
            return (
                <Dropdown>
                    <DropdownTrigger>
                        <Chip
                            size="sm"
                            variant="flat"
                            color={cellValue ? "success" : "default"}
                        >
                            <span className="capitalize text-xs">{cellValue ? "Активна" : "Скрыта"}</span>
                        </Chip>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Статус" onAction={changeStatus}>
                        <DropdownItem key="true" className="text-success" color="success" textValue={"true"}>
                            <span className="capitalize text-xs whitespace-nowrap">Активна</span>
                        </DropdownItem>
                        <DropdownItem key="false" textValue={"false"}>
                            <span className="capitalize text-xs whitespace-nowrap">Скрыта</span>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            );

        case "actions":
            return (
                <div className="flex items-center gap-4 ">
                    <div>
                        <Tooltip content="Подробнее">
                            <Link href={`/news/${item.id}`}>
                                <EyeIcon size={20} fill="#979797"/>
                            </Link>
                        </Tooltip>
                    </div>
                    <div>
                        <Tooltip content="Изменить" color="secondary">
                            <Link href={`/news/${item.id}`}>
                                <EditIcon size={20} fill="#979797"/>
                            </Link>
                        </Tooltip>
                    </div>
                    <div>
                        <DeleteItemsLayout items={[item.id]}
                                           deleteFunc={newsApi.deleteNews}
                                           setRefreshData={setRefreshData}
                                           color={"danger"}
                                           tooltipContent={"Удалить"}>
                            <DeleteIcon size={20} fill="#FF0080"/>
                        </DeleteItemsLayout>
                    </div>
                </div>
            );
        case "creationTime":
            const date = new Date(item.creationTime);
            const options: DateFormatterOptions = {
                hour: 'numeric',
                minute: 'numeric',
                year: 'numeric',
                month: 'numeric',
                day: 'numeric'
            };
            return <>{date.toLocaleString("ru-RU", options)}</>;

        default:
            return <>{cellValue}</>;
    }
};
