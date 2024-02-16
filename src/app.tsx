import classNames from "classnames"
import React, { useMemo, useState } from "react"
import { Keyboard } from "./type"

function processKeyboardText(text: string): Keyboard {
  return text.split("\n").map((line) => line.split(""))
}

export function App() {
  let [keyboardText, setKeyboardText] = useState("")
  let keyboard = useMemo(
    () => processKeyboardText(keyboardText),
    [keyboardText],
  )
  let [pressedKeys, setPressedKeys] = useState<string[]>(() => [])

  return (
    <div>
      <div>Keyboard Input</div>
      <div>
        <textarea
          value={keyboardText}
          onChange={(ev) => {
            setKeyboardText(ev.currentTarget.value)
          }}
        />
      </div>
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
        <table className="keyboard">
          <tbody>
            {keyboard.map((row, k) => (
              <tr key={k}>
                <table>
                  <tbody>
                    <tr>
                      <td className={`keyboard__key keyboard__offset--${k}`} />
                      {row.map((keycap, m) => (
                        <td
                          className={classNames("keyboard__key", {
                            "keyboard__key--pressed": pressedKeys.includes(
                              keycap.toLowerCase(),
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
