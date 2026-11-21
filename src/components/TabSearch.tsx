import { useEffect, useState } from 'react';
import { Command, CommandInput } from '#components/ui/command';

import constants from "../lib/constants.ts"

const TabSearch = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handleOpen(message: any) {
      if (message.action === constants.TOGGLE_EVENT) {
        setOpen((prev) => !prev);
      }
    }

    function handleClose(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    browser.runtime.onMessage.addListener(handleOpen)
    addEventListener('keydown', handleClose)

    return () => {
      browser.runtime.onMessage.removeListener(handleOpen)
      removeEventListener('keydown', handleClose)
    }
  }, [])

  return (
    <div>
      {open ? (
        <Command className="max-w-sm rounded-lg border">
          <CommandInput placeholder="Search tabs..." />
        </Command> 
      ):
      (
        <Command className="hidden">
          <CommandInput placeholder="Search tabs..." />
        </Command> 
      )}
    </div>
  )
}

export default TabSearch
