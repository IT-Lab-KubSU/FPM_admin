import {IColumnProps} from "../table";

export const columns: IColumnProps[] = [
    {name: 'ID', uid: 'id'},
    {name: 'Название', uid: 'title'},
    {name: 'Статус', uid: 'status'},
    {name: 'Дата', uid: 'date'},
    {name: 'Действия', uid: 'actions', hide: true},
];
