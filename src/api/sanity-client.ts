import sanityClient from "@sanity/client"

const client = sanityClient({
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
  dataset: process.env.REACT_APP_SANITY_DATASET,
  apiVersion: '2022-03-17',
  useCdn: false,
  withCredentials: true
})

export { client as sanityClient }