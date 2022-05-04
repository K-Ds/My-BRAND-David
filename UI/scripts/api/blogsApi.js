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
    console.log(res);

    return await res.json();
  } catch (error) {
    console.log(error);
  }
};
