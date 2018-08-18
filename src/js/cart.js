; (function (window, document) {
  window._my = window._my || {};
  window._my.shoppingCart = window._my.shoppingCart || (function () {
    var shoppingItem = window._my.shoppingItem;
    var list = document.querySelector("#shopping-list");
    var itemInput = document.querySelector("#shopping-item");
    var storage = window._my.storage;

    function init() {
      storage
        .getShoppingList()
        .forEach(function(itm) {
          return list.appendChild(_newShoppingItem(itm))
        });
    }

    function add() {
      var listItems = storage.getShoppingList();
      var hasItem = listItems.map(function(x) {
        return x.toLowerCase();
      }).includes(itemInput.value.toLowerCase());

      if (hasItem) {
        return;
      }

      // Add item to the shopping list
      list.appendChild(_newShoppingItem(itemInput.value));

      // Add item to the saved list
      listItems.push(itemInput.value);
      storage.saveShoppingList(listItems);

      // Reset input and focus
      itemInput.focus();
      _resetInput();
    }

    function _resetInput() {
      itemInput.value = "";
    }

    function _newShoppingItem(name) {
      var newShoppingItem = document.createElement("li");
      newShoppingItem.appendChild(document.createTextNode(name));
      newShoppingItem.appendChild(shoppingItem.add(name.toLowerCase()));
      return newShoppingItem;
    }
    
    return {
      init: init,
      add: add
    };
  }());
}(window, document));
