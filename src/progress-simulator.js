// ProgressSimulator: Simulates fake CLI task progress with logs and failure chance
import { faker } from '@faker-js/faker';
import _ from 'lodash';
import LOGS from '../logs/realistic-logs.js';

function fillRandomPlaceholders(str) {
  // 支持 {RANDOM:x-y} 占位符自动替换为 x~y 的随机数
  return str.replace(/\{RANDOM:(\d+)-(\d+)\}/g, (_, min, max) => {
    return Math.floor(Math.random() * (parseInt(max) - parseInt(min) + 1)) + parseInt(min);
  });
}

function randomBar(percent) {
  // 生成伪进度条字符串
  const total = 20;
  const filled = Math.round((percent / 100) * total);
  return '[' + '#'.repeat(filled) + '-'.repeat(total - filled) + `] ${percent}%`;
}

class ProgressSimulator {
  constructor(options) {
    this.duration = options.time || 30;
    this.type = options.type || 'install';
    this.failChance = options.failChance || 0;
    this.progress = 0;
    this.logs = [];
    this.isRunning = false;
    this.currentFile = null;
    this.currentModule = null;
    this.failed = false;
  }

  start(onUpdate, onFinish) {
    this.isRunning = true;
    this._simulateTask(onUpdate, onFinish);
  }

  _simulateTask(onUpdate, onFinish) {
    const tick = () => {
      if (!this.isRunning) return;
      if (this.progress >= 1) {
        // Decide fail or success
        if (Math.random() < this.failChance) {
          this.failed = true;
          this.logs.push('ERROR: Task failed unexpectedly.');
        }
        this.isRunning = false;
        if (onUpdate) onUpdate();
        if (onFinish) onFinish(this.failed);
        return;
      }
      this.progress = Math.min(1, this.progress + this._calculateIncrement());
      this.logs.push(this._generateLog());
      if (onUpdate) onUpdate();
      setTimeout(tick, this._getInterval());
    };
    tick();
  }

  _calculateIncrement() {
    if (this.progress < 0.2) return 0.08 + Math.random() * 0.04;
    if (this.progress < 0.8) return 0.02 + Math.random() * 0.03;
    if (this.progress > 0.99) return 0;
    return 0.005 + Math.random() * 0.01;
  }

  _generateLog() {
    // download 类型下，20% 概率插入伪进度条日志
    if (this.type === 'download' && Math.random() < 0.2) {
      const percent = _.random(10, 99);
      const phase = _.sample([
        'Downloading file',
        'Extracting archive',
        'Verifying checksum',
        'Merging parts',
        'Writing to disk',
        'Unpacking',
        'Receiving data',
        'Finalizing',
        'Connecting',
        'Processing',
        'Syncing',
        'Cleaning up'
      ]);
      const fileNum = _.random(1, 5);
      return `${randomBar(percent)} ${phase} ${fileNum}/5`;
    }
    // Contextual log generation
    if (!this.currentFile || Math.random() > 0.7) {
      this.currentFile = `${faker.system.fileName()}.${faker.system.fileExt()}`;
    }
    if (!this.currentModule || Math.random() > 0.7) {
      this.currentModule = faker.hacker.noun();
    }
    const templates = LOGS[this.type] || [];
    // 5% chance to use a real error
    let log = Math.random() < 0.05 && LOGS.common_errors ? _.sample(LOGS.common_errors) : _.sample(templates);
    // 占位符替换
    log = fillRandomPlaceholders(log);
    return log;
  }

  _getInterval() {
    if (this.progress < 0.2) return _.random(10, 70);
    if (this.progress < 0.8) return _.random(100, 600);
    return _.random(500, 1500) / 5;
  }
}

export default ProgressSimulator; 