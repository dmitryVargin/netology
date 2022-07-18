#!/usr/bin/env node

import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import 'dotenv/config';
import * as http from 'http';
import { getWeatherApiUrl } from '../services/api.service.js';
import { printError, printWeather } from '../services/log.service.js';

const { argv } = yargs(hideBin(process.argv))
  .scriptName('weather')
  .locale('ru')
  .option('help', {
    alias: 'h',
    description: 'Помощь',
  })
  .option('city', {
    alias: 'c',
    description: 'Город',
    type: 'string',
  })
  .demandOption(['city'])
  .middleware(async (argv) => {
    if (argv.city && typeof argv.city === 'string') {
      http.get(getWeatherApiUrl(argv.city), (res) => {
        const { statusCode } = res;
        if (statusCode !== 200) {
          printError('Произошла ошибка, попробуйте еще раз');
          return;
        }
        res.setEncoding('utf8');
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          const parsedData = JSON.parse(data);
          if (parsedData?.success === false) {
            printError(parsedData.error.info);
          } else {
            const {
              location: { name, country, region }, current: {
                temperature,
                weather_descriptions,
                wind_speed,
              },
            } = JSON.parse(data);
            printWeather({
              name, country, region, temperature, weather_descriptions, wind_speed,
            });
          }
        });
      });
    }
  });
