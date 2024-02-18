import { Keyboard } from "./type"

/**
 * Produce a typing lesson which corresponds to the given criteria.
 *
 * @param keyboard The keyboard of the user
 * @param level The difficulty of the lesson
 * @param length The minimum number of characters in the lesson
 */
export function lesson(
  keyboard: Keyboard,
  level: number,
  length: number
): string {
  // Compute which letters should be used for the lesson
  let rowIndexAndStartArray = [
    [1, 0],
    [0, 0],
    [2, 1],
  ]
  let letterString = ""

  rowIndexAndStartArray.forEach(([rowIndex, start], k) => {
    let levelA = Math.min(level, 4 * (k + 1)) - 4 * k
    if (levelA > 0) {
      let row = keyboard[rowIndex].slice(start)
      letterString +=
        row.slice(4 - levelA, 4).join("") + row.slice(6, 6 + levelA).join("")
    }
  })
  if (level > 16) {
    letterString += rowIndexAndStartArray
      .slice(level - 16)
      .map(([rowIndex, start]) =>
        keyboard[rowIndex].slice(4 + start, 6 + start)
      )
      .join("")
  }
  letterString = letterString
    .split("")
    .filter((x) => x.toLowerCase() !== x.toUpperCase())
    .join("")

  // Make a list of pseudo-words composed of the letters of the lesson
  let wordArray: string[] = []
  let total = -1
  while (total < length) {
    let word =
      randomPermutationOfAnyNonZeroLength(letterString) +
      maybeALetter(letterString)
    wordArray.push(word)
    total += word.length + 1
  }

  return wordArray.join(" ")
}

function randomPermutationOfAnyNonZeroLength(letters: string) {
  let letterArray = letters.split("")
  let word = ""
  let keepGoing = true
  while (keepGoing && letterArray.length > 0) {
    let index = Math.floor(Math.random() * letterArray.length)
    word += letterArray[index]
    letterArray.splice(index, 1)
    keepGoing = Math.random() < 0.8
  }
  return word
}

function maybeALetter(letters: string) {
  if (Math.random() < 0.5) {
    return letters[Math.floor(Math.random() * letters.length)]
  }
  return ""
}
