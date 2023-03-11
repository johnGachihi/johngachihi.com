import { useState, useRef, useEffect } from "react"
import type { ProjectSummary } from "~/models/project.server"
import { BaseProjectCard } from "./project-card"

/**
 * TODO: Improve algo and DS for getting inView Project, and code
 */

type View = {
  position: number,
  visibleAreaRatio: number
}

function ioeToView(e: IntersectionObserverEntry): View {
  return ({
    position: Number((e.target as HTMLElement).dataset.position),
    visibleAreaRatio: e.intersectionRatio
  })
}

function compareViews(a: View, b: View) {
  if (a.visibleAreaRatio !== b.visibleAreaRatio) {
    return b.visibleAreaRatio - a.visibleAreaRatio
  } else {
    return a.position - b.position
  }
}

export function InViewObservingProjectList({ projects, projectClassName }: {
  projects: Array<ProjectSummary>,
  projectClassName?: string
}) {
  const [spotlighted, setSpotlighted] = useState<number | null>(null)

  const sortedList = useRef<Array<View> | null>(null)

  const setInViewTimer = useRef<NodeJS.Timeout>()

  const intersectionObserver = useRef((() => {
    // Remix manenos
    // https://remix.run/docs/en/1.14.1/guides/constraints#md-document-guard
    if (typeof document !== "undefined")
      return new IntersectionObserver(
        (entries) => {
          if (sortedList.current == null) {
            sortedList.current = entries.map(ioeToView).sort(compareViews)
          } else {
            sortedList.current = sortedList.current.map<View>(item => {
              const entry = entries.find(entry =>
                ioeToView(entry).position === item.position)
              return entry
                ? { ...item, visibleAreaRatio: entry.intersectionRatio }
                : item
            }).sort(compareViews)
          }

          clearTimeout(setInViewTimer.current)
          setInViewTimer.current = setTimeout(() => {
            setSpotlighted(sortedList.current?.[0]?.position ?? null)
          }, 2000)
        },
        {
          root: null,
          threshold: [0, 0.25, 0.75, 1]
        }
      )
  })())

  return (
    <>
      {projects?.map((project, idx) => (
        <ProjectCard
          className={projectClassName}
          project={project}
          intersectionObserver={intersectionObserver.current}
          data-position={idx}
          key={project.id}
          inView={idx === spotlighted}
        />
      ))}
    </>
  );
}

function ProjectCard(
  { intersectionObserver, inView, ...props }: {
    project: ProjectSummary,
    inView: boolean,
    intersectionObserver?: IntersectionObserver,
    className?: string
  }) {
  const cardEl = useRef(null);

  useEffect(() => {
    if (cardEl.current && intersectionObserver) {
      const el = cardEl.current
      intersectionObserver.observe(el)

      return () => intersectionObserver.unobserve(el)
    }
  }, [intersectionObserver])

  return <BaseProjectCard ref={cardEl} onSpotlight={inView} {...props} />
}