(function () {
    // override the horizontal swipe distance requirement
	$.event.special.swipe.horizontalDistanceThreshold = window.devicePixelRatio >= 2 ? 15 : 30;
    console.log($.event.special.swipe.horizontalDistanceThreshold);
    document.addEventListener('touchmove', function(event) {
        if(event.target.parentNode.className.indexOf('noBounce') != -1 
            || event.target.className.indexOf('noBounce') != -1 ) {
	       event.preventDefault(); }
    }, false);
    
	var app = angular.module('afterhours', []);
	app.controller('AfterHoursController', ['$scope', '$http', function($scope, $http) {
        $http.get('https://afterhours.herokuapp.com/profile').success(function(data) { console.log(data); $scope.user = data; });
        $http.get('https://afterhours.herokuapp.com/feeds').success(function(data) { console.log(data); $scope.feeds = data; });
		//this.user = profile;
        //$http.get('http://localhost:8080/AfterHoursApp/newsfeed').success(function(data) { this.feeds = data; });
        $scope.selectedEvent = null;
        $scope.selectedGroup = null;
        
        $scope.viewEventDetail = function(event) {
            $scope.selectedEvent = event;
            $.mobile.changePage('#event-detail-page');
        };
        
        $scope.viewGroupDetail = function(group) {
            $scope.selectedGroup = group;
            $.mobile.changePage('#group-detail-page');
        };
	}]);
    
    $('body').on('swipeleft', function() {
        console.log("swipe left");
        $(this).find('.page-container.active .next-tab').click();
    });
    
    $('body').on('swiperight', function() {
        console.log("swipe right");
        $(this).find('.page-container.active .previous-tab').click();
    });
    
    $('.page-header .tab').on('click', function(event) {
        event.preventDefault();
        
        if ($(this).hasClass('active'))
            return;
        
        var oldTab = $(this).siblings('.active');
        var oldTabRef = oldTab.attr('tab-ref');
        var tabRef = $(this).attr('tab-ref');
        
        $(oldTabRef).data('scroll', $(window).scrollTop());
        $.mobile.silentScroll( $(tabRef).data('scroll') ? $(tabRef).data('scroll') : 0 );
        
        $(this).removeClass('previous-tab').removeClass('next-tab');
        $(this).siblings().removeClass('previous-tab').removeClass('next-tab');
        
        $(this).prev().addClass('previous-tab');
        $(this).next().addClass('next-tab');
        
        oldTab.removeClass('active');
        $(this).addClass('active');
        
        $(oldTabRef).hide();
        $(tabRef).show();
    });
    
    $('.footer .tab').on('click', function(event) {
        event.preventDefault();
        
        if ($(this).hasClass('active'))
            return;
        
        var oldTab = $(this).siblings('.active');
        var oldTabRef = oldTab.attr('tab-ref');
        var tabRef = $(this).attr('tab-ref');
        
        $(oldTabRef).data('scroll', $(window).scrollTop());
        $.mobile.silentScroll( $(tabRef).data('scroll') ? $(tabRef).data('scroll') : 0 );
        
        oldTab.removeClass('active');
        $(this).addClass('active');
        
        $(oldTabRef).removeClass('active').hide();
        $(tabRef).addClass('active').show();
    });
    
    $('#profile .editLink').on('click', function() {
    	$('#editProfileOverlay').show().css('z-index', '1000');
    });
    
    $('#editProfileOverlay .overlay-wrapper .close').on('click', function() {
    	$('#editProfileOverlay').hide();
    });
    
    $('#advancedSearchBtn').on('click', function() {
        $('#friends-search-simple').hide();
        $('#friends-search-advanced').show();
    });
    
    $('#simpleSearchBtn').on('click', function() {
        $('#friends-search-simple').show();
        $('#friends-search-advanced').hide();
    });
    
    $("#friendSearchText").on("input", function() {
        if ($(this).val())
            $("#FindFromContacts").hide();
        else
            $("#FindFromContacts").show();
    });
    
    $("#friendSearchAdvSubmit").on("click", function() {
        $("#friendSearchAdvResults").show();
        $("#friendSearchAdvOptions").hide();
        $("#friendSearchAdvToggle").html("Show More Options");
    });
    
    $("#friendSearchAdvToggle").on("click", function() {
        if ($("#friendSearchAdvOptions").css("display") == "none") {
            $("#friendSearchAdvOptions").show();
            $("#friendSearchAdvToggle").html("Show Less Options");
        } else {
            $("#friendSearchAdvOptions").hide();
            $("#friendSearchAdvToggle").html("Show More Options");
        }
    });
    

    /*
     * BEGIN TEST DATA
     */
    var profile = {
	    "gender":"M",
	    "relStatus":"N",
	    "studies":"Biological Science",
	    "city":"Chicago",
	    "homeCity":"Naperville",
	    "homeState":"IL",
	    "selfSummary":"Lorem ipsum dolor sit amet...",
	    "email":"user@email.com",
	    "phone":"8471234567",
	    "birthDate":454896000000,
	    "age":31,
	    "gradYear":2020,
	    "id":1,
	    "state":"IL",
	    "firstName":"John",
	    "lastName":"Doe",
	    "organizations":
	        [
				{
					name: "Sigma Phi Epsilon",
					role: "President"
				},
				{
					name: "Upsilon Pi Epsilon",
					role: "Member"
				}
			],
	    "numFriends":350,
	    "schoolName":"DePaul University",
    };
    /*
     * END TEST DATA
     */
    
})();