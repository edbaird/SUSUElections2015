/*jshint undef: true, strict:false, trailing:false, unused:false */

angular.module('susu', [])
	.controller("elections", function($scope) {
		var datadfd = $.get('data/pages.json');
		$.when(datadfd).then(function(data) {
			var positions = $scope.positions = data.positions,
				winners = $scope.winners = {};

			positions.map(function(pos) {
				pos.candidates.map(function(person) {

					// Can I use this API in this way? Yolo swag. Adam woz ere lol 2k10.
					if (person.id) {
						$.getJSON('https://graph.facebook.com/'+person.id+'?fields=likes').then(function(res) {
							person.pageinfo = res;
							var likes = person.pageinfo.likes;
							if (winners[pos.title] === undefined || likes > winners[pos.title].pageinfo.likes) {
								winners[pos.title] = person;
							}
							$scope.$apply();
						});
					}
				});
			});



			/*sa(function() {
				var positions = $scope.positions = data[0].positions;
				sa(function() {
					FB.login(function(){
						console.log('done login');
						positions.map(function(pos) {
							console.log(pos);
							pos.candidates.map(function(person) {
								// console.log('getting page info ', person.id);
								FB.api(''+person.id, function(x, err) {
									console.log(x, err);
									sa(function() { person.pageinfo = x; });
								})
							});
						});
					}, {});
				});
			}); */
		}).fail(function(err) { console.log('error ', err); });
		s = $scope;
		console.log('hi');
	});
