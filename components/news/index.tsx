import {
    Button, Chip,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Tooltip,
    User
} from "@nextui-org/react";
import Link from "next/link";
import React, {Key, useState} from "react";
import {TrashIcon} from "../icons/accounts/trash-icon";
import {HouseIcon} from "../icons/breadcrumb/house-icon";
import {IColumnProps, TableWrapper} from "../table";
import {AddNew} from "./addNew";
import {RenderNewCell} from "./renderNewCell";
import {DownloadIcon} from "../icons/download-icon";
import {New, NewsApi} from "../../definitions";
import {DeleteNewsLayout} from "./deleteNewsLayout";

const newAPI = new NewsApi()

export const NewColumns: IColumnProps[] = [
    {name: 'ID', uid: 'id'},
    {name: 'Название', uid: 'title'},
    {name: 'Статус', uid: 'status'},
    {name: 'Дата', uid: 'creationTime'},
    {name: 'Действия', uid: 'actions', hide: true},
];

export const News = () => {
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState<number[]>([]);
    const [isOpen, onOpenChange] = useState<boolean>(false);
    const [refreshData, setRefreshData] = useState(false);

    function getItems(limit: number, page: number, sort?: string) {
        return newAPI.getNews(limit, page, sort, search);
    }

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
                                setSearch(event.target.value)
                            }
                        }}
                        placeholder="Найти новость"
                    />
                    <DeleteNewsLayout items={selected}
                                      setRefreshData={setRefreshData}
                                      color={"danger"}
                                      tooltipContent={"Удалить выбранное"}>
                        <Chip color="danger" className={"h-unit-10 px-3"} radius={"md"}>
                            <TrashIcon/>
                        </Chip>
                    </DeleteNewsLayout>
                </div>
                <div className="flex flex-row gap-3.5 flex-wrap">
                    <AddNew setRefreshData={setRefreshData}/>
                    <Button color="primary" startContent={<DownloadIcon height={"20"} width={"20"}/>}>
                        Выгрузить в csv
                    </Button>
                </div>
            </div>
            <div className="max-w-[95rem] mx-auto w-full">
                <TableWrapper<New>
                    getItems={getItems}
                    columns={NewColumns}
                    setRefreshData={setRefreshData}
                    refreshData={refreshData}
                    setSelected={setSelected}
                    RenderCell={RenderNewCell}/>
            </div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                            <ModalBody>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Nullam pulvinar risus non risus hendrerit venenatis.
                                    Pellentesque sit amet hendrerit risus, sed porttitor quam.
                                </p>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Nullam pulvinar risus non risus hendrerit venenatis.
                                    Pellentesque sit amet hendrerit risus, sed porttitor quam.
                                </p>
                                <p>
                                    Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
                                    dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis.
                                    Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod.
                                    Et mollit incididunt nisi consectetur esse laborum eiusmod pariatur
                                    proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Action
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}