"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react";

export function CurrencySelector({onChange}) {
  const [currency, setCurrency] = useState("₹")
  useEffect((()=>{
      onChange(currency);
  }),[currency])
  

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{currency}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuRadioGroup value={currency} onValueChange={setCurrency}>
          <DropdownMenuRadioItem value="₹">₹(Rupee)</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="$">$(USD)</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="€">€(Euro)</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
