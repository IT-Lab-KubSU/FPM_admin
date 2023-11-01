"use client"
import {HouseIcon} from "../icons/breadcrumb/house-icon";
import Link from "next/link";
import {
    Accordion,
    AccordionItem,
    Button,
    Input,
    Select,
    SelectItem,
} from "@nextui-org/react";
import {CONSTANTS} from "../../constants";
import React, {ChangeEvent, useEffect, useState} from "react";
import {FileToArrayBuffer, ParseFile} from "../../tool";
import {CurriculumTable} from "./CurriculumTable";
import {CurriculumApi, CurriculumRequest, Subject} from "../../definitions";

export const Curriculum = () => {
    const [data, setData] = useState(new Map<string, Subject[]>())
    const [file, setFile] = useState<File>()
    const [postBody, setPostBody] = useState<CurriculumRequest>({
        directionCode: "0",
        department: "",
        plan: {}
    })


    useEffect(() => {
        if (file)
            FileToArrayBuffer(file).then(data => {
                if (data instanceof ArrayBuffer) {
                    const parsedData = ParseFile(data);
                    const directionCodes = file.name.match(/(\d+_\d+_\d+)/g);
                    setData(parsedData);
                    setPostBody({...postBody, plan: Object.fromEntries(parsedData)});
                }
            });
        else
            setData(new Map<string, Subject[]>());
    }, [file]);


    const handleChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        // @ts-ignore
        const {name, value, type, checked, files} = e.target;
        switch (type) {
            case "file": {
                const selectedFiles: File[] = Array.from(files || []);
                if (selectedFiles.length)
                    setFile(selectedFiles[0]);
                return
            }
            default: {
                return setPostBody({...postBody, [name]: value});
            }
        }
    }

    function postPlan() {
        if (postBody.directionCode && postBody.department && Object.keys(postBody.plan).length)
            new CurriculumApi().saveCurriculum(postBody)
                .then(() => {
                    setFile(undefined);
                });
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
                    <Link href={"/curriculum"}>
                        <span>Учебный план</span>
                    </Link>
                    <span> / </span>
                </li>
            </ul>

            <h3 className="text-xl font-semibold">Учебный план</h3>
            <div className="grid gap-3 grid-cols-4 items-end">
                <Select
                    onChange={(event) => {
                        setPostBody({...postBody, directionCode: event.target.value})
                    }}
                    name={"directionCode"}
                    key={"1"}
                    isRequired
                    labelPlacement={"outside"}
                    label="Код направления"
                    placeholder="Выберите направление"
                    size={"md"}
                    fullWidth={true}
                >
                    {CONSTANTS.directionCodes.map((code) => (
                        <SelectItem key={code} value={code}>
                            {code}
                        </SelectItem>
                    ))}
                </Select>
                <Select
                    onChange={(event) => {
                        setPostBody({...postBody, department: event.target.value})
                    }}
                    name={"department"}
                    key={"3"}
                    isRequired
                    label="Кафедра"
                    labelPlacement={"outside"}
                    placeholder="Выберите кафедру"
                    size={"md"}
                    fullWidth={true}
                >
                    {CONSTANTS.departments.map((department) => (
                        <SelectItem key={department} value={department}>
                            {department}
                        </SelectItem>
                    ))}
                </Select>
                <Button
                    className={"p-0 overflow-hidden relative bg-primary-50 hover:bg-primary-100 text-primary-500"}
                    type={"button"}>
                    <span className={"absolute"}>Выбрать файл</span>
                    <Input
                        className={"h-full opacity-0"}
                        type="file"
                        name={"plan"}
                        accept={".xlsx"}
                        onChange={handleChange}/>
                </Button>
                <Button
                    onClick={postPlan}
                    className={"p-0 overflow-hidden relative bg-primary-50 hover:bg-primary-100 text-primary-500"}
                    type={"button"}
                >Отправить</Button>
            </div>
            <div className={"flex justify-between"}>
                {file ? (<>
                    <div>
                        Название: {file.name}
                    </div>
                    <div>
                        Дата изменения: {new Date(file.lastModified).toLocaleDateString()}
                    </div>
                </>) : <></>}
            </div>
            <div>
                <Accordion variant="splitted" className={"px-0"}>
                    {[...data.entries()].map(([key, value]) =>
                        <AccordionItem key={key} title={key} aria-label={key}>
                            <CurriculumTable key={key} value={value}/>
                        </AccordionItem>
                    )}
                </Accordion>
            </div>
        </div>
    );
}