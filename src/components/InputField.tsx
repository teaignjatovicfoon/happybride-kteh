interface Props {
  value: string | number;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function InputField({
  value,
  placeholder,
  onChange,
  type = "text",
}: Props) {
  return (
    <input
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      type={type}
    />
  );
}

export default InputField;