#!/usr/bin/env node
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import {
  add, sub, getMonth, getYear, getDate,
} from 'date-fns';

const currentDate = new Date();
const { argv } = yargs(hideBin(process.argv))
  .scriptName('datetime')
  .locale('ru')
  .command('current', 'Выводит текущую дату', (yargs) => yargs
    .option('year', {
      alias: 'y',
      type: 'boolean',
      description: 'Год',
    })
    .option('month', {
      alias: 'm',
      type: 'boolean',
      description: 'Месяц',
    })
    .option('date', {
      alias: 'd',
      type: 'boolean',
      description: 'Дата в календарном месяце',
    }), (argv) => {
    if (argv.year || argv.month || argv.date) {
      if (argv.year) {
        console.log(`Год ${getYear(currentDate)}`);
      }
      if (argv.month) {
        console.log(`Месяц ${getMonth(currentDate) + 1}`);
      }
      if (argv.date) {
        console.log(`Число ${getDate(currentDate)}`);
      }
    } else {
      console.log(currentDate);
    }
  })
  .command('add [options]', 'Прибавляет заданные день/месяц/год к текущей дате', (yargs) => yargs
    .option('year', {
      alias: 'y',
      type: 'number',
      description: 'Год',
    })
    .option('month', {
      alias: 'm',
      type: 'number',
      description: 'Месяц',
    })
    .option('date', {
      alias: 'd',
      type: 'number',
      description: 'Дата в календарном месяце',
    }), (argv) => {
    console.log(add(currentDate, {
      years: argv.year,
      months: argv.month,
      days: argv.date,
    }));
  })
  .command(
    'sub [options]',
    'Отнимает заданные день/месяц/год от текущей даты',
    (yargs) => yargs
      .option('year', {
        alias: 'y',
        type: 'number',
        description: 'Год',
      })
      .option('month', {
        alias: 'm',
        type: 'number',
        description: 'Месяц',
      })
      .option('date', {
        alias: 'd',
        type: 'number',
        description: 'Дата в календарном месяце',
      }),
    (argv) => {
      console.log(sub(currentDate, {
        years: argv.year,
        months: argv.month,
        days: argv.date,
      }));
    },
  )
  .option('help', {
    alias: 'h',
    description: 'Помощь',
  })
  .demandCommand(1, 'Необходимо передать команду')
  .check((argv) => {
    const command = argv._[0];
    const excludedOption = ['_', '$0'];
    const allowedOptions = ['date', 'month', 'year', 'd', 'm', 'y'];
    const currentArgs = {};
    Object.keys(argv).forEach((arg) => {
      if (!excludedOption.includes(arg)) {
        if (!allowedOptions.includes(arg)) {
          throw new Error('Аргумент не поддерживается');
        }
        currentArgs[arg] = argv[arg];
      }
    });
    if (command === 'add' || command === 'sub') {
      const argsNotANumber = Object.values(currentArgs).map((arg) => typeof arg === 'number' && !Number.isNaN(arg)).includes(false);
      if (!Object.keys(currentArgs).length) {
        throw new Error('Параметры не заданы');
      }
      if (argsNotANumber) {
        throw new Error('Параметры должны иметь числовое значение');
      }

      return true;
    }
    return true;
  });
