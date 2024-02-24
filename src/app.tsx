import React, { useMemo, useState } from "react"
import { Keyboard } from "./type"
import { Board } from "./components/Board"
import { LayoutSelector } from "./components/LayoutSelector"
import { DictionnarySetter } from "./components/DictionnarySetter"

function processKeyboardText(text: string): Keyboard {
  return text.split("\n").map((line) => line.split(""))
}

export function App() {
  let [keyboardText, setKeyboardText] = useState("")
  let keyboard = useMemo(
    () => processKeyboardText(keyboardText),
    [keyboardText],
  )
  let [level, setLevel] = useState(1)
  let [length, setLength] = useState(100)
  let [dictionnary, setDictionnary] = useState<string[]>(() => [])

  return (
    <div>
      <LayoutSelector
        keyboardText={keyboardText}
        setKeyboardText={setKeyboardText}
      />
      <DictionnarySetter
        dictionnary={dictionnary}
        setDictionnary={setDictionnary}
      />
      <input
        type="number"
        value={level}
        min={1}
        onChange={(ev) => {
          setLevel(Number(ev.currentTarget.value))
        }}
      />
      <input
        type="number"
        value={length}
        min={1}
        onChange={(ev) => {
          setLength(Number(ev.currentTarget.value))
        }}
      />
      <Board
        keyboard={keyboard}
        dictionnary={dictionnary}
        level={level}
        length={length}
      />
    </div>
  )
}
