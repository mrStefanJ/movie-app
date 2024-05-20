const useGenres = (selectedGenre: any) => {
  if (!Array.isArray(selectedGenre) || selectedGenre.length < 1) return "";

  const GenreIds = selectedGenre.map((g: any) => g.id);
  return GenreIds.reduce((acc: any, curr: any) => acc + "," + curr);
};

export default useGenres;
