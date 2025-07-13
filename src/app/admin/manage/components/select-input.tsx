"use client"

import React from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface SelectInputProps<T> {
  data: T[]
  value: string
  onChange: (value: string) => void
  valueKey: keyof T
  labelKey: keyof T
  placeholder?: string
  width?: string
}

export const SelectInput = <T,>(
  { data,
    value,
    onChange,
    valueKey,
    labelKey,
    placeholder = "Select an option",
    width = "w-[200px]" }:
    SelectInputProps<T>) => {

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={width}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="max-h-60 overflow-y-auto">
        {data.map((item, index) => (
          <SelectItem key={index} value={String(item[valueKey])}>
            {String(item[labelKey])}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

