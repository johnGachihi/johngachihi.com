import type {PropsWithChildren} from "react";

export default function Tags({tags}: { tags: Array<string> }) {
    return tags.length > 0
        ? (
            <ul className="flex flex-wrap gap-y-1 gap-x-3">
                {tags.map((tag) => (
                    <li key={tag}>
                        <Tag children={tag}/>
                    </li>
                ))}
            </ul>
        )
        : null

}

function Tag({children}: PropsWithChildren<{}>) {
    return <span className="bg-gray-200 text-sm px-0.5"># {children}</span>
}