type Props = {
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
};

export const TextInput: React.FC<Props> = (props: Props) => {
  return (
    <input
      className="p-3 rounded-lg bg-[#3F5269] text-white focus:outline-none outline outline-white outline-1 outline-offset-1"
      type="text"
      placeholder={props.placeholder}
      value={props.value}
      onChange={e => props.onChange?.(e.target.value)}
    />
  );
};
