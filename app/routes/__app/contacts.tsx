import { type MetaFunction } from "@remix-run/node";
import { mdiGithub, mdiLinkedin, mdiEmail } from "@mdi/js";
import Icon from "@mdi/react";

export const meta: MetaFunction = () => {
    return { title: "Contact" }
}

export default function ContactsPage() {
    return (
        <div className="h-[calc(100vh-64px)] flex gap-x-4 lg:gap-x-7 justify-center items-center">
            <a href="https://github.com/johnGachihi" target="_blank" aria-label="GitHub account" rel="noreferrer">
                <Icon path={mdiGithub} className="w-12" />
            </a>
            <a href="https://linkedin.com/in/john-gachihi/" target="_blank" aria-label="LinkedIn account" rel="noreferrer">
                <Icon path={mdiLinkedin} className="w-12" />
            </a>
            <a href="mailto:johngachihi3@gmail.com" target="_blank" aria-label="Email" rel="noreferrer">
                <Icon path={mdiEmail} className="w-12" />
            </a>
        </div>
    )
}