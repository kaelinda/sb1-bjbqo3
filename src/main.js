import { Howl } from 'howler';
import { Game } from './game.js';
import { Bubble } from './bubble.js';
import { Shooter } from './shooter.js';
import { PowerUp } from './powerup.js';

let game;

window.onload = () => {
  game = new Game();
  game.init();
};