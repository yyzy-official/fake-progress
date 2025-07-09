// TerminalRenderer: Handles progress bar and log rendering in terminal
import cliProgress from 'cli-progress';
import chalk from 'chalk';

class TerminalRenderer {
  constructor(simulator) {
    this.simulator = simulator;
    this.progressBar = new cliProgress.SingleBar({
      format: '{bar} | {percentage}% | ETA: {eta}s',
      barCompleteChar: '\u2588',
      barIncompleteChar: '\u2591',
      hideCursor: true
    }, cliProgress.Presets.shades_classic);
    this.lastLogIndex = 0; // 记录已输出日志的下标
  }

  start() {
    this.progressBar.start(100, 0);
  }

  update() {
    this.progressBar.update(Math.floor(this.simulator.progress * 100));
    this._renderLogs();
  }

  stop() {
    this.progressBar.stop();
  }

  _renderLogs() {
    // 只输出新增的日志，实现滚动效果
    const logs = this.simulator.logs;
    for (let i = this.lastLogIndex; i < logs.length; i++) {
      const log = logs[i];
      if (log.includes('WARN')) console.log(chalk.yellow(log));
      else if (log.includes('ERROR')) console.log(chalk.red(log));
      else console.log(chalk.gray('> ') + log);
    }
    this.lastLogIndex = logs.length;
  }
}

export default TerminalRenderer; 