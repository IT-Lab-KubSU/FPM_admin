import {Tooltip, Chip} from "@nextui-org/react";
import React from "react";
import {DeleteIcon} from "../icons/table/delete-icon";
import {EditIcon} from "../icons/table/edit-icon";
import {EyeIcon} from "../icons/table/eye-icon";
import {DateFormatterOptions} from "@react-aria/i18n";
import {New} from "../../definitions";

interface Props {
    item: New
    columnKey: string | React.Key
}

export const RenderNewCell = ({item, columnKey}: Props) => {
    // @ts-ignore
    const cellValue = item[columnKey];
    switch (columnKey) {
        case "title":
            return (
                <div>
                    {item.title}
                </div>
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
                            <button onClick={() => console.log("View user", item.id)}>
                                <EyeIcon size={20} fill="#979797"/>
                            </button>
                        </Tooltip>
                    </div>
                    <div>
                        <Tooltip content="Edit user" color="secondary">
                            <button onClick={() => console.log("Edit user", item.id)}>
                                <EditIcon size={20} fill="#979797"/>
                            </button>
                        </Tooltip>
                    </div>
                    <div>
                        <Tooltip
                            content="Delete user"
                            color="danger"
                            onClick={() => console.log("Delete user", item.id)}
                        >
                            <button>
                                <DeleteIcon size={20} fill="#FF0080"/>
                            </button>
                        </Tooltip>
                    </div>
                </div>
            );
        case "date":
            const date = new Date(item.creationTime!); // Умножьте на 1000, чтобы преобразовать секунды в миллисекунды
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
