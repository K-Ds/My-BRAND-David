const baseUrl = "https://my-brand-david.herokuapp.com/api/queries";
// const baseUrl = "http://localhost:5000/api/queries";

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

export const getQueries = async () => {
  try {
    let authToken = localStorage.getItem("token");
    if (!authToken) {
      location.href = "login.html";
    }

    let res = await fetch(baseUrl, {
      method: "GET",
      headers: { Authorization: `Bearer ${authToken}` },
    });

    if (res.ok) {
      return await res.json();
    } else {
      location.href = "login.html";
    }
  } catch (err) {
    console.log(err);
  }
};
