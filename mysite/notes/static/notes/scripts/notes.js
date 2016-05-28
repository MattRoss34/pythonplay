(function () {
	var notesapp = angular.module('notesapp', []);

	notesapp.controller('NotesController', ['$scope', function($scope) {
		$scope.matches = function(str) {
			if (typeof $scope.searchText != 'undefined')
				return str.toLowerCase().indexOf($scope.searchText.toLowerCase()) > -1;
			return true;
		};

		$scope.addNote = function() {
			var aTitle = prompt("Please enter a title", "New Note");
			if (aTitle != null && aTitle != '') {
				var noteForm = document.forms.namedItem("newNoteForm");
				noteForm.elements.namedItem("title").value = aTitle;
				noteForm.submit();
			}
		};
	}]);
})();