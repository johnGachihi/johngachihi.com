import Icon from '@mdi/react';
import { mdiArrowRight } from '@mdi/js';
import { Link } from "@remix-run/react";
import logo from "../../public/images/logo.svg"
import logoWrapped from "../../public/images/logo-wrapped.svg"

export default function Index() {
  return (
    <div className="flex h-screen pt-12 mx-8 sm:justify-center sm:items-center sm:pb-14 xShort:h-[130vh]">
      <div>
        <header>
          <h1 aria-label="John Gachihi">
            <picture>
              <source media="(max-width: 640px)" srcSet={logoWrapped} />
              <img src={logo} alt="John Gachihi logo" className="mt-2 mb-10 w-[265px] h-[194px] sm:w-[422px] sm:h-[82px]" aria-hidden />
            </picture>
          </h1>
        </header>

        <Link to="/articles" className="emphatic-link mb-8 space-x-2">
          <h2 className="h5">Articles</h2>
          <Icon path={mdiArrowRight} size={1} />
        </Link>

        <Link to="/projects" className="emphatic-link mb-8 space-x-2">
          <h2 className="h5">Projects</h2>
          <Icon path={mdiArrowRight} size={1} />
        </Link>

        <Link to="/contacts" className="emphatic-link mb-8 space-x-2">
          <h2 className="h5">Contacts</h2>
          <Icon path={mdiArrowRight} size={1} />
        </Link>
      </div>
    </div>
  )
}
