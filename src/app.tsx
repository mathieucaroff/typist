import classNames from "classnames"
import React, { useMemo, useState } from "react"
import { Keyboard } from "./type"
import { lesson } from "./lesson"

function processKeyboardText(text: string): Keyboard {
  return text.split("\n").map((line) => line.split(""))
}

const QWERTY = `
QWERTYUIOP{}
ASDFGHJKL;"|
-ZXCVBNM<>?
`.slice(1, -1)
const AZERTY = `
AZERTYUIOP^$
QSDFGHJKLMù*
<WXCVBN,;:!
`.slice(1, -1)
const ASSET2018 = `
QWDGJYPUL:{}
ASETFHNIOR"|
-ZXCVBKM<>?
`.slice(1, -1)

export function App() {
  let [keyboardText, setKeyboardText] = useState("")
  let keyboard = useMemo(
    () => processKeyboardText(keyboardText),
    [keyboardText]
  )
  let [pressedKeys, setPressedKeys] = useState<string[]>(() => [])
  let [level, setLevel] = useState(1)
  let [length, setLength] = useState(100)

  let lessonString = useMemo(
    () => keyboard.length > 2 && lesson(keyboard, level, length).toLowerCase(),
    [keyboard, level, length]
  )

  return (
    <div>
      <div>Keyboard Layout</div>
      <div>
        <select
          onChange={(ev) => {
            let key = ev.currentTarget.value.toUpperCase()
            setKeyboardText(
              {
                QWERTY,
                AZERTY,
                ASSET2018,
                OTHER: keyboardText,
              }[key] ?? ""
            )
          }}
        >
          <option>other</option>
          <option>Qwerty</option>
          <option>Azerty</option>
          <option>Asset2018</option>
        </select>
      </div>
      <div>
        <textarea
          value={keyboardText}
          onChange={(ev) => {
            setKeyboardText(ev.currentTarget.value)
          }}
        />
      </div>
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
        <div className="keyboard">
          {keyboard.map((row, k) => (
            <table key={k}>
              <tbody>
                <tr>
                  <td className={`keyboard__key keyboard__offset--${k}`} />
                  {row.map((keycap, m) => (
                    <td
                      className={classNames("keyboard__key", {
                        "keyboard__key--pressed": pressedKeys.includes(
                          keycap.toLowerCase()
                        ),
                      })}
                      key={m}
                    >
                      {keycap}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          ))}
        </div>
        {lessonString}
      </div>
    </div>
  )
}
