import CustomElement from "../basic/CustomElement";
import MovieManager from "../../domain/MovieManager";
import { $ } from "../../util/dom";
import "./MovieList";
import "./ShowMoreButton";
import "./MovieListSkeleton";

class MovieContainer extends CustomElement {
  connectedCallback() {
    super.connectedCallback();
    MovieManager.subscribeSearch(this);
  }

  template() {
    return `
        <section class="item-view">
          <h2 class='movie-container-title'>지금 인기 있는 영화</h2>
          <movie-list></movie-list>
          <movie-list-skeleton></movie-list-skeleton>
          <show-more-button></show-more-button>
        </section>
    `;
  }

  rerender(searchWord) {
    $(".movie-container-title").innerText = `'${searchWord}' 검색 결과`;

    const isLastPage = MovieManager.hideShowMoreButton();
    $("show-more-button").hidden = isLastPage;
  }
}

customElements.define("movie-container", MovieContainer);

export default MovieContainer;
