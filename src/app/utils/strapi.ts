const STRAPI_URL = "http://localhost:1337/api";

export async function postData(endpoint: string, payload: any) {
  try {
    const res = await fetch(`${STRAPI_URL}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: payload,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Strapi Error:", data);
      throw new Error("Failed to send data");
    }

    return data;
  } catch (error) {
    console.error("POST Error:", error);
  }
}


export async function getData(endpoint: string) {
  try {
    const response = await fetch(`${STRAPI_URL}/${endpoint}`,{  
    method:"GET",
    headers: {
      "Content-Type": "application/json",
    }});
    const data = await response.json();  
    if(!response.ok){
      console.error("Strapi Error:", data);
      throw new Error("Failed to fetch data");  
    }
    else {
      return data;
    } } catch (error) {
    console.error("GET Error:", error);
  }
}

