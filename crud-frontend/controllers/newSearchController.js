app.controller('NewSearchController', ['$scope', 'PlaceService', 'AhpService', 'CriteriaService', '$location', function($scope, PlaceService, AhpService, CriteriaService, $location) {

    var vm = $scope;
    init();

    app.validateUser($location);

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
            {factor: -1, description: 'Seleccionar importancia...'},
            {factor: 1/7, description: 'Poco importante'},
            {factor: 1/5, description: 'Menos importante'},
            {factor: 1/3, description: 'Un poco menos importante'},
            {factor: 1, description: 'Misma importancia'},
            {factor: 3, description: 'Un poco más importante'},
            {factor: 5, description: 'Más importante'},
            {factor: 7, description: 'Muy importante'}
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
                        return alert('Por favor seleccionar la importancia de todas las celdas antes de continuar.');
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
                        if (!vm.allCriterias.some(c => c.name === criteria.name)) {
                            vm.allCriterias.push(criteria);
                            CriteriaService.saveCriteria(criteria).then((savedCriteria) => {
                                const x = 0;
                            });
                        }
                    });

                    vm.hotelsUrl = "";
                    vm.attractionsUrl = "";
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
                rankCriterias: getRankCriterias(),
                loggedUserId: app.userLogged._id
            }).then((results) => {

                vm.$emit('unload');
                app.lastResults = results;
                $location.path('/ahp-results/');
            });
        }
    }

    vm.onDeleteCriteriaClicked = function(index) {
        vm.criterias.splice(index, 1);
    }

    vm.onCriteriaOptionClicked = function() {
        let criteriaSelected;
        vm.allCriterias.some(criteria => {
            if (criteria.name === vm.selectedCriteria) {
                criteriaSelected = criteria;
            } else {
                criteriaSelected = criteria.children.find(child => child.name === vm.selectedCriteria);
            }
            return !!criteriaSelected;
        });
        vm.criterias.push(criteriaSelected);
    }

    vm.onPlaceOptionClicked = function() {
        vm.placesToCompare.push(vm.selectedPlace);
    }


    vm.onGetTableContentClicked = function() {
        this.tableVisible = true;
    }

}]);