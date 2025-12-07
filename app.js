const title = $("#title");
const author = $("#author");
const body = $("#body");
const btnSubmit = $("#btn-submit");

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
    const div = $("<div/>").addClass("post col-12 col-md-4")
      .html(`<div class='card'>
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

  showAlert(message, className, timeSet = true) {
    alert.html("");

    const alertDiv = $("<div></div>")
      .addClass(`col-md-4 alert alert-${className}`)
      .html(message);
    alert.html(alertDiv);

    // console.log(alertDiv);

    if (timeSet) {
      setTimeout(() => {
        alert.html("");
      }, 3000);
    }
  }

  deletePost(target) {
    console.log($(target).closest(".post"));
    // $(target).parent().parent().parent().remove();
    $(target).closest(".post").remove();
  }
}

class Storage {
  static getPosts() {
    let posts;
    if (localStorage.getItem("posts") === null) {
      posts = [];
    } else {
      posts = JSON.parse(localStorage.getItem("posts"));
    }
    // console.log(posts);
    return posts;
  }

  static addPost(post) {
    let posts = Storage.getPosts();
    posts.push(post);
    localStorage.setItem("posts", JSON.stringify(posts));
    console.log("post added to localStorage");
  }

  static displayPosts() {
    const posts = Storage.getPosts();
    const uI = new UI();

    posts.forEach((post) => {
      uI.addPostToList(post);
    });
  }

  static removePost(title) {
    let posts = Storage.getPosts();
    posts = posts.filter((post) => post.title !== title);
    localStorage.setItem("posts", JSON.stringify(posts));
  }
}

// ready Codes
$(document).ready(function () {
  const uI = new UI();
  setTimeout(() => {
    $("#loading").css("display", "none");
    const posts = Storage.getPosts();
    console.log(posts);

    if (posts.length === 0) {
      uI.showAlert("No Data Find !!!!", "warning", false);
    }
    Storage.displayPosts();
  }, 2000);

  postForm.submit(submitForm);

  postList.click(deletePost);
});

// functions
function submitForm(e) {
  e.preventDefault();
  btnSubmit.addClass("loading");
  btnSubmit.text("");
  const post = new Post(title.val(), author.val(), body.val());
  const uI = new UI();

  if (title.val() === "" || author.val() === "" || body.val() === "") {
    console.log("All Field are Required!!!");
    // uI.showAlert( "All Field are Required!!!", "danger", 3000 );
    Swal.fire({
      title: "Error",
      text: "All Field are Required!!!",
      icon: "error",
      timer: 3000,
    });
    btnSubmit.removeClass("loading");
    btnSubmit.text("Create");
    return;
  }
  setTimeout(() => {
    btnSubmit.removeClass("loading");
    btnSubmit.text("Create");
    uI.addPostToList(post);
    Storage.addPost(post);
    uI.clearInputs();
    // uI.showAlert( "Post added succesfully!!!", "success", 3000 );
    Swal.fire({
      title: "Success",
      text: "Post added succesfully!!!",
      icon: "success",
      timer: 3000,
    });
    console.log(post);
  }, 1000);
}

function deletePost(e) {
  e.preventDefault();
  // console.log(e.target);
  const postTitle = $(e.target).parent().children().first().text();
  const uI = new UI();

  if ($(e.target).hasClass("post-delete")) {
    Swal.fire({
      title: "Are you sure?",
      text: "This operation cannot be reversed!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        // console.log("حذف انجام شد");
        uI.deletePost(e.target);
        Storage.removePost(postTitle);
      }
    });
    // uI.showAlert("The Post has been Deleted!!!!", "danger", 3000);
  }
}
