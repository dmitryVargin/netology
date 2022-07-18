#!/usr/bin/env node

import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import { join } from 'path';
import { homedir } from 'os';
import { readFile } from 'fs/promises';

const { argv } = yargs(hideBin(process.argv))
  .scriptName('headAndTails')
  .locale('ru')
  .option('help', {
    alias: 'h',
    description: 'Помощь',
  })
  .option('file', {
    alias: 'f',
    description: 'Имя логфайла для анализа',
    type: 'string',
    demandOption: true,
  })
  .middleware(async (argv) => {
    if (typeof argv.file === 'string') {
      const filePath = join(homedir(), `${argv.file}.json`);
      const data = JSON.parse(await readFile(filePath, { encoding: 'UTF8' }));
      if (data.gameQuantity) {
        console.log(`Общее количество партий: ${data.wonGames}`);
      }
      if (data.wonGames) {
        console.log(`Количество выигранных партий: ${data.wonGames}`);
      }
      if (data.lostGames) {
        console.log(`Количество проигранных партий: ${data.wonGames}`);
      }
      if (data.wonGames) {
        const wonGamesPercent = ((data.wonGames / data.gameQuantity) * 100).toFixed(2);
        console.log(`Соотношение выигранных партий: ${wonGamesPercent}%`);
      }
    }
  });
