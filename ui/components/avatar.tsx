function getShortName(full_name: string = "") {
  if (full_name.includes(" ")) {
    const names = full_name.split(" ");
    return `${names[0].charAt(0)}${names[1].charAt(0)}`.toUpperCase();
  }

  return `${full_name.slice(0, 2)}`.toUpperCase();
}

interface Props {
  children: string;
  color?: string;
}

export default function Avatar({ children, color = "" }: Props) {
  return (
    <div
      className="bg-blue-500 w-[45px] h-[45px] flex items-center justify-center rounded-full"
      style={{ backgroundColor: color }}
    >
      <span className="font-bold text-sm text-white">
        {getShortName(children)}
      </span>
    </div>
  );
}
