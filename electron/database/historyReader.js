import path from "path"
import { openDatabase } from "./connection.js"
export async function readProfileHistory(profile,searchString,limit,offset){
    let db
    try {

    db = await openDatabase(profile);

        const result = db.exec(
            `
            select
            urls.url,
            urls.title,
            urls.last_visit_time,
            visits.visit_time 
            from visits join urls on visits.url = urls.id
            ${searchString?`(Where urls.title LIKE "%${searchString}%" OR urls.url LIKE "%${searchString}%")`:""}
            ORDER BY visits.visit_time desc
            LIMIT ${limit} OFFSET ${offset}
            `
        )
        if (!result||!result[0]) throw("no data found")
        const history = result[0].values.map((r)=>{
         return Object.fromEntries(
            result[0].columns.map((c,i)=>{
                let v = r[i]
                if(c=="visit_time" || c =="last_visit_time"){
                    v = new Date(
                        v/1000 - 11644473600000
                    ).toLocaleString();
                }

            return [
               c,
               v
            ]})
         )
        })
        return history;
    }catch(err){
        console.log("error occured",err)
        throw  err
    }finally{
        db?.close()
    }
}