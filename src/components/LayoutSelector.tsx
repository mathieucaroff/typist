import React, { Dispatch, SetStateAction } from "react"

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
}

export function LayoutSelector(prop: LayoutSelectorProp) {
  let { keyboardText, setKeyboardText } = prop

  return (
    <>
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
    </>
  )
}
