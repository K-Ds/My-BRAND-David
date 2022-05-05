const baseUrl = "https://my-brand-david.herokuapp.com/api/posts";

export const getBlogs = async () => {
  try {
    let res = await fetch(baseUrl);
    if (res.ok) {
      const data = await res.json();

      const posts = data.map((post) => {
        let postrevised = { ...post };
        postrevised.summary =
          post.body && post.body.length > 120
            ? post.body.slice(0, 120).split(" ").slice(0, -1).join(" ")
            : post.body;

        return postrevised;
      });
      return posts;
    } else {
      console.warn("Error");
    }
  } catch (error) {
    console.log(error);
  }
};

export const getOneBlog = async (postId) => {
  try {
    let res = await fetch(`${baseUrl}/${postId}`);

    if (res.ok) {
      return await res.json();
    } else {
      return "error";
    }
  } catch (error) {
    console.log(error);
  }
};

export const postComment = async (postId, comment) => {
  try {
    let res = await fetch(`${baseUrl}/${postId}/comment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(comment),
    });

    if (res.ok) {
      return "success";
    } else {
      return await res.json();
    }
  } catch (error) {
    console.log(error);
  }
};

export const postLike = async (postId) => {
  try {
    let res = await fetch(`${baseUrl}/${postId}/like`, {
      method: "POST",
    });

    if (res.ok) {
      return "success";
    } else {
      return await res.json();
    }
  } catch (error) {
    console.log(error);
  }
};

export const postDislike = async (postId) => {
  try {
    let res = await fetch(`${baseUrl}/${postId}/dislike`, {
      method: "POST",
    });

    if (res.ok) {
      return "success";
    } else {
      return await res.json();
    }
  } catch (error) {
    console.log(error);
  }
};
