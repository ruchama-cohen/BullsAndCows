export function calcBullPgia(secret: number[], guess: number[]) {
  let bulls = 0, pgias = 0;
  const secretCopy = [...secret];
  const guessCopy = [...guess];

  for (let i = 0; i < 4; i++) {
    if (guessCopy[i] === secretCopy[i]) {
      bulls++;
      secretCopy[i] = guessCopy[i] = -1;
    }
  }

  for (let i = 0; i < 4; i++) {
    if (guessCopy[i] !== -1) {
      const index = secretCopy.indexOf(guessCopy[i]);
      if (index > -1) {
        pgias++;
        secretCopy[index] = -1;
      }
    }
  }

  return { bulls, pgias };
}
