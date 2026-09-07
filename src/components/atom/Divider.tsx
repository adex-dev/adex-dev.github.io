type dividerProps = {
  className?: string;
};
export default function Divider({ className = "my-8" }: dividerProps) {
  return <div className={`divider ${className}`}></div>;
}
