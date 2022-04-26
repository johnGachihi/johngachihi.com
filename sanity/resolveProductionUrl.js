export default function resolveProductionUrl(document) {
  const contentType = getContentTypeName(document)
  return `https://johngachihi.me/${contentType}/${document?.slug?.current}`
}

function getContentTypeName(document) {
  switch (document?._type) {
    case "project":
      return "projects"
    default:
      return document?.type
  }
}