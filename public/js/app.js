'use strict';

var chatApp = angular.module('chatApp', []);

var socket = io.connect('http://localhost:8000');
socket.emit('userEnter');

chatApp.controller('MainAppCtrl', ['$scope',
    function($scope) {
        $scope.chat = {};
        $scope.chat.sender = '';
        $scope.incomings = [];

        socket.on('push', function(chats) {
            $scope.$apply(function() {
                $scope.incomings.push(chats);
            });
        });

        $scope.send = function($event) {
            // Check what user's typed and check whether or not the
            // message box is empty
            if (13 === $event.keyCode && $event.target.value !== '') {
                // If user typed enter AND the message is not empty,
                // do:

                // Prevent default behavior of pressing enter
                $event.preventDefault();

                // Check whether or not user has entered his name
                if ('' !== $scope.chat.sender) {
                    // If he has
                    $event.target.value = '';
                    // Send the chat to the server
                    socket.emit('chat', $scope.chat);
                } else {
                    // If he hasn't, alert after 5 milliseconds
                    setTimeout(function() {
                        alert('Please enter your name first');
                    }, 5);
                }
            }
        };
    }]);