import { cn } from "@/utils/cn";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useCallback, useEffect, useState } from "react";
import Switch, { type SwitchProps } from "@mui/material/Switch";

interface ToggleProps {
  id: string;
  label: string;
  value?: boolean | string;
  onChange: (id: string, value: string) => void;
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

const ToggleInput = ({ id, label, value, onChange }: ToggleProps) => {
  const [checked, setChecked] = useState(
    value === true || value === "true" ? true : false,
  );

  const handleOnChange = useCallback(() => {
    setChecked(!checked);
    onChange(id, (!checked).toString());
  }, [id, checked, onChange]);

  useEffect(() => {
    setChecked(value === true || value === "true" ? true : false);
  }, [value]);

  return (
    <>
      <FormControlLabel
        className="m-0 w-full justify-between"
        control={
          <StyledSwitch
            sx={{ m: 1 }}
            checked={checked}
            onChange={handleOnChange}
          />
        }
        label={label}
        labelPlacement="start"
      />
    </>
  );
};

export default ToggleInput;
