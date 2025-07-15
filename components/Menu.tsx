import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Link from "next/link"

export function Menu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="bg-amber-200 font-extrabold text-[#8B4513] cursor-pointer" variant="outline">☰</Button>
      </SheetTrigger>
      <SheetContent side="left" className="bg-black text-white rounded-r-xl">
        <SheetHeader>
          <Link href={"/"}>
            <SheetClose asChild>
              <SheetTitle className="hover:text-white">Let me cook</SheetTitle>
            </SheetClose>
          </Link>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="grid gap-3">
            <SheetClose asChild>
              <Link className="hover:text-amber-200" href={"/recipe"}>Trouver un plat</Link>
            </SheetClose>
          </div>
          <div className="grid gap-3">
            <SheetClose asChild>
              <Link className="hover:text-amber-200" href={"/history"}>Historique</Link>
            </SheetClose>
          </div>
          <div className="grid gap-3">
            <SheetClose asChild>
              <Link className="hover:text-amber-200" href={"/favorite"}>Favoris</Link>
            </SheetClose>
          </div>
        </div>
        <SheetFooter>
          <Button className="cursor-pointer hover:ring-1 ring-white">Report a bug</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default Menu