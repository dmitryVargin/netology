import { readFile, stat, writeFile } from 'fs/promises';

async function isExist(path) {
  try {
    await stat(path);
    return true;
  } catch (e) {
    return false;
  }
}
async function incrementKey(key, filePath) {
  let data = {};
  if (await isExist(filePath)) {
    const file = await readFile(filePath);
    data = JSON.parse(file);
    if (key in data) {
      data[key] += 1;
    } else {
      data[key] = 1;
    }
  } else {
    data[key] = 1;
  }
  await writeFile(filePath, JSON.stringify(data), { flag: 'w' });
}

async function saveKeyValue(key, value, filePath) {
  let data = {};
  if (await isExist(filePath)) {
    const file = await readFile(filePath);
    data = JSON.parse(file);
  }
  data[key] = value;
  await writeFile(filePath, JSON.stringify(data));
}

async function getKey(key, filePath) {
  if (await isExist(filePath)) {
    return JSON.parse(await readFile(filePath))[key];
  }
  return undefined;
}

export {
  incrementKey, isExist, saveKeyValue, getKey,
};
