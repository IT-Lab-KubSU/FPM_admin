import {User, Tooltip, Chip} from "@nextui-org/react";
import React from "react";
import {DeleteIcon} from "../icons/table/delete-icon";
import {EditIcon} from "../icons/table/edit-icon";
import {EyeIcon} from "../icons/table/eye-icon";

interface Props {
    item: any
    columnKey: string | React.Key
}

export const RenderCellUsers = ({item, columnKey}: Props) => {
    const cellValue = item[columnKey];
    switch (columnKey) {
        case "name":
            return (
                <User
                    avatarProps={{
                        src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                    }}
                    name={cellValue}
                >
                    {item.email}
                </User>
            );
        case "role":
            return (
                <div>
                    <div>
                        <span>{cellValue}</span>
                    </div>
                    <div>
                        <span>{item.team}</span>
                    </div>
                </div>
            );
        case "status":
            return (
                <Chip
                    size="sm"
                    variant="flat"
                    color={
                        cellValue === "active"
                            ? "success"
                            : cellValue === "paused"
                                ? "danger"
                                : "warning"
                    }
                >
                    <span className="capitalize text-xs">{cellValue}</span>
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
        default:
            return <>{cellValue}</>;
    }
};
