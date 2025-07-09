#!/usr/bin/env node
// CLI entry for fake-progress
import { program } from 'commander';
import ProgressSimulator from '../src/progress-simulator.js';
import TerminalRenderer from '../src/terminal-renderer.js';
import scenarioMap from '../src/scenario.js';
import { playSuccess, playFail } from '../src/sound.js';

function parseNumber(val) {
  const n = Number(val);
  if (isNaN(n)) throw new Error('参数必须为数字');
  return n;
}

program
  .option('--type <type>', '任务类型 (install/compile/download)')
  .option('--time <seconds>', '任务持续时间（秒）', parseNumber)
  .option('--fail-chance <chance>', '失败概率 (0~1)', parseNumber)
  .option('--tasks <n>', '串行任务数', parseNumber)
  .option('--scenario <name>', '预设场景 (npm-install/cpp-compile/file-download)')
  .parse(process.argv);

const opts = program.opts();

// 预设场景优先
let baseConfig = {};
if (opts.scenario && scenarioMap[opts.scenario]) {
  baseConfig = scenarioMap[opts.scenario];
}

const config = {
  type: opts.type || baseConfig.type || 'install',
  time: opts.time || baseConfig.time || 20,
  failChance: opts.failChance || baseConfig.failChance || 0,
  tasks: opts.tasks || baseConfig.tasks || 1
};

async function runTask(taskIndex, totalTasks) {
  return new Promise((resolve) => {
    const simulator = new ProgressSimulator({
      time: config.time,
      type: config.type,
      failChance: config.failChance
    });
    const renderer = new TerminalRenderer(simulator);
    renderer.start();
    simulator.start(
      () => renderer.update(),
      (failed) => {
        renderer.update();
        renderer.stop();
        if (failed) {
          playFail();
          console.log('\n任务失败!');
        } else {
          playSuccess();
          console.log('\n任务完成!');
        }
        resolve();
      }
    );
  });
}

(async () => {
  for (let i = 0; i < config.tasks; i++) {
    if (config.tasks > 1) {
      console.log(`\n--- 任务 ${i + 1} / ${config.tasks} ---`);
    }
    await runTask(i, config.tasks);
  }
  process.exit(0);
})(); 