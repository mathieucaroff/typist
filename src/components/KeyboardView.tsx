import classNames from "classnames"
import React, { useMemo, useState } from "react"
import { Keyboard } from "../type"

export interface KeyboardViewProp {
  keyboard: Keyboard
  pressedKeys: string[]
}

export function KeyboardView(prop: KeyboardViewProp) {
  let { keyboard, pressedKeys } = prop
  let { kind, keyArray } = keyboard

  return (
    <div className="keyboard">
      {keyArray.map((row, k) => (
        <table key={k}>
          <tbody>
            <tr>
              <td
                className={`keyboard__key keyboard__miniText keyboard__offset--${kind}--${k}`}
              >
                {kind === "TypeMatrix"
                  ? { [0]: "tab", [1]: "shift", [2]: null }[k]
                  : null}
              </td>
              {row.map((keycap, m) => (
                <>
                  {kind === "TypeMatrix" && m - Number(k === 2) === 5 ? (
                    <td
                      className={`keyboard__key keyboard__miniText keyboard__centralKey--${kind}--${k}`}
                    >
                      {{ [0]: "bksp", [1]: "enter", [2]: null }[k]}
                    </td>
                  ) : null}
                  {kind === "TypeMatrix" && k === 2 && m === 0 ? null : (
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
                  )}
                </>
              ))}
            </tr>
          </tbody>
        </table>
      ))}
    </div>
  )
}
