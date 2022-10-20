export default function resolveProductionUrl(document) {
  const resourceName = getUrlResourceName(document)
  return `https://johngachihi.me/${resourceName}/${document?.slug?.current}`
}

function getUrlResourceName(document) {
  switch (document?._type) {
    case "project":
      return "projects"
    case "article":
      return "articles"
    default:
      return document?._type
  }
}