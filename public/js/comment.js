document.querySelector(".comment-form").addEventListener("submit", async (event) => {
    event.preventDefault();
  
    const postId = window.location.pathname.split("/")[2];
    const content = document.querySelector("#comment-content").value.trim();
  
    if (content) {
      const response = await fetch(`/api/comments`, {
        method: "POST",
        body: JSON.stringify({ content, post_id: postId }),
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
        window.location.reload();
      } else {
        alert("Failed to add comment.");
      }
    }
  });
  