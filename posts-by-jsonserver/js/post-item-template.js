export default function createPostItem(item) {
  return `<li class="posts-list__item" data-id="${item.id}">
    <div class="card">
      <div class="card__content">
        <h3 class="card__title">${item.title}</h3>
        <p class="card__author">by ${item.author}</p>

        <p class="card__description">${item.text}</p>

        <ul class="tag-list">
          <li class="tag-list__item">${item.tag}</li>
        </ul>
      </div>

      <button class="card__button button">
        <i class="material-icons button__icon">delete_forever</i>
        Удалить
      </button>
    </div>
  </li>`;
}
