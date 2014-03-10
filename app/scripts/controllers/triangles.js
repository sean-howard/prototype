'use strict';

angular.module('d3App')
    .controller('MainCtrl', function($scope) {

        $scope.results = [{
            answer: "A",
            value: 100,
            color: '#FFDC00',
            size: 0
        }, {
            answer: "B",
            value: 100,
            color: '#CFDC29',
            size: 0
        }, {
            answer: "C",
            value: 100,
            color: '#7AC142',
            size: 0
        }, {
            answer: "D",
            value: 100,
            color: '#00A84F',
            size: 0
        }, {
            answer: "E",
            value: 100,
            color: '#00765E',
            size: 0
        }];

        var getTotal = function() {
            var total = 0;

            for (var i = 0, j = $scope.results.length; i < j; i += 1) {
                var result = $scope.results[i];
                total += result.value;
            }

            return total;
        };

        var fullRadius = 200;

        var getPercentage = function(value, total) {
            return (fullRadius / total) * value;
        };

        var container = d3.select("#results"),
            circles = container.selectAll('path')
                .data($scope.results)
                .enter()
                .append('path');


        var positions = [{
            x: 100,
            y: 600
        }, {
            x: 150,
            y: 550
        }, {
            x: 250,
            y: 500
        }, {
            x: 300,
            y: 450
        }, {
            x: 350,
            y: 400
        }]

        $scope.updateCircles = function() {

            var prevValue = 0;

            circles
                .attr("d", d3.svg.symbol()
                    .size(function(d, i) {
                        // console.log((fullRadius / getTotal()) * d.value);
                        // return (fullRadius / getTotal()) * d.value;
                        var r = getPercentage(d.value, getTotal());

                        if (r < fullRadius) {
                            var tmpr = r + prevValue;
                            prevValue += r;
                            r = tmpr;

                        }

                        d.size = r;

                        console.log(r, prevValue);

                        return r * r * 5;
                    })
                    .type(function(d) {
                        return "triangle-up";
                    }))
                .attr("transform", function(d, i) {
                    var position = positions[i];

                    console.log(position["x"]);

                    return "translate(" + position["x"] + "," + position["y"] + ")";
                })
                .sort(function(a, b) {
                    return a.size < b.size;
                })
                .style("fill", function(d, i) {
                    return d.color;
                });
        };

        $scope.updateCircles();

    });