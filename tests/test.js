describe('Http calls test', function() {

    beforeEach(module('MyApp'))
    beforeEach(inject(function($controller, _$httpBackend_) 
    {
        $scope = {};
        var controller = $controller('weatherCtrl', { $scope: $scope });

        $httpBackend = _$httpBackend_;
        

    }));
    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });
    
    it('should give the response for the yahoo api', function() 
    {

        $httpBackend.whenGET('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22California%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys').respond(200);
        $httpBackend.flush();

        //console.log($scope.Datas.location.city);

        expect($scope.Datas).toBe({});
        //expect($scope.language_list).not.toEqual(undefined);
    });


});