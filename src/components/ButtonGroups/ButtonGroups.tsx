import { ButtonGroup, Button } from "@mui/material";
import "./style.scss";

interface ButtonGroupProps {
  category: { label: string; value: string }[];
  activeValue: string;
  onSelectCategory: (value: string) => void;
  disabled?: boolean;
}

const ButtonGroups: React.FC<ButtonGroupProps> = ({
  category,
  activeValue,
  onSelectCategory,
  disabled,
}) => {
  return (
    <div className="button-group">
      <ButtonGroup
        size="small"
        variant="outlined"
        aria-label="Basic button group"
      >
        {category.map((option) => (
          <Button
            key={option.value}
            value={option.value}
            onClick={() => onSelectCategory(option.value)}
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
