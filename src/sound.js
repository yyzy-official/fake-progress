// sound.js: Play sound effects for task success/failure
import sound from 'sound-play';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOUND_PATHS = {
  success: path.join(__dirname, '../sounds/success.mp3'),
  fail: path.join(__dirname, '../sounds/fail.mp3')
};

export function playSuccess() {
  sound.play(SOUND_PATHS.success).catch(() => {});
}

export function playFail() {
  sound.play(SOUND_PATHS.fail).catch(() => {});
} 