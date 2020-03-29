app.controller('NewSearchController', ['$scope', 'PlaceService', 'AhpService', function($scope, PlaceService, AhpService) {

    var vm = $scope;
    init();
    //app.validateUser($location);

    function init() {
        vm.placesToCompare = [];
        vm.criterias = [];
        vm.rankCriterias = [
            {factor: -1, description: 'Select importance...'},
            {factor: 1/9, description: 'Way less important'},
            {factor: 1/6, description: 'Less important'},
            {factor: 1/3, description: 'A bit less important'},
            {factor: 1, description: 'Same important'},
            {factor: 3, description: 'A bit more important'},
            {factor: 6, description: 'More important'},
            {factor: 9, description: 'Way more important'}
        ];
    }

    vm.onGetTableContentClicked = function() {
        var oTable = document.getElementById('rankCriteriaTable');
        var rowLength = oTable.rows.length;

        const matrix = [];
        for (i = 1; i < rowLength; i++) {

            var oCells = oTable.rows.item(i).cells;
            var cellLength = oCells.length-1;

            for(var j = i; j < cellLength; j++) {

                const item = oCells.item(j+1).querySelector("select");
                if (item) {
                    const cellVal = +item.options[item.selectedIndex].value;

                    if (cellVal && cellVal != -1) {
                        matrix.push([vm.criterias[i-1].name, vm.criterias[j].name, cellVal]);
                    } else if (cellVal == -1) {
                        return alert('Please fill all the table cells to continue...');
                    }
                    
                }
            }
        }
        const x = 0;
    }

    vm.onAddNewPlaceClicked = function() {
        if (vm.hotelsUrl && vm.attractionsUrl) {
            vm.$emit('load');
            AhpService.getHotelCriterias(vm.hotelsUrl).then(place => {
                AhpService.getAttractionsCriterias(vm.attractionsUrl).then(attractionsCriterias => {
                    place.criterias = place.criterias.concat(attractionsCriterias);
                    vm.placesToCompare.push(place);

                    place.criterias.forEach(criteria => {
                        if (!vm.criterias.some(c => c.name === criteria.name)) {
                            vm.criterias.push(criteria);
                        }
                    });

                    vm.$emit('unload');
                });
            });
        }
    }

    vm.onRunAlgorithmClicked = function() {
        if (vm.placesToCompare.length && vm.criterias.length) {
            vm.$emit('load');
            AhpService.runAlgorithm({
                places: vm.placesToCompare,
                criterias: vm.criterias
            }).then((results) => results.data);
        }
    }

    vm.onDeleteCriteriaClicked = function(index) {
        vm.criterias.splice(index, 1);
    }

}]);