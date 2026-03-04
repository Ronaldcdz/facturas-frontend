"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Plus } from "lucide-react";

export function CreateClientModal() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild className="fixed bottom-4 right-4 z-50">
          <Button
            style={{ textShadow: `0 4px 8px hsl(var(--accent))` }}
            className="bg-accent rounded-4xl py-6"
          >
            <Plus className="h-10 w-10" />{" "}
            <span className="text-lg">Nuevo Cliente</span>
          </Button>
        </DialogTrigger>
        <DialogContent
          className="min-h-screen min-w-screen rounded-none"
          showCloseButton={false}
        >
          <DialogHeader>
            <div className="grid grid-cols-3 items-center">
              <Button
                variant="ghost"
                size="icon"
                className="justify-self-start"
              >
                <ArrowLeft className="h-10 w-10" />
              </Button>
              <DialogTitle className="text-center col-start-2">
                Crear Cliente
              </DialogTitle>
              <div></div>
            </div>
            <div className="-mt-4">
              <hr className="border-t border-border my-4" />
            </div>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
            </Field>
            <Field>
              <Label htmlFor="username-1">Username</Label>
              <Input id="username-1" name="username" defaultValue="@peduarte" />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
