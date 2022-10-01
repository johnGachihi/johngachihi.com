import type {PropsWithChildren} from "react";

export default function Tag({children}: PropsWithChildren<{}>) {
    return <div className="bg-gray-200 text-sm px-0.5"># {children}</div>
}