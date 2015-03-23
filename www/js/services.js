angular.module('starter.services', [])

.factory('fights', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var fights = [{
    id: 0,
    name: 'What is outside your window?',
    lastText: 'Post a picture from outside the window nearest to you',
    images: [{id:0, caption:'My Ocean View', imageURL:'http://static.flickr.com/52/190912966_66192ae506.jpg',
                         upVotes: 7, downVotes: 4},
              {id:1, caption:'A random lady', 
                          imageURL:'http://www.yukonbooks.com/hatch_gallery/albums/From_A_Room/woman_outside_window.jpg',
                          upVotes: 5, downVotes: 4}
              ]
  }, {
    id: 1,
    name: 'Cutest puppy',
    lastText: 'Post the cutest puppy you can find',
    images: [{id:0, caption:'Pug puppy', imageURL:'http://www.stylespalace.com/wp-content/uploads/2015/03/pug-puppy.jpg',
                  upVotes: 10, downVotes: 4},
              {id:1, caption:'Stupid puppy', imageURL:'http://onestupidblog.com/wp-content/uploads/2013/01/puppies9.jpg',
                  upVotes: 14 , downVotes: 2}
              ]
  }];

  return {
    all: function() {
      return fights;
    },
    remove: function(fight) {
      fights.splice(fights.indexOf(fight), 1);
    },
    getImages: function(fightId) {
      for (var i = 0; i < fights.length; i++) {
        if (fights[i].id === parseInt(fightId)) {
          
          return this.reOrderImages(fights[i].images);
        }
      }
      return null;
    },
     add: function(fight) {

      var fight = {
          id: fights.length,
          name:  fight.name,
          lastText: fight.lastText,
          images: []
        };
      fights.push(fight);
    },
    addImage: function(inImage, fightId){
      var fight = fights[fightId];
      var len = fight.images.length;
      var image = {
          id: len + 1,
          imageURL:  inImage.imageURL,
          caption: inImage.caption,
          upVotes: 0,
          downVotes: 0
        };
      fight.images.push(image);
    },
    getImage: function(imageId, fightId) {
       var fight = null;
       var images = null;
       for (var i = 0; i < fights.length; i++){
              if(fights[i].id === parseInt(fightId)){
              fight = fights[i];
              images = fights[i].images;
            }
              
        };
          for(var j = 0; j < images.length; j++){
            if(images[j].id === parseInt(imageId)){
              return images[j];
            }
          };

        return null;
    },
    upVoteImage: function(imageId, fightId){
      this.getImage(imageId, fightId).upVotes++;
      this.getImages(fightId);
    },
    downVoteImage: function(imageId, fightId){
      this.getImage(imageId, fightId).downVotes--;
    },
    reOrderImages: function(imagesForReorder){
        return imagesForReorder.sort(function compare(a,b) {
        if (a.upVotes > b.upVotes)
           return -1;
        if (a.upVotes < b.upVotes)
          return 1;
        return 0;
      });
    }
  };
});

angular.module('camera.service', [])

.factory('camera', ['$q', function($q) {

  return {
    getPicture: function(options) {
      var q = $q.defer();

      navigator.camera.getPicture(function(result) {
        // Do any magic you need
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);

      return q.promise;
    }
  }
}]);
