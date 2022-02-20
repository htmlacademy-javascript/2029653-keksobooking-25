function getRandomInt(min, max) {
  return Math.floor((min < max) ? Math.random() * (max - min) + min : Math.random() * (min - max) + max);
}

function getRandomFloat(min, max, symbolsAfterDot) {
  const multiplier = Math.pow(10, symbolsAfterDot);
  let numberFrom = min;
  let numberTo = max;
  if (max < min) {
    numberFrom = max;
    numberTo = min;
  }
  return Math.floor((Math.random() * (numberTo - numberFrom) + numberFrom) * multiplier) / multiplier;
}

getRandomInt(1, 2);
getRandomFloat(1, 2, 10);
