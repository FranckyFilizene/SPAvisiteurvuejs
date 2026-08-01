
import { addIcons } from 'oh-vue-icons'
import * as FaIcons from 'oh-vue-icons/icons/fa'

export function setupIcons() {
  addIcons(...Object.values(FaIcons))
}