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

		$scope.saveNote = function() {
			var noteText = document.getElementById("noteText").value;
			if (noteText != null) {
				var saveForm = document.forms.namedItem("saveNoteForm");
				saveForm.elements.namedItem("text").value = noteText;
				saveForm.submit();
			}
		};
	}]);
})();