const baseUrl = "https://my-brand-david.herokuapp.com/api/posts";

export const getBlogs = async () => {
  try {
    let res = await fetch(baseUrl);
    console.log(res);

    return await res.json();
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
