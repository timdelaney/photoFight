angular.module('starter.controllers', [])


.controller('ChatsCtrl', function($scope, Chats, $ionicModal) {
  $scope.chats = Chats.all();
  
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }

  $ionicModal.fromTemplateUrl('contact-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal
  })  ;

  $scope.openModal = function() {
    $scope.modal.show()
  };

  $scope.closeModal = function(chat) {
    $scope.modal.hide();
    Chats.add(chat);
    chat.name = null;
    chat.face = null;
    chat.lastText = null;
  };

  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats, $ionicModal) {
  $scope.images = Chats.getImages($stateParams.chatId);
  $scope.chatId = $stateParams.chatId;
  $ionicModal.fromTemplateUrl('contender-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal
  })  ;

  $scope.openModal = function() {
    $scope.modal.show();
  };

  $scope.closeModal = function(image) {
    $scope.modal.hide();
    Chats.addImage(image, $stateParams.chatId);
    image.imageURL = null;
    image.caption = null;
  };

  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
})

.controller('ImageDetailCtrl', function($scope, $stateParams, Chats) {
   $scope.image = Chats.getImage($stateParams.imageId, $stateParams.chatId);
})


app.controller('MainCtrl', function($scope, $ionicModal) {

});

