import React, { useMemo, useState } from "react"
import { Keyboard } from "../type"
import { lesson } from "../lesson"
import { KeyboardView } from "./Keyboard"

export interface BoardProp {
  keyboard: Keyboard
  level: number
  length: number
}

export function Board(props: BoardProp) {
  let { keyboard, level, length } = props

  let lessonString = useMemo(
    () => keyboard.length > 2 && lesson(keyboard, level, length).toLowerCase(),
    [keyboard, level, length]
  )

  let [pressedKeys, setPressedKeys] = useState<string[]>(() => [])
  return (
    <div
      tabIndex={0}
      onKeyDown={(ev) => {
        setPressedKeys([...pressedKeys, ev.key.toLowerCase()])
      }}
      onKeyUp={(ev) => {
        let key = ev.key.toLowerCase()
        setPressedKeys(pressedKeys.filter((x) => x !== key))
      }}
    >
      <KeyboardView keyboard={keyboard} pressedKeys={pressedKeys} />
      {lessonString}
    </div>
  )
}
