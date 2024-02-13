import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChangeDetailsForm } from "./ChangeDetailsForm";

function ChangeDetails() {
  return (
    <Dialog>
      <DialogTrigger>
        <p className="text-[1rem] w-full bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 font-bold rounded-2xl py-3">
          View account details
        </p>
      </DialogTrigger>
      <DialogContent className="w-[87vw] rounded-2xl top-60">
        <DialogHeader>
          <DialogTitle className=" text-lg font-extrabold">
            Account details
          </DialogTitle>
        </DialogHeader>
        <ChangeDetailsForm />
      </DialogContent>
    </Dialog>
  );
}

export { ChangeDetails };
