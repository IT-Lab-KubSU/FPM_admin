import {New} from "../../../../components/news/new";

export default function Page({ params }: { params: { id: number } }) {
    return <New id={params.id}/>
}
