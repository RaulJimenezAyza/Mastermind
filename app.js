var DEBUG = false;

ko.components.register('mastermind-game', {
  template: {
    element: 'mastermind-game-template'
  },
  viewModel: MastermindComponent
});

function MastermindComponent(params) { 
  var self = this,
    params = _.extend({
      colors: 6, // difference colors to use
      rows: 10,
      controlObservable: null, // an observable passed from the main viewmodes which will control starting/pausing/stopping the game
      win: 4
    }, params || {}),
    colors = ['red', 'blue', 'white', 'green', 'black', 'yellow'],

    utils = {
      randomColor: function() {
        return colors[Math.floor(Math.random() * colors.length)];
      },
      populateWinningSequence: function() { // generate a new group of colors to be matched
        self.winningSequence(self.winRange.map(utils.randomColor));
      },
      resetGame: function() {
        self.playing(false);
        self.revealing(false);
        self.selectedIndex(0);
        self.winningSequence.removeAll();
        self.historySequence.removeAll();
        self.playingSequence.removeAll();
        self.pegSequence.removeAll();
      },
      testForMatch: function() {
        var q = self.winningSequence().slice(),
          rq = self.playingSequence(),
          testColor = function(color, i) {
            return color === q[i];
          },
          matches = rq.filter(testColor),
          misses = _.reject(rq, testColor),
          misplaced = [];
        matches.forEach(function(c, i) {
          q.splice(q.indexOf(c), 1);
        });
        misses.forEach(function(c) {
          var k = q.indexOf(c);
          if (k >= 0) {
            q.splice(k, 1);
            misplaced.push(c);
          }
        });

        return {
          correct: matches.length,
          misplaced: misplaced.length
        };

      }
    };

  _.extend(self, { // properties and methods available to the template
    DEBUG: ko.observable(DEBUG),
    revealing: ko.observable(false), // reveal the winning combo
    playing: ko.observable(false),
    selectedIndex: ko.observable(0),// the selected marble crater which will apply a clicked color
    rowRange: _.range(params.rows).reverse(),// [9,8,7,..,0]
    winRange: _.range(params.win),// [0,1,2,3]
    winningSequence: ko.observableArray(),
    playingSequence: ko.observableArray(),
    pegSequence: ko.observableArray(),
    historySequence: ko.observableArray(),
    colors: colors,
    startGame: function() {
      utils.resetGame();
      utils.populateWinningSequence();
      self.playing(true);
    },
    endGame: function( isWinner ) {
      self.playing(false);
      self.revealing(true);
      if( isWinner ){
      }
    },
    getPegClass: function(row, index) {
      var matches = self.pegSequence()[params.rows - row - 1];
      if (matches && matches.hasOwnProperty('correct')) {
        return index < matches.correct ? 'correct' : index < matches.correct + matches.misplaced ? 'misplaced' : '';
      }
    },
    setColor: function(color) { // a colored marble was clicked
      var index = self.selectedIndex(),
        rq = self.playingSequence();
      rq[index] = color;
      self.playingSequence(rq);
     // if (_.reject(rq, _.isUndefined).length === params.win) { // full tray
     // } else {
      if( rq.length < params.win ){
        var i = rq.indexOf(undefined);
        i = i >= 0 ? i : rq.length;
        self.selectedIndex(i);
      }
    },
    submitRow: function() {
      var matches = utils.testForMatch();
      self.historySequence.push(self.playingSequence.slice());
      self.pegSequence.push(matches);
      self.playingSequence.removeAll();
      //console.log('matches', matches);
      if (matches.correct === params.win || self.historySequence().length >= params.rows) {
        self.endGame(matches.correct === params.win);
      } else {
        self.selectedIndex(0);
      }
    }
  });
  //computed observables
  self.rowMaster = ko.pureComputed(function() {
    var pq = self.historySequence(),
      nil = function() {
        return null;
      };
    return self.rowRange.map(function(i) {
      var ret = {
        current: i === pq.length,
        colors: []
      };
      if (i < pq.length) {
        ret.colors = pq[i];
      } else if (pq.length === i) {
        ret.colors = self.winRange.map(function(k) {
          return self.playingSequence()[k] || null;
        });
      } else {
        ret.colors = self.winRange.map(nil);
      }
      return ret;
    });
  });
  self.fullPlayerTray = ko.pureComputed(function() {
    return self.playingSequence().length === params.win;
  });
}

function VM() {
  var self = this;
  self.mastermindControl = ko.observable('stop');
}

window.onload = function() {
  ko.applyBindings(new VM());
}
