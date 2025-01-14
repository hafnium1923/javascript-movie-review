import { ApiMovieItem, Movie, ApiMovieDetail } from "../type/movieType";
import { modalUrl, popularUrl, request, searchUrl } from "../util/api";

class MovieModel {
  private movies: Movie[] = [];
  private searchWord: string = "";
  private page: number = 1;
  private totalPages: number = 0;
  private statusCode: number = 1;

  getMovieList() {
    return this.movies;
  }

  getStatusCode() {
    return this.statusCode;
  }

  toMovies(results: ApiMovieItem[]) {
    return results.map((result: ApiMovieItem) => {
      return {
        title: result.title,
        src: result.poster_path,
        voteAverage: Number(result.vote_average.toFixed(1)),
        id: result.id,
      };
    });
  }

  toDetail(result: ApiMovieDetail) {
    const genre = result.genres
      .map((genre) => {
        return genre.name;
      })
      .join(",");
    return {
      title: result.title,
      src: result.poster_path,
      voteAverage: Number(result.vote_average.toFixed(1)),
      id: result.id,
      detail: result.overview,
      genres: genre,
    };
  }

  increasePage() {
    this.page += 1;
  }

  isLastPage() {
    return this.page === this.totalPages;
  }

  async updateMovieModal(id: string) {
    const url = modalUrl(id);
    const data = await request(url);
    if (data.status_code) {
      this.statusCode = data.status_code;
      return;
    }
    return this.toDetail(data);
  }

  async updateMovies(query: string = "") {
    this.page = 1;
    this.searchWord = query;

    const url = this.searchWord
      ? searchUrl(this.searchWord, this.page)
      : popularUrl(this.page);

    const data = await request(url);
    this.totalPages = data.total_pages;
    if (data.status_code) {
      this.statusCode = data.status_code;
      return;
    }

    this.movies = this.toMovies(data.results);
  }

  async updateMoreMovies() {
    this.increasePage();

    const url = this.searchWord
      ? searchUrl(this.searchWord, this.page)
      : popularUrl(this.page);

    const data = await request(url);
    if (data.status_code) {
      this.statusCode = data.status_code;
      return;
    }

    this.movies = this.toMovies(data.results);
  }
}

const MovieInstance = new MovieModel();
export default MovieInstance;
