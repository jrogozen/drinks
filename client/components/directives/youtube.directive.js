app.directive('youtube', function($window) {
  return {
    restrict: "E",

    scope: {
      height: "@",
      width: "@",
      videoid: "@"
    },

    template: '<div></div>',

    link: function(scope, element, attrs) {
      var tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      var player;

      $window.onYouTubeIframeAPIReady = function() {
        player = new YT.Player(element.children()[0], {

          playerVars: {
            autoplay: 0,
            html5: 1,
            theme: "light",
            modestbranding: 1,
            color: "white",
            iv_load_policy: 3,
            controls: 1
          },

          height: scope.height,
          width: scope.width,
          videoId: scope.videoid
        });
      };

      scope.$watch('videoid', function(newValue, oldValue) {
        console.log('ugh');
        if (newValue == oldValue) {
          return;
        }
        console.log("player", player);
        console.log("videoId", scope.videoId);
        player.cueVideoById(scope.videoid);
      });

      scope.$watch('height + width', function(newValue, oldValue) {
        console.log('what');
        if (newValue == oldValue) {
          return;
        }
        player.setSize(scope.width, scope.height);
      });
    }
  };
});