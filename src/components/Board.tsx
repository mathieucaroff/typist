import React, { useEffect, useMemo, useState } from "react"
import { Keyboard } from "../type"
import { lesson } from "../lesson"
import { KeyboardView } from "./Keyboard"

export interface BoardProp {
  keyboard: Keyboard
  dictionnary: string[]
  level: number
  length: number
}

export function Board(props: BoardProp) {
  let { keyboard, dictionnary, level, length } = props

  let [lessonString, setLessonString] = useState("")
  let [pressedKeys, setPressedKeys] = useState<string[]>(() => [])
  let [typedText, setTypedText] = useState<string>("")
  let [wrongTypedText, setWrongTypedText] = useState<string>("")

  useEffect(() => {
    setLessonString(
      keyboard.length <= 2
        ? ""
        : lesson(keyboard, level, length, dictionnary, "equal").toLowerCase(),
    )
    setTypedText("")
  }, [keyboard, level, length])

  useEffect(() => {
    const handleKeyDown = (ev: KeyboardEvent) => {
      if (ev.ctrlKey || ev.altKey || ev.metaKey) {
        return
      }
      let key = ev.key.toLowerCase()
      setPressedKeys([...pressedKeys, key])

      let setText = wrongTypedText ? setWrongTypedText : setTypedText
      let text = wrongTypedText || typedText
      if (key === "backspace") {
        setText(text.slice(0, -1))
      } else if (key.length === 1) {
        if (lessonString[typedText.length] !== key) {
          setWrongTypedText((wrongTypedText + key).slice(0, 4))
        } else {
          setText(text + key)
        }
      } else {
        console.log("unhandled keydown", key)
      }
    }

    const handleKeyUp = (ev: KeyboardEvent) => {
      let key = ev.key.toLowerCase()
      setPressedKeys(pressedKeys.filter((x) => x !== key))
    }

    document.body.addEventListener("keydown", handleKeyDown)
    document.body.addEventListener("keyup", handleKeyUp)

    return () => {
      document.body.removeEventListener("keydown", handleKeyDown)
      document.body.removeEventListener("keyup", handleKeyUp)
    }
  })

  return (
    <div tabIndex={0}>
      <KeyboardView keyboard={keyboard} pressedKeys={pressedKeys} />
      <div className="typing">
        <div className="label">the lesson</div>
        <div>{lessonString}</div>
        <div className="label">your input</div>
        <div>
          {typedText}
          <span className="red">{wrongTypedText}</span>
          <span className="blinkText">|</span>
        </div>
      </div>
    </div>
  )
}
