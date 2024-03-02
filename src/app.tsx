import React, { useMemo, useState } from "react"
import { Keyboard, KeyboardKind } from "./type"
import { Board } from "./components/Board"
import { LayoutSelector } from "./components/LayoutSelector"
import { DictionnarySetter } from "./components/DictionnarySetter"

function processKeyboardText(kind: KeyboardKind, text: string): Keyboard {
  return {
    kind,
    keyArray: text.split("\n").map((line) => line.split("")),
  }
}

export function App() {
  let [keyboardText, setKeyboardText] = useState("")
  let [keyboardKind, setKeyboardKind] = useState<KeyboardKind>("Basic")
  let keyboard = useMemo(
    () => processKeyboardText(keyboardKind, keyboardText),
    [keyboardKind, keyboardText]
  )
  let [level, setLevel] = useState(1)
  let [length, setLength] = useState(100)
  let [dictionnary, setDictionnary] = useState<string[]>(() => [])

  return (
    <>
      <LayoutSelector
        keyboardText={keyboardText}
        setKeyboardText={setKeyboardText}
        keyboardKind={keyboardKind}
        setKeyboardKind={setKeyboardKind}
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
        increaseLevel={() => {
          setLevel(level + 1)
        }}
      />
    </>
  )
}
