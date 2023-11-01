"use client"
import {
    Chip, getKeyValue,
    Table,
    TableBody, TableCell, TableColumn,
    TableHeader, TableRow
} from "@nextui-org/react";
import React from "react";
import {Subject} from "../../definitions";

export const CurriculumTable = ({key, value}: { key: string, value: Subject[] }) => {
    return <Table removeWrapper isStriped aria-label={key + "-table"}>
        <TableHeader>
            <TableColumn key={"title"}>Название</TableColumn>
            <TableColumn key={"credit"}>Зачет</TableColumn>
            <TableColumn key={"exam"}>Экзамен</TableColumn>
            <TableColumn key={"hours"}>Часы</TableColumn>
        </TableHeader>
        <TableBody>
            {value.map((sub, index) =>
                <TableRow key={index}>
                    {(columnKey) => {
                        let cellValue = getKeyValue(sub, columnKey);

                        if (typeof cellValue === "boolean")
                            cellValue = cellValue ? <Chip color="primary">+</Chip> :
                                <Chip color="default">-</Chip>;
                        return <TableCell>{cellValue}</TableCell>
                    }}
                </TableRow>
            )}
        </TableBody>
    </Table>
}