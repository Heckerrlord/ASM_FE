window.productController = function ($http, $rootScope, $scope) {
  // $scope.file = document.getElementById("image1").value;
  $scope.filename = "";

  $scope.formProduct = {
    name: "",
    price: 0,
    typeID: "",
    info: "",
    image: "",
  };

  //fill list full
  $rootScope.listProduct = [];
  $http.get(productAPI).then(function (response) {
    $rootScope.listProduct = response.data;
  });
  //chuyển tab
  $scope.current_tab = 1;

  $scope.changeTab = function (index) {
    event.preventDefault();
    $scope.current_tab = index;
  };

  //del product
  $scope.deleteProduct = function (event, id) {
    var r = confirm("Bạn có chắc muốn xóa sản phẩm này?");
    if (r == true) {
      event.preventDefault();
      alert("Xóa thành công");
      $http.delete(productAPI + "/" + id);
    } else {
      alert("Hủy xóa");
    }
  };

  //detailProduct
  $scope.detailProduct = function (id) {
    var sp = $rootScope.listProduct.find(function (tv) {
      return tv.id === id;
    });
    if (sp != null) {
      $scope.id = sp.id;
      $scope.formProduct.name = sp.name;
      $scope.formProduct.price = sp.price;
      $scope.formProduct.image = sp.image;
      $scope.formProduct.typeID = sp.typeID;
      $scope.formProduct.info = sp.info;
    }
  };
  //lấy ảnh
  $scope.printf = function () {
    var file = document.getElementById("image");
    file.addEventListener("change", function (event) {
      const { files } = event.target;
      filename = files[0].name;
      console.log(filename);
    });
  };

  $scope.tenanh = function () {
    $scope.formProduct.image = filename;
  };
  // add
  $scope.addProduct = function (event) {
    event.preventDefault();
    if ($scope.formProduct.$invalid) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    } else {
      var r = confirm("Bạn có chắc muốn thêm sản phẩm này?");
      if (r == true) {
        $http.post(productAPI, $scope.formProduct).then(function (response) {
          $rootScope.listProduct.push(response.data);
          alert("Thêm thành công");
        });
      } else {
        alert("Hủy thêm sản phẩm");
      }
    }
  };

  //làm mới
  $scope.refreshProduct = function (event) {
    event.preventDefault();
    $scope.id = "";
    $scope.formProduct.name = "";
    $scope.formProduct.price = 0;
    $scope.formProduct.image = "";
    $scope.formProduct.typeID = "";
    $scope.formProduct.info = "";
  };
  $scope.refreshCate = function (event) {
    event.preventDefault();
    $scope.cid = "";
    $scope.formCate.name = "";
  };
  //update
  $scope.updateProduct = function (event) {
    event.preventDefault();
    if ($scope.formProduct.$invalid) {
      event.preventDefault();
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    } else {
      var r = confirm("Bạn có chắc muốn sửa sản phẩm này?");
      if (r == true) {
        $http.put(productAPI + "/" + $scope.id, $scope.formProduct);
        alert("Sửa thành công");
      } else {
        alert("Hủy sửa sản phẩm");
      }
    }
  };

  $rootScope.listCate = [];
  $scope.formCate = {
    name: "",
  };
  // CATE
  //fill list full
  $http.get(cateAPI).then(function (response) {
    $rootScope.listCate = response.data;
  });

  //Xóa loại sản phẩm
  $scope.deleteCate = function (event, id) {
    var r = confirm("Bạn có chắc muốn xóa sản phẩm này?");
    if (r == true) {
      event.preventDefault();
      $scope.chk = true;
      for (let i = 0; i < $rootScope.listProduct.length; i++) {
        if (id == $rootScope.listProduct[i].typeID) {
          $scope.chk = false;
        }
      }
      if ($scope.chk) {
        $http.delete(cateAPI + "/" + id);
        alert("Xóa thành công");
      } else {
        alert("Xóa thất bại, không thể xóa loại sản phẩm còn hàng");
      }
    } else {
      alert("Hủy xóa");
    }
  };

  //detailProduct
  $scope.detailCate = function (id) {
    var cate = $scope.listCate.find(function (tv) {
      return tv.id === id;
    });

    if (cate != null) {
      $scope.cid = cate.id;
      $scope.formCate.name = cate.name;
    }
  };

  $scope.addCate = function (event) {
    if ($scope.formCate.$invalid) {
      event.preventDefault();
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    } else {
      var r = confirm("Bạn có chắc muốn thêm loại sản phẩm này?");
      if (r == true) {
        $http.post(cateAPI, $scope.formCate).then(function (response) {
          $scope.listCate.push(response.data);
          alert("Thêm thành công");
        });
      } else {
        alert("Hủy thêm loại sản phẩn");
      }
    }
  };
  //update
  $scope.updateCate = function (event) {
    event.preventDefault();
    if ($scope.formCate.$invalid || $scope.cid == undefined) {
      event.preventDefault();
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    } else {
      var r = confirm("Bạn có chắc muốn cập nhật loại sản phẩm này?");
      if (r == true) {
        $http.put(cateAPI + "/" + $scope.cid, $scope.formCate);
        alert("Sửa thành công");
      } else {
        alert("Hủy sửa loại sản phẩm");
      }
    }
  };
  // Lọc sản phẩm
  $http.get(productAPI).then(function (response) {
    $scope.filProducts = response.data;
  });

  $scope.filList = function () {
    if ($scope.as == "") {
      $scope.filProducts = $rootScope.listProduct;
    } else {
      $scope.filProducts = $rootScope.listProduct.filter(function (product) {
        return product.typeID === $scope.as;
      });
    }
    console.log($rootScope.filProducts);
  };

  // add to cart
  $rootScope.cartList = [];
  $http.get(cartAPI).then(function (response) {
    $rootScope.cartList = response.data;
  });

  $scope.addToCart = function (event, productId) {
    // Tìm sản phẩm theo id trong danh sách sản phẩm
    $rootScope.sptoCart = $rootScope.listProduct.find(function (p) {
      return p.id === productId;
    });
    $scope.mathang = {
      id: "",
      idSP: $scope.sptoCart.id,
      tenSP: $scope.sptoCart.name,
      gia: $scope.sptoCart.price,
      anh: $scope.sptoCart.image,
    };
    // Hiển thị cửa sổ xác nhận
    var confirmed = confirm(
      "Bạn có muốn thêm sản phẩm này vào giỏ hàng không?"
    );
    if (confirmed) {
      event.preventDefault();
      $http.post(cartAPI, $scope.mathang).then(function (response) {
        $rootScope.cartList.push(response.data);
      });
      alert("Thêm thành công");
    } else {
      alert("Hủy thêm vào giỏ hàng");
    }
  };

  $scope.deleteCart = function (event, id) {
    event.preventDefault();
    var a = confirm("Bạn có chắc muốn xóa sản phẩm này?");
    if (a == true) {
      event.preventDefault();
      $http.delete(cartAPI + "/" + id);
    } else {
      alert("Hủy xóa");
    }
  };
  // $scope.closeWindow = function () {
  //   window.close();
  // };
};
