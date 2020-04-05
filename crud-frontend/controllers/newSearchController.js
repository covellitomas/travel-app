app.controller('NewSearchController', ['$scope', 'PlaceService', 'AhpService', 'CriteriaService', function($scope, PlaceService, AhpService, CriteriaService) {

    var vm = $scope;
    init();
    //app.validateUser($location);

    function init() {

        PlaceService.getAllPlacesNames().then((placesNames) => {
            vm.allPlaces = placesNames;
        });

        CriteriaService.getAllCriterias().then((criterias) => {
            vm.allCriterias = criterias;
        });

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

    function getRankCriterias() {
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
        return matrix;
    }

    vm.onAddNewPlaceClicked = function() {
        if (vm.hotelsUrl && vm.attractionsUrl) {
            vm.$emit('load');
            AhpService.getHotelCriterias(vm.hotelsUrl).then(place => {
                AhpService.getAttractionsCriterias(vm.attractionsUrl).then(attractionsCriterias => {
                    place.criterias = place.criterias.concat(attractionsCriterias);

                    if (!vm.allPlaces.some(p => p.name === place.name)) {
                        vm.allPlaces.push(place);
                        PlaceService.savePlace(place).then((savedPlace => {
                            const x = 0;
                        }));
                    }

                    place.criterias.forEach(criteria => {
                        if (!vm.criterias.some(c => c.name === criteria.name)) {
                            vm.allCriterias.push(criteria);
                            CriteriaService.saveCriteria(criteria).then((savedCriteria) => {
                                const x = 0;
                            });
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
                criterias: vm.criterias,
                rankCriterias: getRankCriterias()
            }).then((results) => {
                const resultsAsArray = Object.keys(results).map((key) => ({place: key, value: results[key]}));

                const sortedResults = resultsAsArray.sort(function (a, b) {
                    return -(a.value - b.value);
                });

                vm.$emit('unload');
                alert("Los resultados son: " + JSON.stringify(results));
            });
        }
    }

    vm.onDeleteCriteriaClicked = function(index) {
        vm.criterias.splice(index, 1);
    }

    vm.onCriteriaOptionClicked = function() {
        let criteriaSelected;
        vm.allCriterias.some(criteria => {
            criteriaSelected = criteria.children.find(child => child.name === vm.selectedCriteria);
            return !!criteriaSelected;
        });
        vm.criterias.push(criteriaSelected);
    }

    vm.onPlaceOptionClicked = function() {
        vm.placesToCompare.push(vm.selectedPlace);
    }

}]);