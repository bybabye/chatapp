export default function CircleAvatar({
  url,
  size,
}: {
  url: string;
  size: number;
}): JSX.Element {
  return (
    <img
      referrerPolicy="no-referrer"
      src={url}
      alt="avatar"
      style={{ width: `${size}px`, height: `${size}px` }}
      className={`object-cover rounded-[50%] `}
    />
  );
}
