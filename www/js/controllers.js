angular.module('starter.controllers', [])


.controller('fightsCtrl', function($scope, fights, camera, $ionicModal) {
  $scope.fights = fights.all();
  
  $scope.remove = function(fight) {
    fights.remove(fight);
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

  $scope.closeModal = function(fight) {
    $scope.modal.hide();
    fights.add(fight);
    fight.name = null;
    fight.face = null;
    fight.lastText = null;
  };

  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
})

.controller('fightDetailCtrl', function($scope, $stateParams, fights, camera, $ionicModal) {
  $scope.images = fights.getImages($stateParams.fightId);
  $scope.fightId = $stateParams.fightId;
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
    fights.addImage(image, $stateParams.fightId);
    image.imageURL = null;
    image.caption = null;
  };
  $scope.upVote = function(image, fightId, $event) {
    $event.preventDefault();
    fights.upVoteImage(image.id, fightId);
  };
  $scope.downVote = function(image, fightId, $event) {
    $event.preventDefault();
    fights.downVoteImage(image.id, fightId);
  };
  $scope.getPhoto = function() {
    Camera.getPicture().then(function(imageURI) {
      console.log(imageURI);
    }, function(err) {
      console.err(err);
    });
  };
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
})

.controller('ImageDetailCtrl', function($scope, $stateParams, fights) {
   $scope.image = fights.getImage($stateParams.imageId, $stateParams.fightId);
})


app.controller('MainCtrl', function($scope, $ionicModal) {

});

