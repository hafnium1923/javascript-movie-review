import CustomElement from "../basic/CustomElement";
import { IMG } from "../../abstract/constants";
import "./MovieStar";

class MovieDetail extends CustomElement {
  template() {
    const id = this.getAttribute("id");
    const rate = localStorage.getItem(id);
    const starSrc = this.toStarSrc(rate);
    const title = this.getAttribute("title");
    const src = this.getAttribute("src");
    const voteAverage = this.getAttribute("voteAverage");
    const detail = this.getAttribute("detail");
    const genres = this.getAttribute("genres");

    return `
    <section class="modal-head">
      <span></span>
      <h3 class="detail-title">${title}</h1>
      <div id="close-btn" class="detail-title">X</div>
    </section>
    <hr />
    <section class="modal-main">
      <img class="modal-img skeleton" loading="lazy" src=${src} alt=${title} />
      <section class="modal-detail">
      <span>
        <div class="detail-info text-body">
          <p>${genres}</p>
          <img class="detail-star" src=${IMG.STAR_FILLED} alt="별점" />
          <p>${voteAverage}</p>
        </div>
        <div class="detail text-body">${detail}</div>
      </span>
      <movie-star id=${id} starSrc=${starSrc} rate=${rate}></movie-star>
      </section>
    </section>
    `;
  }

  toStarSrc(rate) {
    const fill = parseInt(rate);

    const starSrc = Array.from({ length: 5 }, (v, i) => {
      if (i < fill) return IMG.STAR_FILLED;
      return IMG.STAR_EMPTY;
    });

    return starSrc;
  }
}

customElements.define("movie-detail", MovieDetail);

export default MovieDetail;
