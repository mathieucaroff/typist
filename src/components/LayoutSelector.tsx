import React, { Dispatch, SetStateAction, useState } from "react"
import { KeyboardKind } from "../type"

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

export interface LayoutSelectorProp {
  keyboardText: string
  setKeyboardText: Dispatch<SetStateAction<string>>
  keyboardKind: KeyboardKind
  setKeyboardKind: Dispatch<SetStateAction<KeyboardKind>>
}

export function LayoutSelector(prop: LayoutSelectorProp) {
  let { keyboardText, setKeyboardText, keyboardKind, setKeyboardKind } = prop

  let [keyboardLayout, setKeyboardLayout] = useState("other")

  return (
    <>
      <div>Keyboard Layout</div>
      <div>
        <select
          onChange={(ev) => {
            setKeyboardLayout(ev.currentTarget.value)

            let name = ev.currentTarget.value.toUpperCase()
            setKeyboardText(
              {
                QWERTY,
                AZERTY,
                ASSET2018,
                OTHER: keyboardText,
              }[name] ?? ""
            )
          }}
          value={keyboardLayout}
        >
          <option>other</option>
          <option>Qwerty</option>
          <option>Azerty</option>
          <option>Asset2018</option>
        </select>
        <select
          onChange={(ev) => {
            let name = ev.currentTarget.value as KeyboardKind

            setKeyboardKind(name)
          }}
          value={keyboardKind}
        >
          <option>Basic</option>
          <option>TypeMatrix</option>
        </select>
      </div>
      <div>
        <textarea
          value={keyboardText}
          onChange={(ev) => {
            setKeyboardText(ev.currentTarget.value)
            setKeyboardLayout("other")
          }}
        />
      </div>
    </>
  )
}
