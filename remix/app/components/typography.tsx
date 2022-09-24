import type {PropsWithChildren} from "react";
import clsx from 'clsx';

interface CaptionProps {
    className?: string
}

export function Caption({children, className}: PropsWithChildren<CaptionProps>) {
    return (
        <span className={clsx(`text-xs tracking-[0.4px]`, className)}>
            {children}
        </span>
    )
}
