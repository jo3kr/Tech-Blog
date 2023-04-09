document.querySelector(".new-post-btn").addEventListener("click", () => {
    window.location.href = "/newpost";
  });
  
  document.querySelectorAll(".edit-post-btn").forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const postId = event.target.getAttribute("data-post-id");
      window.location.href = `/editpost/${postId}`;
    });
  });
  
  document.querySelectorAll(".delete-post-btn").forEach((btn) => {
    btn.addEventListener("click", async (event) => {
      const postId = event.target.getAttribute("data-post-id");
      const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        location.reload();
      } else {
        alert("Failed to delete post.");
      }
    });
  });
  