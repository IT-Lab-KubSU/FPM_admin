import {IColumnProps} from "../table";

export interface INewProps {
    id: number,
    title: string,
    text: string,
    images: string[],
    status: 'Активна' | 'Скрыта',
    date: number
}

export const columns: IColumnProps[] = [
    {name: 'ID', uid: 'id'},
    {name: 'Название', uid: 'title'},
    {name: 'Статус', uid: 'status'},
    {name: 'Дата', uid: 'date'},
    {name: 'Действия', uid: 'actions', hide: true},
];
export const news: INewProps[] = [
    {
        id: 1,
        title: 'Tony Reichert',
        text: '',
        images: [],
        status: 'Скрыта',
        date: 1695123248
    },
    {
        id: 2,
        title: 'Tony Reichert',
        text: '',
        images: [],
        status: 'Активна',
        date: 1695143736
    },
    {
        id: 3,
        title: 'Tony Reichert',
        text: '',
        images: [],
        status: 'Активна',
        date: 1695143736
    },
    {
        id: 4,
        title: 'Tony Reichert',
        text: '',
        images: [],
        status: 'Активна',
        date: 1695143736
    },
    {
        id: 5,
        title: 'Tony Reichert',
        text: '',
        images: [],
        status: 'Активна',
        date: 1695143736
    },
    {
        id: 6,
        title: 'Tony Reichert',
        text: '',
        images: [],
        status: 'Активна',
        date: 1695143736
    },
    {
        id: 7,
        title: 'Tony Reichert',
        text: '',
        images: [],
        status: 'Активна',
        date: 1695143736
    },
    {
        id: 8,
        title: 'Tony Reichert',
        text: '',
        images: [],
        status: 'Активна',
        date: 1695143736
    },
    {
        id: 9,
        title: 'Tony Reichert',
        text: '',
        images: [],
        status: 'Активна',
        date: 1695143736
    },
    {
        id: 10,
        title: 'Tony Reichert',
        text: '',
        images: [],
        status: 'Активна',
        date: 1695143736
    },
    {
        id: 11,
        title: 'Tony Reichert',
        text: '',
        images: [],
        status: 'Активна',
        date: 1695143736
    },
    {
        id: 12,
        title: 'Tony Reichert',
        text: '',
        images: [],
        status: 'Активна',
        date: 1695143736
    },
];
