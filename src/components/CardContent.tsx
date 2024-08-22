function CardContent({ player }: { player: string | null }) {
  const playername = player ? player : "notfound";

  return (
    <iframe
      src={`https://dak.gg/er/players/${playername}`}
      title={playername}
      style={{
        width: "calc(50vw - 33px)",
        height: "99vh",
      }}
    />
  );
}

export default CardContent;
