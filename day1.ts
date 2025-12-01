import fs from 'node:fs/promises';

function applyRotation(dial: number, r: string, password: number) {
  let value = dial;
  const operationSign = r[0] === 'L' ? -1 : 1;
  value = value + (operationSign * parseInt(r.slice(1)))
  let counter = 0
  if (value === 0) {
    counter += 1
  }
  if (value < 0) {

    counter += Math.ceil(Math.abs(value) / 100)
    value = ((value % 100) + 100) % 100

    if(dial === 0) {
      counter -= 1
    }
    if (value === 0) {
      counter += 1
    }
  } else if (value > 99) {
    counter += Math.floor(value / 100)
    value = value % 100
  }
	
  return { dial: value, password: password + counter };
}

try {
  const rotations = await fs.readFile('./inputs/day1.txt', { encoding: 'utf8' });
  let dialValue = 50;

  let counter = rotations.split('\n').reduce((acc, curr) => {
    
  const { dial, password } = applyRotation(dialValue, curr, acc)
    dialValue = dial
    return password
  }, 0)

  console.log(counter, dialValue);
} catch (err) {
  console.error(err);
}

