interface Props {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
}

function CustomButton({ text, onClick, type = "button", className }: Props) {
  return (
    <button onClick={onClick} type={type} className={className}>
      {text}
    </button>
  );
}

export default CustomButton;