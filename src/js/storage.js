; (function (localStorage) {
  window._my = window._my || {}
  window._my.storage = window._my.storage || (function () {
    function getShoppingList() {
      return JSON.parse(localStorage.getItem("shoppinglist")) || [];
    }

    function saveShoppingList(list) {
      localStorage.setItem("shoppinglist", JSON.stringify(list));
    }

    return { 
      getShoppingList: getShoppingList,
      saveShoppingList: saveShoppingList
     };
  }());
}(localStorage));