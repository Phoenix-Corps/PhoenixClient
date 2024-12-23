type Props = {
  value?: string;
  placeholder?: string;
  className?: string;
  onChange?: (value: string) => void;
};

export const TextInput: React.FC<Props> = (props: Props) => {
  return (
    <input
      className={`p-3 rounded-lg bg-[transparent] text-white outline outline-white outline-1 outline-offset-1 ${
        props.className ?? ""
      }`}
      type="text"
      placeholder={props.placeholder}
      value={props.value}
      onChange={e => props.onChange?.(e.target.value)}
    />
  );
};
