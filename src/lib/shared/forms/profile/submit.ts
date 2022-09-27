import { goto } from "$app/navigation";


export const submit = function (id: string, pathname: string) {
  return async function (data: any) {
    const res = await fetch(`/api/professor/${id}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        new: data,
        pathname
      })
    });

    if (res.ok) {
      goto(res.url);
    };
  };
};
