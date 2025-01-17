import CustomElement from "../basic/CustomElement";
import SearchTitleProcessor from "../../domain/SearchTitleProcessor";
import { $ } from "../../util/dom";
import "./MovieList";
import "./MovieListSkeleton";

class MovieContainer extends CustomElement {
  connectedCallback() {
    super.connectedCallback();
    SearchTitleProcessor.subscribe(this);
  }

  template() {
    return `
        <section class="item-view">
          <h2>지금 인기 있는 영화</h2>
          <movie-list></movie-list>
          <movie-list-skeleton></movie-list-skeleton>
        </section>
    `;
  }

  rerender(searchWord) {
    $(".item-view h2").innerText = `'${searchWord}' 검색 결과`;
  }
}

customElements.define("movie-container", MovieContainer);

export default MovieContainer;
