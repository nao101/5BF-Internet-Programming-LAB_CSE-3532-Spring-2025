import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './components/ui/dropdown-menu'
import { Button } from './components/ui/button'
import { Moon, Sun } from 'lucide-react'

const DarkMode = () => {
  return (
    <div>
          <DropdownMenu>
      <DropdownMenuTrigger asChild>
      <Button
  variant="ghost"
  size="icon"
  className="text-white bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800"
>
  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
  <span className="sr-only">Toggle theme</span>
</Button>


      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    </div>
  )
}

export default DarkMode
