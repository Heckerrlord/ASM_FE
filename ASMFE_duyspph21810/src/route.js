var app = angular.module("myModule", ["ngRoute"]);
// Chuyen trang

app.config(function ($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix("");
  $routeProvider
    .when("/home", {
      templateUrl: "pages/home.html",
      controller: productController,
    })
    .when("/shop", {
      templateUrl: "pages/shop.html",
      controller: productController,
    })
    .when("/detail/:id", {
      templateUrl: "pages/detail.html",
      controller: detailController,
    })
    .when("/about", {
      templateUrl: "pages/about.html",
    })
    .when("/blog", {
      templateUrl: "pages/blog.html",
    })
    .when("/contact", {
      templateUrl: "pages/contact.html",
    })
    .when("/shopcart", {
      templateUrl: "pages/shopcart.html",
      controller: productController,
    })
    .when("/account", {
      templateUrl: "pages/account.html",
      controller: productController,
    })

    .otherwise({
      redirectTo: "/home",
    });
});
