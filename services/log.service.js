import chalk from 'chalk';
import dedent from 'dedent-js';

function printError(error) {
  console.log(` ${chalk.bgRed(' ERROR ')} ${error}`);
}

function printSuccess(msg) {
  console.log(` ${chalk.bgGreen(' SUCCESS ')} ${msg}`);
}

function printWeather({
  name,
  country,
  region,
  temperature,
  weather_descriptions,
  wind_speed,
}) {
  console.log(
    dedent(`${chalk.bgCyan(' Погода ')}
    Город ${name}
    Страна: ${country}
    Регион: ${region}
    Температура: ${temperature}
    Описание погоды: ${weather_descriptions.join(',')}
    Скорость ветра: ${wind_speed}
    `),
  );
}

export { printSuccess, printError, printWeather };
