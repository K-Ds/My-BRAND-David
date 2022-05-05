const baseUrl = "https://my-brand-david.herokuapp.com/api/auth";

export const login = async (creds) => {
  try {
    const res = await fetch(baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(creds),
    });

    if (res.ok) {
      const token = await res.json();

      localStorage.setItem(token, token.token);

      return "success";
    } else {
      return res.json();
    }
  } catch (e) {
    console.log(e);
  }
};
