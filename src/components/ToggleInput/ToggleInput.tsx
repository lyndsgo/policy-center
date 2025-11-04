import { cn } from "@/utils/cn";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useCallback, useEffect, useState } from "react";
import Switch, { type SwitchProps } from "@mui/material/Switch";

interface ToggleProps {
  id: string;
  className?: string;
  label: string;
  hideLabel?: boolean;
  value?: boolean | string;
  onChange: (id: string, value: boolean) => void;
}

const StyledSwitch = ({ ...props }: SwitchProps) => {
  return (
    <Switch
      disableRipple
      focusVisibleClassName="outline-6 outline-offset-[-12px] outline-gray-400"
      {...props}
      classes={{
        switchBase: cn(
          "p-0 m-[2px] transition-transform duration-300",
          props.checked && "translate-x-[-4px] text-white",
        ),
        thumb: "box-border w-[22px] h-[22px] bg-white rounded-full",
        track: cn(
          "rounded-full bg-gray-400 transition-colors duration-500 opacity-100",
          props.checked && "bg-brand-accent",
        ),
        disabled: "opacity-50",
      }}
      className={`h-[26px] w-[42px] p-0`}
    />
  );
};

const ToggleInput = ({
  id,
  className,
  label,
  hideLabel,
  value,
  onChange,
}: ToggleProps) => {
  const [checked, setChecked] = useState(value === true || value === "true");

  const handleOnChange = useCallback(() => {
    setChecked(!checked);
    onChange(id, !checked);
  }, [id, checked, onChange]);

  useEffect(() => {
    setChecked(value === true || value === "true");
  }, [value]);

  return (
    <>
      <FormControlLabel
        className={cn("m-0 w-full justify-between", className)}
        control={
          <StyledSwitch
            sx={{ m: 1 }}
            checked={checked}
            onChange={handleOnChange}
          />
        }
        label={label}
        labelPlacement="start"
        slotProps={{
          typography: {
            className: hideLabel ? "sr-only" : "",
          },
        }}
      />
    </>
  );
};

export default ToggleInput;
