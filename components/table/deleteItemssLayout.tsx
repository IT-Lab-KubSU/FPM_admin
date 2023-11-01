import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader, Tooltip,
    useDisclosure,
} from "@nextui-org/react";
import React, {SetStateAction} from "react";
import {AxiosResponse} from "axios";

export const DeleteItemsLayout = ({items, deleteFunc, setRefreshData, color, tooltipContent, children}: {
    items: number[],
    setRefreshData: React.Dispatch<SetStateAction<boolean>>,
    deleteFunc: (items: number[]) => Promise<AxiosResponse>
    color: "primary" | "danger",
    tooltipContent: string,
    children: React.ReactNode
}) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    function deleteItems() {
        if (!items.length)
            return

        deleteFunc(items).then(() => {
            setRefreshData(value => !value);
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
