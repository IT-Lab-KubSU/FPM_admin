export interface IColumnProps<T> {
    uid: string;
    sortName?: T;
    name: string;
    hide?: boolean;
    align?: 'start' | 'center' | 'end';
}
