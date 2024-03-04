import React, { Dispatch, SetStateAction, useState } from "react"

export interface DictionnarySetterProp {
  dictionnary: string[]
  setDictionnary: Dispatch<SetStateAction<string[]>>
}

export function DictionnarySetter(prop: DictionnarySetterProp) {
  let { dictionnary, setDictionnary } = prop

  let [loading, setLoading] = useState(false)
  let [dictionnaryLanguage, setDictionnaryLanguage] = useState("other")

  return (
    <div>
      <select
        onChange={async (ev) => {
          setDictionnaryLanguage(ev.currentTarget.value)
          let name = ev.currentTarget.value.toLowerCase()
          const dictionnaryTextGetter =
            {
              english: () =>
                import("bundle-text:../../asset/dictionnary/english.list.txt"),
              espagñol: () =>
                import("bundle-text:../../asset/dictionnary/espagnol.list.txt"),
              français: () =>
                import("bundle-text:../../asset/dictionnary/francais.list.txt"),
              deutsche: () =>
                import("bundle-text:../../asset/dictionnary/deutsche.list.txt"),
            }[name] ?? (async () => dictionnary.join("\n"))

          setLoading(true)
          let dictionnaryText = await dictionnaryTextGetter()
          console.log("dictionnaryText", dictionnaryText)
          setDictionnary(() => {
            setLoading(false)
            return dictionnaryText.split("\n")
          })
        }}
        value={dictionnaryLanguage}
      >
        <option>other</option>
        <option>English</option>
        <option>Espagñol</option>
        <option>Français</option>
        <option>Deutsche</option>
      </select>
      <textarea
        onChange={(ev) => {
          setDictionnary(ev.currentTarget.value.split("\n"))
        }}
        value={dictionnary.join("\n")}
        disabled={loading}
      ></textarea>
      <input
        type="file"
        onChange={(ev) => {
          let { files } = ev.currentTarget
          if (files && files[0]) {
            var reader = new FileReader()
            reader.readAsText(files[0], "utf-8")
            reader.onload = function (onloadEvent) {
              setDictionnary((onloadEvent.target!.result as string).split("\n"))
            }
          }
          console.log("file", ev.currentTarget.files![0])
        }}
      />
    </div>
  )
}
