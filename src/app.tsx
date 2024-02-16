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
      <div>
        <table className="keyboard">
          <tbody>
            {keyboard.map((row, k) => (
              <tr key={k}>
                <table>
                  <tbody>
                    <tr>
                      <td className={`keyboard__key keyboard__offset--${k}`} />
                      {row.map((keycap, m) => (
                        <td className="keyboard__key" key={m}>
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
