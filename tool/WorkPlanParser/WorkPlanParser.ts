import {read, utils} from 'xlsx';
import {Subject} from "../../definitions";


export const ParseFile = (file: ArrayBuffer): Map<string, Subject[]> => {
    const workbook = read(file);
    const result = new Map<string, Subject[]>();
    const sheets = ['Курс 1', 'Курс 2', 'Курс 3', 'Курс 4'];
    try {
        for (const [index, sheet] of sheets.entries()) {
            const parsedCourse = ParseCourse(utils.sheet_to_json(workbook.Sheets[sheet], {header: 1}), index + 1);
            for (const [key, value] of parsedCourse) {
                result.set(key, value);
            }
        }
    } catch (e) {
        console.error(e);
        return new Map<string, Subject[]>();
    }
    return result;
}

const ParseCourse = (raw_data: any[], course: number): Map<string, Subject[]> => {
    let sem1: Subject[] = [];
    let sem2: Subject[] = [];
    const header = raw_data[2];
    for (const row of raw_data) {
        row[3] = row[3] ?? "";
        if (!parseInt(row[2]) || (course <= 2 && row[3].includes(".ДВ")) || row[3].includes("ФТД"))
            continue

        if (row[2] === '1') {
            sem1 = [];
            sem2 = [];
        }

        const row6 = row[6] ?? "";
        const row18 = row[18] ?? "";
        sem1.push({
            title: row[4],
            exam: row6.includes("Эк"),
            credit: row6.includes("За"),
            hours: row[7]
        });
        sem2.push({
            title: row[4],
            exam: row18.includes("Эк"),
            credit: row18.includes("За"),
            hours: row[19]
        });
    }
    const result = new Map<string, Subject[]>();
    result.set(header[6].toString(), sem1.filter(it => it.hours));
    result.set(header[18].toString(), sem2.filter(it => it.hours));
    return result
}
