import { ButtonGroup, Button } from "@mui/material";
import "./style.scss";

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
  return (
    <div className="button-group">
      <ButtonGroup variant="text" aria-label="Basic button group">
        {options.map((option) => (
          <Button
            key={option.value}
            value={option.value}
            onClick={() => onSelect(option.value)}
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
