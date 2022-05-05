const baseUrl = "https://my-brand-david.herokuapp.com/api/queries";

export const postQuery = async (query) => {
  try {
    let res = await fetch(baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(query),
    });

    if (res.ok) {
      return "success";
    } else {
      return await res.json();
    }
  } catch (err) {
    console.warn(err);
  }
};
