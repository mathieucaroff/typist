import React, { Dispatch, SetStateAction } from "react"

export interface DictionnarySetterProp {
  dictionnary: string[]
  setDictionnary: Dispatch<SetStateAction<string[]>>
}

export function DictionnarySetter(prop: DictionnarySetterProp) {
  let { dictionnary, setDictionnary } = prop
  return (
    <div>
      <textarea
        onChange={(ev) => {
          setDictionnary(ev.currentTarget.value.split("\n"))
        }}
        value={dictionnary.join("\n")}
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
