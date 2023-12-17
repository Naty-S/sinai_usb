import { goto } from "$app/navigation";

import * as api from "$lib/api";


export const submit = function (profesor_id: number, pathname: string) {
  return async function (data: any) {
    
    console.log("submit")

    // const blob = new Blob(data.proyecto, { type: "application/pdf" })
    // console.log("blob")
    // console.log(blob)
    // console.log("blob text")
    // console.log(await blob.text())
    const f = data.proyecto as FileList
    
    data.profesor = profesor_id;
    data.proyecto = await (new Blob(data.proyecto, { type: "application/pdf" })).text()
    // data.soportes = data.soportes.map(async (s: FileList) => await (new Blob(s, { type: "application/pdf" })).text())
    data.soportes = []

    // const obj = { hello: "world" };
    // const blob = new Blob([b], {
    //   type: "application/pdf",
    // });

    const res = await api.post("/api/s1_novel/request", {data, pathname});

    if (res.ok) {
      goto(res.url);

    } else {
      const { message, code } = await res.json();
      goto(`${pathname}?error=${message}&code=${code}`);
    };
  };
};
