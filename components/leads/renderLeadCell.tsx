import React, {SetStateAction} from "react";
import {DateFormatterOptions} from "@react-aria/i18n";
import {Lead, LeadsApi} from "../../definitions";
import {DeleteItemsLayout} from "../table/deleteItemssLayout";
import {DeleteIcon} from "../icons/table/delete-icon";
import {Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, getKeyValue, Tooltip} from "@nextui-org/react";
import {PhoneIcon} from "../icons/phone-icon";
import Link from "next/link";
import {MailIcon} from "../icons/mail-icon";

const leadsApi = new LeadsApi()

interface Props {
    item: Lead
    columnKey: string | React.Key,
    setRefreshData: React.Dispatch<SetStateAction<boolean>>
}

const reasons = {
    CALLBACK: <Chip size="sm" variant="flat" color="primary" className={"whitespace-nowrap"}>
        <span className="capitalize text-xs">Обратный звонок</span>
    </Chip>,
    ADMISSION: <Chip size="sm" variant="flat" color="secondary" className={"whitespace-nowrap"}>
        <span className="capitalize text-xs">Поступление</span>
    </Chip>
}

export const RenderLeadCell = ({item, columnKey, setRefreshData}: Props) => {
    const changeStatus = async (key: React.Key) => {
        await leadsApi.updateLead({...item, status: key === "true"});
        setRefreshData(value => !value);
    }

    const cellValue = getKeyValue(item, columnKey);
    switch (columnKey) {
        case "reason":
            // @ts-ignore
            return <>{reasons[cellValue]}</>;
        case "status":
            return (
                <Dropdown>
                    <DropdownTrigger>
                        <Chip
                            size="sm"
                            variant="flat"
                            color={cellValue ? "success" : "default"}
                        >
                            <span
                                className="capitalize text-xs whitespace-nowrap">{cellValue ? "Обработана" : "Не обработана"}</span>
                        </Chip>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Статус" onAction={changeStatus}>
                        <DropdownItem key="true" className="text-success" color="success" textValue={"true"}>
                            <span className="capitalize text-xs whitespace-nowrap">Обработана</span>
                        </DropdownItem>
                        <DropdownItem key="false" textValue={"false"}>
                            <span className="capitalize text-xs whitespace-nowrap">Не обработана</span>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>

            );
        case "actions":
            return (
                <div className="flex items-center gap-4">
                    <div>
                        <Tooltip content={item.number}>
                            <Link href={`tel:${item.number}`} target={"_blank"}>
                                <PhoneIcon/>
                            </Link>
                        </Tooltip>
                    </div>
                    <div>
                        <Tooltip content={item.email}>
                            <Link href={`mailto:${item.email}`} target={"_blank"}>
                                <MailIcon/>
                            </Link>
                        </Tooltip>
                    </div>
                    <div>
                        <DeleteItemsLayout items={[item.id]}
                                           deleteFunc={leadsApi.deleteLeads}
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
