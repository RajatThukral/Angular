var myApp = angular.module('myApp', ['ui.bootstrap']);
      myApp.controller("trackController", function($scope, $http) {
      $scope.currentPage=1;
      $scope.currentPageGenre=1;
      $scope.itemsPerPage=20;
      $scope.maxSize=3;
      $scope.current={};
      $scope.currentGenre={};
      $scope.totalTracks=930;
      $scope.totalGenres=1159;

      $http.get('http://104.197.128.152:8000/v1/tracks')
			.then(function(response){
					$scope.titles = response.data.results;
          console.log(response);
				});

      function getPageTitle() {

      $http.get('http://104.197.128.152:8000/v1/tracks?page='+ ($scope.currentPage))
			.then(function(response){
					$scope.titles = response.data.results;
          console.log(response);
				});
      }

      $scope.addNewTrack=function() {
        $scope.titles.push($scope.newTrack);
        $scope.newTrack={};
        $http.post('http://104.197.128.152:8000/v1/tracks',$scope.titles.push($scope.newTrack))
        .then(function(data){
          console.log(":)");
          });
        alert("Successfully Added!!!");
		$scope.newTrack={};
      };

      $scope.removeTrack=function(track){
        var index=$scope.titles.indexOf(track);
        alert("Deleting Selected Track" );
        $scope.titles.splice(index, 1);
      };

      $scope.editTrack=function(track){
        $scope.current= track;
        $http.post('http://104.197.128.152:8000/v1/tracks/1',$scope.current)
        .then(function(data){
          console.log(":)")
        });
      };

      $scope.saveTrack=function(track){
        $scope.current={};
      };

      $scope.pageChanged = function() {
        getPageTitle();
        };

        $http.get('http://104.197.128.152:8000/v1/genres')
  			.then(function(response){
  					$scope.genres = response.data.results;

  					console.log(response);
  				});

      function getPageGenre(){
      $http.get('http://104.197.128.152:8000/v1/genres?page='+ $scope.currentPageGenre)
			.then(function(response){
					$scope.genres = response.data.results;
          console.log(response);
				});
      }
        $scope.addNewGenre=function() {
  				$scope.genres.push($scope.newGenre);
  				$scope.newGenre={};

          $http.post('http://104.197.128.152:8000/v1/genres',$scope.genres.push($scope.newGenre))
          .then(function(data){
            console.log(":)")
          });
        	$scope.newGenre={};
        };

        $scope.removeGenre=function(genre){
          var index=$scope.genres.indexOf(genre);
          alert("Deleting this Genre");
          $scope.genres.splice(index, 1);
        };

        $scope.editGenre=function(genre){
          $scope.currentGenre= genre;
          $http.post('http://104.197.128.152:8000/v1/genres/11',$scope.currentGenre)
          .then(function(data){
            console.log(":)")
          });
		   alert("Successfully Added!!!");
        };

        $scope.saveGenre=function(genre){
          $scope.currentGenre={};
        };

        $scope.pageChangedGenre = function() {
          getPageGenre();
          };

        $scope.max = 10;
        $scope.isReadonly = true;

        $scope.hoveringOver = function(value) {
          $scope.overStar = value;
          $scope.percent = 100 * (value / $scope.max);
        };

        $scope.search = function(){
            $http.get('http://104.197.128.152:8000/v1/tracks?title='+($scope.searchTitle))
              .then(function(response){
                $scope.titles=response.data.results;
                console.log(response);
              });
            };
    })
