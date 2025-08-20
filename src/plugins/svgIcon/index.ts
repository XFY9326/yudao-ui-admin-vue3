import 'virtual:svg-icons-register'

import { addCollection } from '@iconify/iconify'

Promise.all([
  import('@iconify/json/json/ep.json'),
  import('@iconify/json/json/fa.json'),
  import('@iconify/json/json/fa-solid.json'),
  import('@/assets/icons/carbon-slim.json'),
  import('@/assets/icons/emojione-monotone-slim.json'),
  import('@/assets/icons/fontisto-slim.json'),
  import('@/assets/icons/icon-park-outline-slim.json'),
  import('@/assets/icons/ion-slim.json'),
  import('@/assets/icons/mdi-slim.json'),
  import('@/assets/icons/radix-icons-slim.json'),
  import('@/assets/icons/zmdi-slim.json')
]).then((icons) => {
  icons.forEach((icon) => addCollection(icon.default))
})
