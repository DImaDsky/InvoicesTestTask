invApp.component('productsListComponent', {
    bindings: {
        prodListPromise: '<'
    },
    controller: function () {
        var $ctrl = this;

        this.$onInit = function() {//ProductsService.query()
            $ctrl.prodListPromise.$promise.then(function (res) {
                $ctrl.products = res;
            });
        };
    },
    templateUrl: 'js/ProductsListComponent/ProductsList.html',
});