// scenario.js: Predefined fake progress scenarios
const scenarios = {
  'npm-install': {
    type: 'install',
    time: 20,
    failChance: 0.1,
    tasks: 1
  },
  'cpp-compile': {
    type: 'compile',
    time: 15,
    failChance: 0.05,
    tasks: 1
  },
  'file-download': {
    type: 'download',
    time: 12,
    failChance: 0.08,
    tasks: 1
  }
};

export default scenarios; 