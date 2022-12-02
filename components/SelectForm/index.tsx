import React from 'react'
import {MenuItem, Select, styled} from "@mui/material"
type Props = {
    label: string;
    value: string;
    setValue: (x: string) => void;
    list: string[];
}

const StyledMenuItem = styled(MenuItem)`
    
`

const SelectForm = ({ label, value, setValue, list }: Props) => {
    const handleChange = (e:any) => {
        setValue(e.target.value)
    }
  return (
    <>
      <div className="grid w-[300px] max-w-[400px] gap-[10px] my-4">
        <label htmlFor="address" className="text-lg">
          {label}
        </label>
              <Select
                  value={value} onChange={handleChange}>
            {
                list.map(element => <StyledMenuItem value={element}>
                        {element}
                    </StyledMenuItem>)
            }
        </Select>
      </div>
    </>
  )
}

export default SelectForm