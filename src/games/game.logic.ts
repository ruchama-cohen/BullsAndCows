export function calcBullPgia(secret: number[], guess: number[]) {
  let bulls = 0, pgias = 0;
  const secretCopy = [...secret];
  const guessCopy = [...guess];

  // בול
  for (let i = 0; i < 4; i++) {
    if (guessCopy[i] === secretCopy[i]) {
      bulls++;
      secretCopy[i] = guessCopy[i] = null;
    }
  }

  // פגיעה
  for (let i = 0; i < 4; i++) {
    if (guessCopy[i] != null) {
      const index = secretCopy.indexOf(guessCopy[i]);
      if (index > -1) {
        pgias++;
        secretCopy[index] = null;
      }
    }
  }

  return { bulls, pgias };
}
