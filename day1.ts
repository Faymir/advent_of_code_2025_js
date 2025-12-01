import fs from "node:fs/promises";

function calculateUpdatedPassword(password: number, value: number, dial: number) {
  let counter = 0;
  if (value < 0) {
    value = ((value % 100) + 100) % 100;
  } else if (value > 99) {
    value = value % 100;
  }
  if (value === 0) {
    counter += 1;
  }
  return { dial: value, password: password + counter };
}

function calculateUpdatedPassword2(password: number, value: number, dial: number) {
  let counter = 0;
  if (value === 0) {
    counter += 1;
  }
  if (value < 0) {
    counter += Math.ceil(Math.abs(value) / 100);
    value = ((value % 100) + 100) % 100;

    if (dial === 0) {
      counter -= 1;
    }
    if (value === 0) {
      counter += 1;
    }
  } else if (value > 99) {
    counter += Math.floor(value / 100);
    value = value % 100;
  }
  return { dial: value, password: password + counter };
}

function applyRotation(dial: number, r: string, password: number, part1 = true) {
  let value = dial;
  const operationSign = r[0] === "L" ? -1 : 1;
  value = value + operationSign * parseInt(r.slice(1));

  return part1 ? calculateUpdatedPassword(password, value, dial) : calculateUpdatedPassword2(password, value, dial);
}
export async function run(part1: boolean = true) {
  console.log(`Running part ${part1 ? "1" : "2"}...`);
  try {
    const rotations = await fs.readFile("./inputs/day1.txt", {
      encoding: "utf8",
    });
    let dialValue = 50;

    const counter = rotations.split("\n").reduce((acc, curr) => {
      const { dial, password } = applyRotation(dialValue, curr, acc, part1);
      dialValue = dial;
      return password;
    }, 0);

    console.log(counter, dialValue);
  } catch (err) {
    console.error(err);
  }
}
