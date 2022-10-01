import {type MetaFunction} from "@remix-run/node";
import {mdiGithub, mdiLinkedin, mdiEmail} from "@mdi/js";
import Icon from "@mdi/react";
import IconButton from "@mui/material/IconButton";

export const meta: MetaFunction = () => {
    return {title: "Contact"}
}

export default function ContactsPage() {
    return (
        <div className="h-[calc(100vh-64px)] flex gap-x-2 lg:gap-x-5 justify-center items-center">
            <IconButton color="inherit" component="a" href="https://github.com/johnGachihi" target="_blank">
                <Icon path={mdiGithub} className="w-12"/>
            </IconButton>
            <IconButton color="inherit" component="a" href="https://linkedin.com/in/john-gachihi/" target="_blank">
                <Icon path={mdiLinkedin} className="w-12"/>
            </IconButton>
            <IconButton color="inherit" component="a" href="mailto:johngachihi3@gmail.com" target="_blank">
                <Icon path={mdiEmail} className="w-12"/>
            </IconButton>
        </div>
    )
}