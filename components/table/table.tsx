import {
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    Pagination, SortDescriptor
} from "@nextui-org/react";
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {AxiosPromise} from "axios";
import {set} from "@internationalized/date/src/manipulation";
import {Spinner} from "@nextui-org/spinner";
import {Selection} from "@react-types/shared/src/selection";
import {Radio, RadioGroup} from "@nextui-org/radio";

export interface IColumnProps {
    uid: string;
    name: string;
    hide?: boolean;
    align?: 'start' | 'center' | 'end';
}

export interface IPage<T> {
    data: Array<T>;
    limit: number;
    page: number;
    totalElements: number;
    totalPages: number;
}

export interface ITableProps<T> {
    getItems: (limit: number, page: number, sort?: string) => AxiosPromise<IPage<T>>
    columns: IColumnProps[],
    refreshData: boolean,
    setRefreshData: React.Dispatch<SetStateAction<boolean>>,
    setSelected: React.Dispatch<SetStateAction<number[]>>,
    RenderCell: ({item, columnKey, setRefreshData}: {
        item: T,
        columnKey: React.Key | string,
        setRefreshData: React.Dispatch<SetStateAction<boolean>>
    }) => JSX.Element
}

export function TableWrapper<T>({
                                    getItems,
                                    columns,
                                    refreshData,
                                    setRefreshData,
                                    setSelected,
                                    RenderCell
                                }: ITableProps<T>) {
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [page, setPage] = React.useState(1);
    const [pages, setPages] = React.useState(1);
    const [data, setData] = React.useState<IPage<T>>({
        data: [],
        limit: rowsPerPage,
        page: page,
        totalElements: 0,
        totalPages: 1
    });
    const [loading, setLoading] = React.useState(true);
    const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
        column: "id",
        direction: "descending",
    });


    useEffect(() => {
        setRefreshData(false);
        if (sortDescriptor.column && columns.filter(col => col.hide).map(col => col.uid).includes(sortDescriptor.column.toString()))
            return
        const sort = sortDescriptor.direction === "ascending" ? `${sortDescriptor.column}` : `-${sortDescriptor.column}`;

        getItems(rowsPerPage, page - 1, sort)
            .then(
                ({data}) => {
                    const p = Math.max(data.totalPages, 1)
                    setPages(p);
                    setPage(Math.max(Math.min(data.page + 1, p), 1));

                    setData(data);
                    setLoading(false);
                }
            )
            .catch(er => console.error(er))
    }, [page, rowsPerPage, sortDescriptor, columns, getItems, refreshData, setRefreshData])

    const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);

    const onSelectionChange = React.useCallback((e: Selection) => {
        const keys = Array.from(e[Symbol.iterator]());
        setSelected(keys.map(it => Number(it)))
    }, [setSelected]);

    const topContent = React.useMemo(() => {
        return (
            <div className="flex justify-between items-center">
                <span className="text-default-400 text-small">Всего {data.totalElements} строк</span>
                <label className="flex items-center text-default-400 text-small">
                    Строк на странице:
                    <select
                        className="bg-transparent outline-none text-default-400 text-small"
                        onChange={onRowsPerPageChange}
                    >
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                    </select>
                </label>
            </div>
        );
    }, [
        data.totalElements, onRowsPerPageChange
    ]);

    return (
        <div className=" w-full flex flex-col gap-4">
            <Table
                aria-label="Example table with custom cells"
                isHeaderSticky
                selectionMode="multiple"
                onSelectionChange={onSelectionChange}
                selectionBehavior={"replace"}
                topContent={topContent}
                topContentPlacement="outside"
                bottomContentPlacement="outside"
                classNames={{
                    wrapper: "max-h-[600px]",
                }}
                bottomContent={
                    <div className="flex w-full justify-center">
                        <Pagination
                            isCompact
                            showControls
                            showShadow
                            page={page}
                            total={pages}
                            onChange={(page) => setPage(page)}
                        />
                    </div>
                }
                sortDescriptor={sortDescriptor}
                onSortChange={setSortDescriptor}
            >
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn
                            key={column.uid}
                            hideHeader={column.hide}
                            align={column.align}
                            allowsSorting={true}
                        >
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody
                    isLoading={loading}
                    loadingContent={<Spinner color="primary"/>}
                    emptyContent={<>Данные не найдены</>}
                    items={data.data}>
                    {(item) => (
                        <TableRow>
                            {(columnKey) => (
                                <TableCell>
                                    {RenderCell({item, columnKey, setRefreshData})}
                                </TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
