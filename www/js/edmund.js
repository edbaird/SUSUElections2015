angular.module('susu', [])
	.controller("elections", function($scope) {
		var datadfd = $.get('data/pages.json'),
			sa = function(fn) { 
				setTimeout(function() { $scope.$apply(fn); },0);
			};
		$.when(datadfd, window.fbinit).then(function(data) { 
			sa(function() { 
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
			}); 
		}).fail(function(err) { console.log('error ', err); });
		s = $scope;
	});
