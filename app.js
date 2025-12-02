const title = $("#title");
const author = $("#author");
const body = $("#body");

const postForm = $("#postForm");

class Post {
  constructor(title, author, body) {
    this.title = title;
    this.author = author;
    this.body = body;
  }
}

class UI {}

$(document).ready(function () {
  postForm.submit(submitForm);
});

function submitForm(e) {
  e.preventDefault();
  const post = new Post(title.val(), author.val(), body.val());
  console.log(post);
}
