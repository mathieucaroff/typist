import React, { Dispatch, SetStateAction, useState } from "react"

export interface DictionnarySetterProp {
  dictionnary: string[]
  setDictionnary: Dispatch<SetStateAction<string[]>>
}

export function DictionnarySetter(prop: DictionnarySetterProp) {
  let { dictionnary, setDictionnary } = prop

  let [loading, setLoading] = useState(false)
  let [dictionnaryLanguage, setDictionnaryLanguage] = useState("other")

  const handleDictionnaryLanguageChange = async (
    ev: React.ChangeEvent<HTMLSelectElement>,
  ) => {
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
    setDictionnary(() => {
      setLoading(false)
      return dictionnaryText.split("\n")
    })
  }

  const handleDictionnaryFileChange = (
    ev: React.ChangeEvent<HTMLInputElement>,
  ) => {
    let { files } = ev.currentTarget
    if (files && files[0]) {
      var reader = new FileReader()
      reader.readAsText(files[0], "utf-8")
      setLoading(true)
      reader.onload = function (onloadEvent) {
        setDictionnary((onloadEvent.target!.result as string).split("\n"))
        setLoading(false)
      }
    }
  }

  return (
    <>
      <div>Word list</div>
      <div>
        <select
          onChange={handleDictionnaryLanguageChange}
          value={dictionnaryLanguage}
        >
          <option>other</option>
          <option>English</option>
          <option>Espagñol</option>
          <option>Français</option>
          <option>Deutsche</option>
        </select>
        <input type="file" onChange={handleDictionnaryFileChange} />
      </div>
      <div>
        <textarea
          onChange={(ev) => {
            setDictionnary(ev.currentTarget.value.split("\n"))
            setDictionnaryLanguage("other")
          }}
          value={dictionnary.join("\n")}
          disabled={loading}
        ></textarea>
      </div>
    </>
  )
}
