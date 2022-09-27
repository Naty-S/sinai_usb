import { goto } from "$app/navigation";


export const submit = function (id: string, url: URL) {
  return async function (data: any) {
    console.log(data)
    const res = await fetch(`/api/professor/${id}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        new: data,
        url
      })
    });

    if (res.ok) {
      console.log(res.url)
      goto(res.url);
      // location.reload();
    };
  };
};
