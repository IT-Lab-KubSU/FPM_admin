import {
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    Pagination
} from "@nextui-org/react";
import React from "react";

export interface IColumnProps {
    uid: string;
    name: string;
    hide?: boolean;
    align?: 'start' | 'center' | 'end';
}

export interface ITableProps<T> {
    items: T[]
    columns: IColumnProps[]
    RenderCell: ({item, columnKey}: { item: T, columnKey: React.Key | string }) => JSX.Element
}

export function TableWrapper<T>({items, columns, RenderCell}: ITableProps<T>) {
    return (
        <div className=" w-full flex flex-col gap-4">
            <Table
                aria-label="Example table with custom cells"
                selectionMode="multiple"
                bottomContent={
                    <div className="flex w-full justify-center">
                        <Pagination
                            isCompact
                            showControls
                            showShadow
                            color="secondary"
                            page={1}
                            total={10}
                            onChange={(page) => {
                                // toDo: setPage(page)
                                console.log(page)
                            }}
                        />
                    </div>
                }
            >
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn
                            key={column.uid}
                            hideHeader={column.hide}
                            align={column.align}
                        >
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={items}>
                    {(item) => (
                        <TableRow>
                            {(columnKey) => (
                                <TableCell>
                                    {RenderCell({item, columnKey})}
                                </TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
