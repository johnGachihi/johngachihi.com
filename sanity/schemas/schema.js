import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

import blockContent from './blockContent'
import captionedImage from './captionedImage'
import project from './project'

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    project,

    blockContent,
    captionedImage
  ]),
})
