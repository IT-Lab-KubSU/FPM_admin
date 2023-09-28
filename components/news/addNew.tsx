import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
} from "@nextui-org/react";
import React, {ChangeEvent, SetStateAction, useState} from "react";
import {PlusIcon} from "../icons/plus-icon";
import {Textarea} from "@nextui-org/input";
import {NewRequest, NewsApi} from "../../definitions";
import {fileToBase64} from "../../base64Tool";
import {Checkbox} from "@nextui-org/checkbox";

const newAPI = new NewsApi()


export const AddNew = ({setRefreshData}: {
    setRefreshData: React.Dispatch<SetStateAction<boolean>>
}) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const [formData, setFormData] = useState<NewRequest>({
        title: '',
        text: '',
        status: false,
        images: [],
    });

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        // @ts-ignore
        const {name, value, type, checked, files} = e.target;

        switch (type) {
            case "checkbox": {
                return setFormData({...formData, [name]: checked});
            }
            case "file": {
                const selectedImages: File[] = Array.from(files || []);
                return Promise.all(selectedImages.map(file => fileToBase64(file)))
                    .then(data => {
                        // @ts-ignore
                        setFormData({...formData, images: data});
                    })
                    .catch(data => setFormData({...formData}))
            }
            default: {
                return setFormData({...formData, [name]: value});
            }
        }
    }

    function addNew() {
        if (formData.text !== '' && formData.title !== '') {
            newAPI.createNew(formData)
                .then(() => {
                    setRefreshData(true);
                })
                .catch(er => console.error(er));
            return true;
        }
        return false;
    }

    return (
        <div>
            <>
                <Button onPress={onOpen} color="primary" startContent={<PlusIcon height={"15"} width={"15"}/>}>
                    Добавить новость
                </Button>
                <Modal
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    placement="top-center"
                >
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">
                                    Добавить новость
                                </ModalHeader>
                                <ModalBody>
                                    <Input isInvalid={true} label="Название"
                                           type="text"
                                           placeholder="Введите название"
                                           isRequired
                                           name="title"
                                           variant="bordered"
                                           onChange={handleChange}/>
                                    <Textarea label="Текст"
                                              variant="bordered"
                                              placeholder="Введите текст"
                                              isRequired
                                              name="text"
                                              onChange={handleChange}/>
                                    <div className={"px-2 py-1"}>
                                        <Checkbox defaultSelected
                                                  onChange={handleChange}
                                                  name="status">Статус публикации</Checkbox>
                                    </div>
                                    <div className={"px-2 py-1"}>
                                        <input type="file"
                                               multiple={true}
                                               name="images"
                                               onChange={handleChange}/>
                                    </div>

                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="flat" onClick={onClose}>
                                        Close
                                    </Button>
                                    <Button color="primary" onPress={() => {
                                        if (addNew())
                                            onClose();

                                    }}>
                                        Добавить новость
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </>
        </div>
    );
};
