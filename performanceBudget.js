var clc = require('cli-color');

var checkBudget = function(budgetOptions, data, callback) {
  metrics = data.metrics;

  var b_options = Object.keys(budgetOptions);
  var b_length = b_options.length;
  var fails = [];

  while (b_length--) {
    if (metrics[b_options[b_length]] > budgetOptions[b_options[b_length]]) {
      if (!fails.length) {
        console.log('\n' + clc.red('Metrics analyzed against performance budget') + '\n');
      }

      console.log(
        clc.red(b_options[b_length] + ': ') + 
        'Expected < ' + budgetOptions[b_options[b_length]] + 
        ', Actual = ' + metrics[b_options[b_length]]
      );

      fails.push(b_options[b_length]);
    }
  }

  delete metrics[b_options[b_length]];

  if (fails.length === 0) {
    callback();
  } else {
    console.log();
    callback('Performance budget fail: ' + fails.join(', '));
  }
}

module.exports = checkBudget;
