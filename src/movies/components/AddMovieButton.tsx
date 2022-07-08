interface AddMovieButtonProps {
  onClick: () => void
}

export function AddMovieButton({ onClick }: AddMovieButtonProps) {
  return (
    // TODO: Implement a clickable button
    <div onClick={onClick} style={{cursor: "pointer", paddingTop: "7rem", paddingBottom: "7rem", textAlign: "center"}} >
      <div style={{fontSize: "8rem"}}>+</div>
      <div className="button-label">Add Movie</div>
    </div>
  );
}
