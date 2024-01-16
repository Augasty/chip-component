import { SetStateAction, useState } from "react"
import Select from "../src/Components/Select"
import { SelectOption } from "./Components/Types"

const options = [
  { label: "First", value: 1 },
  { label: "Second", value: 2 },
  { label: "Third", value: 3 },
  { label: "Fourth", value: 4 },
  { label: "Fifth", value: 5 },
]

function App() {
  const [value1, setValue1] = useState<SelectOption[]>([options[0]])

  return (
    <>
      <Select
        options={options}
        value={value1}
        onChange={(o: SetStateAction<SelectOption[]>) => setValue1(o)}
      />
    </>
  )
}

export default App
