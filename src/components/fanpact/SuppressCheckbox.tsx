import { Checkbox } from "@/components/ui/checkbox";

export function SuppressCheckbox({
  checked,
  onCheckedChange,
  id = "fp-suppress-welcome",
}: {
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
  id?: string;
}) {
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer items-center gap-2 text-xs text-muted-foreground select-none"
    >
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={(v) => onCheckedChange(v === true)}
      />
      Don't show this again on this device
    </label>
  );
}
