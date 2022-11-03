export default {
  methods: {
    showChildren (menu) {
      if (!menu.children) {
        return false
      }
      for (let subMenu of menu.children) {
        if (!subMenu.hidden) {
          return true
        }
      }
      return false
    },
    getNameOrTo (menu, isChildren) {
      return isChildren ? menu.children[0].to : menu.to
    }
  }
}
