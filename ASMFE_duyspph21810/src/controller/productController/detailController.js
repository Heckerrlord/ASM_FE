window.detailController = function ($scope, $routeParams, $rootScope) {
  // Lấy sản phẩm chi tiết
  $scope.product = $rootScope.listProduct.find((a) => {
    return a.id === $routeParams.id;
  });
  // Tạo list sản phẩm có loại giống sản phẩm được chọn
  $scope.filteredProducts = [];

  $scope.filteredProducts = $rootScope.listProduct.filter(function (product) {
    return product.typeID === $scope.product.typeID;
  });

  //tạo list sản phẩm có giá trị giống list bên trên nhưng trừ đi sản phẩm được chọn
  $scope.listRecommen = [];

  $scope.listRecommen = $scope.filteredProducts.filter(function (pr) {
    return pr.id !== $scope.product.id;
  });
  // Tìm loại sản phẩm có giá trị id giống sản phẩm để lấy tên
  $scope.lsp = $rootScope.listCate.find(function (a) {
    return a.id === $scope.product.typeID;
  });
};
