import {Tooltip, Chip} from "@nextui-org/react";
import React, {SetStateAction} from "react";
import {DeleteIcon} from "../icons/table/delete-icon";
import {EditIcon} from "../icons/table/edit-icon";
import {EyeIcon} from "../icons/table/eye-icon";
import {DateFormatterOptions} from "@react-aria/i18n";
import {New} from "../../definitions";
import {DeleteNewsLayout} from "./deleteNewsLayout";

interface Props {
    item: New
    columnKey: string | React.Key,
    setRefreshData: React.Dispatch<SetStateAction<boolean>>
}

export const RenderNewCell = ({item, columnKey, setRefreshData}: Props) => {
    // @ts-ignore
    const cellValue = item[columnKey];
    switch (columnKey) {
        case "title":
            return (
                <>{item.title}</>
            );
        case "status":
            return (
                <Chip
                    size="sm"
                    variant="flat"
                    color={cellValue ? "success" : "default"}
                >
                    <span className="capitalize text-xs">{cellValue ? "Активна" : "Скрыта"}</span>
                </Chip>
            );

        case "actions":
            return (
                <div className="flex items-center gap-4 ">
                    <div>
                        <Tooltip content="Details">
                            <a href={`/news/${item.id}`} target={"_blank"}>
                                <EyeIcon size={20} fill="#979797"/>
                            </a>
                        </Tooltip>
                    </div>
                    <div>
                        <Tooltip content="Изменить" color="secondary">
                            <button onClick={() => console.log("Edit user", item.id)}>
                                <EditIcon size={20} fill="#979797"/>
                            </button>
                        </Tooltip>
                    </div>
                    <div>
                        <DeleteNewsLayout items={[item.id]}
                                          setRefreshData={setRefreshData}
                                          color={"danger"}
                                          tooltipContent={"Удалить"}>
                            <DeleteIcon size={20} fill="#FF0080"/>
                        </DeleteNewsLayout>
                    </div>
                </div>
            );
        case "creationTime":
            const date = new Date(item.creationTime!);
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
