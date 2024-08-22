function CardContent({ player }: { player: string | null }) {
  const playername = player ? player : "입력이잘못되었어요";

  return (
    <iframe
      src={`https://dak.gg/er/players/${playername}`}
      title={playername}
      style={{
        width: "31vw",
        height: "99vh",
      }}
    />
  );
}

export default CardContent;
