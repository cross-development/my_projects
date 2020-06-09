'use strict';

import createPostItem from './post-item-template.js';

const refs = {
  tagList: document.querySelector('.js-tags'),
  postList: document.querySelector('.posts-list'),
  form: document.querySelector('#create-form'),
};

//=================== GET - чтение READ ===================
refs.tagList.addEventListener('click', e => {
  const tagBtn = handleTagClick(e);
  fetchPosts()
    .then(data =>
      data.filter(post => {
        if (post.tag.toLowerCase().includes(tagBtn)) {
          renderData(post);
        }
      }),
    )
    .catch(console.warn);
});

function handleTagClick(e) {
  if (e.target === e.currentTarget) {
    return;
  }

  const element = e.target;
  element.classList.toggle('tags__link--active');
  const tag = element.dataset.tag;
  return tag;
}

async function fetchPosts() {
  const res = await fetch('http://localhost:4040/posts');
  return await res.json();
}

//=================== POST - создание CREATE ===================
refs.form.addEventListener('submit', e => {
  const postData = handleFormSubmit(e);

  //   addPost(postData).then(renderData).catch(console.warm);
  addPost(postData)
    .then(alert('You just created a new post!'))
    .catch(console.warn);
});

function renderData(dataToRender) {
  const markup = createPostItem(dataToRender);

  if (!markup) {
    return;
  }

  refs.postList.insertAdjacentHTML('beforeend', markup);
}

function handleFormSubmit(e) {
  e.preventDefault();

  const formData = new FormData(event.currentTarget);
  const data = {};

  formData.forEach((value, name) => (data[name] = value));

  return data;
}

async function addPost({ title, tag, text, author }) {
  const url = 'http://localhost:4040/posts';
  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, tag, text, author }),
  };

  const res = await fetch(url, option);
  return await res.json();
}

//=================== DELETE - удаление DELETE ===================
refs.postList.addEventListener('click', handleDeleteBtnClick);

function handleDeleteBtnClick(e) {
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }

  const postItem = e.target.closest('li.posts-list__item');
  const postId = Number(postItem.dataset.id);

  if (postId === undefined) {
    return;
  }

  deletePost(postId);
  postItem.remove();
}

async function deletePost(postId) {
  const url = `http://localhost:4040/posts/${postId}`;

  const option = {
    method: 'DELETE',
  };

  const res = await fetch(url, option);
  return await res.json();
}
