import {
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    Pagination, SortDescriptor, Input, Dropdown, DropdownTrigger, Button, DropdownMenu
} from "@nextui-org/react";
import React, {useEffect} from "react";
import {SearchIcon} from "../icons/searchicon";
import {ChevronDownIcon} from "@nextui-org/shared-icons";
import {PlusIcon} from "../icons/plus-icon";
import {AxiosPromise} from "axios";
import {NewsApi} from "../../definitions";


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
    getItems: (limit: number, page: number) => AxiosPromise<IPage<T>>
    columns: IColumnProps[]
    RenderCell: ({item, columnKey}: { item: T, columnKey: React.Key | string }) => JSX.Element
}

export function TableWrapper<T>({getItems, columns, RenderCell}: ITableProps<T>) {
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [page, setPage] = React.useState(1);
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
        direction: "ascending",
    });


    useEffect(() => {
        getItems(rowsPerPage, page - 1).then(
            ({data}) => {
                setData(data);
                setLoading(false)
            }
        )
    }, [page, rowsPerPage])

    // const sortedItems = React.useMemo(() => {
    //     return [...SlicedItems].sort((a: T, b: T) => {
    //         const first = a[sortDescriptor.column as keyof T] as number;
    //         const second = b[sortDescriptor.column as keyof T] as number;
    //         const cmp = first < second ? -1 : first > second ? 1 : 0;
    //
    //         return sortDescriptor.direction === "descending" ? -cmp : cmp;
    //     });
    // }, [sortDescriptor, SlicedItems]);

    const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);

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
        onRowsPerPageChange
    ]);

    return (
        <div className=" w-full flex flex-col gap-4">
            <Table
                aria-label="Example table with custom cells"
                isHeaderSticky
                selectionMode="multiple"
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
                            total={data.totalPages}
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
                    emptyContent={"Данные не найдены"}
                    items={data.data}>
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
