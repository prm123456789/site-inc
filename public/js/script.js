// public/js/script.js

// Lecture audio automatique si souhaité
document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("background-audio");
  if (audio) {
    audio.volume = 0.5;
  }
});

// Like post
function likePost(postId) {
  fetch(`/post/like/${postId}`, { method: "POST" })
    .then(res => res.json())
    .then(data => {
      document.getElementById(`like-count-${postId}`).innerText = data.likes;
    });
}

// Supprimer post
function deletePost(postId) {
  if (confirm("Supprimer cette publication ?")) {
    fetch(`/post/delete/${postId}`, { method: "DELETE" })
      .then(() => window.location.reload());
  }
}

// Supprimer commentaire
function deleteComment(postId, commentId) {
  if (confirm("Supprimer ce commentaire ?")) {
    fetch(`/post/${postId}/comment/${commentId}`, { method: "DELETE" })
      .then(() => window.location.reload());
  }
}
