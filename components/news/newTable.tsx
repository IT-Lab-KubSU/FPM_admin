import {
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    Pagination, SortDescriptor
} from "@nextui-org/react";
import React, {SetStateAction, useEffect} from "react";
import {Spinner} from "@nextui-org/spinner";
import {Selection} from "@react-types/shared/src/selection";
import {NewsApi, NewsFilterSortFieldEnum, PageNew} from "../../definitions";
import {RenderNewCell} from "./renderNewCell";
import {IColumnProps} from "../table";

export const NewColumns: IColumnProps<NewsFilterSortFieldEnum>[] = [
    {name: 'ID', uid: 'id'},
    {name: 'Название', uid: 'title'},
    {name: 'Статус', uid: 'status'},
    {name: 'Дата', uid: 'creationTime'},
    {name: 'Действия', uid: 'actions', hide: true},
];

const newAPI = new NewsApi()

interface INewTable {
    search: string,
    setRefreshData: React.Dispatch<SetStateAction<boolean>>
    setSelected: React.Dispatch<SetStateAction<number[]>>
    refreshData: boolean
}

export function NewTable({search, setRefreshData, refreshData, setSelected}: INewTable) {
    const columns = NewColumns;
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [page, setPage] = React.useState(1);
    const [pages, setPages] = React.useState(1);
    const [data, setData] = React.useState<PageNew>({
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
        let isMounted = true;
        const fetchData = () => {
            setLoading(true);
            newAPI.getNews({
                limit: 100,
                page: 0,
                sortField: columns.filter(col => col.uid === sortDescriptor.column)[0].sortName ?? "ID",
                sortOrder: sortDescriptor.direction === "ascending" ? "ASC" : "DESC",
                search: search
            })
                .then(
                    ({data}) => {
                        const p = Math.max(data.totalPages, 1)
                        setPages(p);
                        setPage(Math.max(Math.min(data.page + 1, p), 1));

                        setData(data);
                        setLoading(false);
                    }
                )
                .catch(error => {
                    console.error(error);
                    if (isMounted) {
                        setTimeout(() => {
                            fetchData();
                        }, 5000);
                    }
                });
        }

        fetchData();

        return () => {
            isMounted = false;
        }
    }, [page, rowsPerPage, sortDescriptor, columns, refreshData, search])

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
                                    {RenderNewCell({item, columnKey, setRefreshData})}
                                </TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
