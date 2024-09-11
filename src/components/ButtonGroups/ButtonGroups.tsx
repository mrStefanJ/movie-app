import { ButtonGroup, Button } from "@mui/material";
import "./style.scss";
import { useState } from "react";

interface ButtonGroupProps {
  options: { label: string; value: string }[];
  activeValue: string;
  onSelect: (value: string) => void;
  disabled?: boolean;
}

const ButtonGroups: React.FC<ButtonGroupProps> = ({
  options,
  activeValue,
  onSelect,
  disabled,
}) => {
  const [activeButton, setActiveButton] = useState<string>("");

  const handleClick = (value: string) => {
    if (activeButton === value) {
      setActiveButton("");
      onSelect("");
    } else {
      setActiveButton(value);
      onSelect(value);
    }
  };

  return (
    <div className="button-group">
      <ButtonGroup variant="text" aria-label="Basic button group">
        {options.map((option) => (
          <Button
            key={option.value}
            value={option.value}
            onClick={() => handleClick(option.value)}
            className={activeValue === option.value ? "active" : "disabled"}
            disabled={disabled}
          >
            {option.label}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
};

export default ButtonGroups;
