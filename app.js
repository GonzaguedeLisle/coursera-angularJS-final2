(function () {
    'use strict';

    angular.module("ShoppingListCheckOff", [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController (ShoppingListCheckOffService) {
        //Represents the scope
        var toBuyItems = this ;
        
        //Fetchs the items to build the shopping list
        toBuyItems.list = ShoppingListCheckOffService.getToBuyItems();

        //Removes the item from the shopping list and adds it the the list of bought items
        toBuyItems.removeItem = function (index) {
            ShoppingListCheckOffService.itemBought(index);
            ShoppingListCheckOffService.getMessage();
            console.log(ShoppingListCheckOffService.getMessage());
        }
    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController (ShoppingListCheckOffService) {
        //Represents the scope
        var boughtItems = this ;

        //Retrieves the list of bought items for display
        boughtItems.list = ShoppingListCheckOffService.getBoughtItems();
    }

    function ShoppingListCheckOffService () {
        var service = this;

        //Arrays for storing data
        var toBuyArray = ['1 bottle of milk', '10 eggs', '20 cereal boxes', '40 forks',  '60 saxophones', '80 computers'];
        var boughtArray = [];

        service.itemBought = function (index) {
            if (boughtArray)
            boughtArray.push(toBuyArray[index]);
            toBuyArray.splice(index, 1);
        }

        service.getToBuyItems = function () {
                return toBuyArray;
        }

        service.getBoughtItems = function () {
                return boughtArray;
        }
    }
})();