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

    function removeAll() {
      list.innerHTML = "";
      storage.saveShoppingList([]);
    }

    function stylize() {
      document.querySelector("body").classList.add('stylized');
      document.querySelector("#stylizeBtn").setAttribute("hidden", "true");
      document.querySelector("#unstylizeBtn").removeAttribute("hidden", "true");
    }

    function unstylize() {
      document.querySelector("body").classList.remove('stylized');
      document.querySelector("#stylizeBtn").removeAttribute("hidden", "true");
      document.querySelector("#unstylizeBtn").setAttribute("hidden", "true");
    }

    function _resetInput() {
      itemInput.value = "";
    }

    function _newShoppingItem(name) {
      var newShoppingItem = document.createElement("li");
      var textItem = document.createElement("label");

      textItem.appendChild(document.createTextNode(name));
      textItem.setAttribute("class", "item");

      newShoppingItem.appendChild(textItem);
      newShoppingItem.appendChild(shoppingItem.add(name.toLowerCase()));
      return newShoppingItem;
    }
    
    return {
      init: init,
      add: add,
      removeAll: removeAll,
      stylize: stylize,
      unstylize: unstylize
    };
  }());
}(window, document));
