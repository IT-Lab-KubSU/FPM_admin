import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader, Tooltip,
    useDisclosure,
} from "@nextui-org/react";
import React, {ChangeEvent, SetStateAction, useState} from "react";
import {PlusIcon} from "../icons/plus-icon";
import {Textarea} from "@nextui-org/input";
import {NewRequest, NewsApi} from "../../definitions";
import {fileToBase64} from "../../base64Tool";
import {Checkbox} from "@nextui-org/checkbox";
import {TrashIcon} from "../icons/accounts/trash-icon";
import {omit} from "next/dist/shared/lib/router/utils/omit";

const newAPI = new NewsApi()


export const DeleteNewsLayout = ({items, setRefreshData, color, tooltipContent, children}: {
    items: number[],
    setRefreshData: React.Dispatch<SetStateAction<boolean>>,
    color: "primary" | "danger",
    tooltipContent: string,
    children: React.ReactNode
}) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    function deleteItems() {
        if (!items.length)
            return

        newAPI.deleteNews(items).then(() => {
            setRefreshData(true);
        }).catch(er => console.error(er))
    }

    return (
        <div>
            <>
                <Tooltip content={tooltipContent} color={color}>
                    <button onClick={onOpen}>
                        {children}
                    </button>
                </Tooltip>
                <Modal
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    placement="auto"
                >
                    <ModalContent>
                        {(onClose) => {
                            return items.length ?
                                <>
                                    <ModalHeader className="flex flex-col gap-1">
                                        Подтвердите удаление
                                    </ModalHeader>
                                    <ModalBody>
                                        Вы действительно хотите удалить ({items.length}) объектов?
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="danger" variant="light" onPress={onClose}>
                                            Закрыть
                                        </Button>
                                        <Button color="primary" onPress={() => {
                                            deleteItems();
                                            onClose();
                                        }}>
                                            Подтвердить
                                        </Button>
                                    </ModalFooter>
                                </>
                                :
                                <>
                                    <ModalHeader className="flex flex-col gap-1">
                                        Ничего не выбрано
                                    </ModalHeader>
                                    <ModalBody>
                                        Выберите объекты для удаления
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="danger" variant="light" onPress={onClose}>
                                            Закрыть
                                        </Button>
                                    </ModalFooter>
                                </>
                        }
                        }
                    </ModalContent>
                </Modal>
            </>
        </div>
    );
};
