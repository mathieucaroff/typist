import classNames from "classnames"
import React, { useMemo, useState } from "react"
import { Keyboard } from "../type"

export interface KeyboardViewProp {
  keyboard: Keyboard
  pressedKeys: string[]
}

export function KeyboardView(prop: KeyboardViewProp) {
  let { keyboard, pressedKeys } = prop

  return (
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
  )
}
