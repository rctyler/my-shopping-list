; (function (window, document) {
  window._my = window._my || {};
  window._my.shoppingItem = window._my.shoppingItem || (function () {
    var storage = window._my.storage;

    function add(itemName) {
      var removeBtn = document.createElement("button");

      removeBtn.setAttribute("id", "remove-"+itemName);
      removeBtn.addEventListener("click", remove);
      removeBtn.setAttribute("class", "removeBtn");

      removeBtn.textContent = "Remove";
      //removeBtn.innerHTML = "<i class='fa fa-close'>";

      return removeBtn;
    }
    
    function remove(evt) {
      var listItems = storage.getShoppingList();

      var shoppingList = evt.srcElement.parentElement.parentElement;
      var item = evt.srcElement.parentElement;
      shoppingList.removeChild(item);
      
      var index = listItems.indexOf(evt.srcElement.id.split("remove-")[1].toLowerCase());
      listItems.splice(index, 1);

      storage.saveShoppingList(listItems);
    }

    return {
      add: add,
      remove: remove
    };
  }());
}(window, document));