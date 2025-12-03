const title = $("#title");
const author = $("#author");
const body = $("#body");

const alert = $("#alert");

const postForm = $("#postForm");

const postList = $("#postList");

// Classes
class Post {
  constructor(title, author, body) {
    this.title = title;
    this.author = author;
    this.body = body;
  }
}

class UI {
  addPostToList(post) {
    const div = $("<div/>").addClass("col-12 col-md-4").html(`<div class='card'>
        <div class='card-body'>
        <h5 class='card-title'>${post.title}</h5>
        <div class='card-subtitle mb-2 badge text-bg-secondary'>${post.author}</div>
        <p class='card-text'>${post.body}</p>
        <button class='post-delete btn btn-link text-danger ps-0'>Delete post</button>
        </div>
      </div>`);
    postList.append(div);
  }

  clearInputs() {
    title.val("");
    author.val("");
    body.val("");
  }

  showAlert(message, className) {
    alert.html("");

    const alertDiv = $("<div></div>")
      .addClass(`col-md-4 alert alert-${className}`)
      .html(message);
    alert.html(alertDiv);

    // console.log(alertDiv);

    setTimeout(() => {
      alert.html("");
    }, 3000);
  }
}

// ready Codes
$(document).ready(function () {
  postForm.submit(submitForm);
});

// functions
function submitForm(e) {
  e.preventDefault();
  const post = new Post(title.val(), author.val(), body.val());
  const uI = new UI();
  if (title.val() === "" || author.val() === "" || body.val() === "") {
    console.log("All Field are Required!!!");
    uI.showAlert("All Field are Required!!!", "danger");
    return;
  }
  uI.addPostToList(post);
  uI.clearInputs();

  uI.showAlert("Post added succesfully!!!", "success");
  console.log(post);
}
