#!/usr/bin/env node

import { stdin as input, stdout as output } from 'node:process';
import * as readline from 'node:readline/promises';
import randomInteger from './helpers/randomInteger.js';

const rl = readline.createInterface({ input, output });

const maxValues = [10, 100, 1000];

const currentMax = maxValues[randomInteger(0, maxValues.length - 1)];
const currentNumber = randomInteger(0, currentMax);

rl.write(`Загадано число в диапазоне от 0 до ${currentMax}`);

rl.write(null, { name: 'enter' });

rl.on('line', (line) => {
  const answer = Number(line);
  if (Number.isNaN(answer)) {
    console.log('Введите число');
    return;
  }
  if (answer > currentMax || answer < 0) {
    console.log(`Число загадано в диапазоне от 0 до ${currentMax}`);
    return;
  }
  if (answer === currentNumber) {
    console.log(`Отгадано число ${currentNumber}`);
    rl.close();
  }
  if (answer > currentNumber) {
    console.log('Меньше');
  }
  if (answer < currentNumber) {
    console.log('Больше');
  }
});
