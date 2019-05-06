$(window).resize(function(){
    if(this.window.outerWidth <= 1200){
        disableHeader();
    } else {
        enableHeader();
    }
})

multiplatform.register.controller("LandingPageController", ['$scope', "$state", "$rootScope", function ($scope, $state, $rootScope) {

    $scope.clickDownCount = 0;

    angular.element('.up-btn').fadeOut('fast');

    angular.element('#landing_page_container').fadeIn("slow", function () {
        closeLoder();
        hideBackIcon();
        if(window.outerWidth <= 1200) {
            disableHeader();
        }
    });

    var landingIntervalDown = setInterval(function() {
        if (!document.getElementById('landing_page_container')){
            return;
        }
        if ($("#landing_page_container").scrollTop() >= (document.getElementById('landing_page_container').offsetHeight + 100)) {
            angular.element('.down-btn').fadeOut('fast');
            angular.element('.up-btn').fadeIn('fast');
            // clearInterval(landingIntervalDown);
        }
    }, 100);

    var landingIntervalUp = setInterval(function() {
        if ($("#landing_page_container").scrollTop() < 20) {
            angular.element('.up-btn').fadeOut('fast');
            angular.element('.down-btn').fadeIn('fast');
        }
    }, 100);

    $scope.goto = function (params) {
        clearInterval(landingIntervalDown);
        clearInterval(landingIntervalUp);
        angular.element('#landing_page_container').fadeOut("fast", function () {
            openLoader();
            // $state.go('userLogin.userChooseLogin');
            $state.go('userLogin.userOuterLogin', params);
        });

    };

    $scope.gotoRegister = function () {
        clearInterval(landingIntervalDown);
        clearInterval(landingIntervalUp);
        angular.element('#landing_page_container').fadeOut('fast', function () {
            openLoader();
            $state.go('userLogin.userRegister');
        });
    };

    $scope.goDown = function () {
        if($scope.clickDownCount === 0){
            $scope.clickDownCount++;
            document.getElementById('landing_page_container').scrollBy(0, document.getElementById('landing_page_container').offsetHeight);
        } else {
            $scope.clickDownCount = 0;
            document.getElementById('landing_page_container').scrollBy(0, document.getElementById('landing_page_container').offsetHeight + document.getElementsByClassName('landing-footer')[0].offsetHeight);
        }
        
        if ($("#landing_page_container").scrollTop() >= (document.getElementById('landing_page_container').offsetHeight + 100)) {
            angular.element('.down-btn').fadeOut('fast');
            angular.element('.up-btn').fadeIn('fast');
        }
    }

    $scope.goUp = function () {
        $("#landing_page_container").scrollTop(0);
        angular.element('.up-btn').fadeOut('fast');
    }

    page = SCREENS.landingPage;
}]);
