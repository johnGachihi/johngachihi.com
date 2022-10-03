import clsx from "clsx";
import type {ReactNode} from "react";
import {Caption} from "~/components/typography";

interface Props {
    icon?: ReactNode
    text: string
    link: string
    className?: string
}

export function ProjectLink({icon: Icon, text, link, className}: Props) {
    return (
        <a href={link}
           className={clsx("no-underline text-inherit rounded-md  border border-black py-1.5 px-3 flex items-center w-fit", className)}
        >
            {Icon}
            <Caption className="ml-2">{text}</Caption>
        </a>
    )
}