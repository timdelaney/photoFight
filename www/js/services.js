angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'What is outside your window?',
    lastText: 'Post a picture from outside the window nearest to you',
    images: [{id:0, caption:'My Ocean View', imageURL:'http://static.flickr.com/52/190912966_66192ae506.jpg'},
              {id:1, caption:'A random lady', imageURL:'http://www.yukonbooks.com/hatch_gallery/albums/From_A_Room/woman_outside_window.jpg'}
              ]
  }, {
    id: 1,
    name: 'Cutest puppy',
    lastText: 'Post the cutest puppy you can find',
    images: [{id:0, caption:'Pug puppy', imageURL:'http://www.stylespalace.com/wp-content/uploads/2015/03/pug-puppy.jpg'},
              {id:1, caption:'Stupid puppy', imageURL:'http://onestupidblog.com/wp-content/uploads/2013/01/puppies9.jpg'}
              ]
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    getImages: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i].images;
        }
      }
      return null;
    },
     add: function(chat) {

      var chat = {
          id: chats.length,
          name:  chat.name,
          lastText: chat.lastText,
          images: []
        };
      chats.push(chat);
    },
    addImage: function(inImage, chatId){
      var chat = chats[chatId];
      var len = chat.images.length;
      var image = {
          id: len + 1,
          imageURL:  inImage.imageURL,
          caption: inImage.caption
        };
      chat.images.push(image);
    },
    getImage: function(imageId, chatId) {
       var chat = null;
       var images = null;

       for (var i = 0; i < chats.length; i++){
              if(chats[i].id === parseInt(chatId)){
              chat = chats[i];
              images = chats[i].images;
            }
              
        };
          for(var j = 0; j < images.length; j++){
            if(images[j].id === parseInt(imageId)){
              return images[j];
            }
          };

        // for (var i = 0; i < chats.length; i++){
        //   var images = chats[i].images;
        //   for(var j = 0; j < images.length; j++){
        //     if(images[j].id === parseInt(imageId)){
        //       return images[j];
        //     }
        //   }
        // }
        return null;
    }

  };
});
