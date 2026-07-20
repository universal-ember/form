'use strict';

module.exports = {
  extends: 'recommended',
  rules: {
    'no-inline-styles': 'off',
    // this docs site uses <style> blocks for page-local styling
    'no-forbidden-elements': ['meta', 'html', 'script'],
    // GitHub URLs contain "@universal-ember/form", which pattern-matches
    // this rule's path heuristic
    'no-potential-path-strings': 'off',
  },
};
