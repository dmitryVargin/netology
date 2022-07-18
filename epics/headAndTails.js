#!/usr/bin/env node

import { stdin as input, stdout as output } from 'node:process';
import * as readline from 'node:readline/promises';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import randomInteger from '../helpers/randomInteger.js';
import config from '../configs/headAndTail.config.json'  assert {type: "json"};
import {join} from "path";
import {homedir} from "os";
import {incrementKey, saveKeyValue} from "../services/storage.service.js";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));


let filePath
const { argv } = yargs(hideBin(process.argv))
  .scriptName('headAndTails')
  .locale('ru')
  .option('help', {
    alias: 'h',
    description: 'Помощь',
  })
  .option('file', {
    alias: 'f',
    description: 'Имя файла для логирования без разрешения',
    type: 'string',
  }).middleware(async (argv)=>{
      if(argv.file && typeof argv.file === 'string') {
          filePath = join(homedir(),`${argv.file}.json`);
          const configPath = join(__dirname, "..","configs", "headAndTail.config.json")
          await saveKeyValue("logFile", filePath, configPath)
      }else if(config.logFile) {
          filePath = config.logFile
      }
    });

const rl = readline.createInterface({ input, output });

const currentResult = randomInteger(1, 2);
const answerToWord = {
  1: 'Орел',
  2: 'Решка',
};

rl.write('Монетка брошена, 1 - Орел, 2 - Решка');

rl.write(null, { name: 'enter' });

rl.on('line', async (line) => {
  const answer = Number(line);
  if (answer !== 1 && answer !== 2) {
    console.log('Введите 1 или 2');
    return;
  }
    if (answer === currentResult) {
    console.log(`Верно - ${answerToWord[answer]}! Вы победили!`);
    if(filePath) {
        await incrementKey('wonGames', filePath)
    }

  } else {
    console.log(`Неверно - ${answerToWord[answer]}. Попробуйте еще!`);
      if(filePath) {
          await incrementKey('lostGames', filePath)
      }
  }
      if(filePath) {
          await incrementKey('gameQuantity', filePath)
      }

  rl.close();
});


// По результатам анализа программа выводит в консоль следующие данные:
//
//     общее количество партий;
// количество выигранных / проигранных партий;
// процентное соотношение выигранных партий.
