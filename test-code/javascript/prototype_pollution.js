function mergeDeep(target, source) {
  for (const key in source) {
    if (typeof source[key] === "object" && source[key] !== null) {
      if (!target[key]) {
        target[key] = {};
      }
      mergeDeep(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

function setNestedProperty(obj, path, value) {
  const keys = path.split(".");
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    if (!current[keys[i]]) {
      current[keys[i]] = {};
    }
    current = current[keys[i]];
  }
  current[keys[keys.length - 1]] = value;
  return obj;
}

function parseConfig(userInput) {
  const config = {};
  const parsed = JSON.parse(userInput);
  return mergeDeep(config, parsed);
}

module.exports = { mergeDeep, setNestedProperty, parseConfig };
