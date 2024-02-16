export type Key = string

export type Keyboard = Key[][]

export interface Position {
  x: number
  y: number
}

export interface TypistConfig {
  dark: boolean
  keyboardColor: string
}
