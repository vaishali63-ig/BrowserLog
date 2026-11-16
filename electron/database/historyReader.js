import path from "path"
import { openDatabase } from "./connection.js"
export async function readProfileHistory(profile,searchString,startTime,endTime){
    let db
    try {

    db = await openDatabase(profile);

    const st = new Date(startTime).getTime()*1000 +11644473600000000;
    const et = new Date(endTime).getTime()*1000  +11644473600000000;

    const query =  `
            select
            urls.url,
            urls.title,
            urls.last_visit_time,
            visits.visit_time
            from visits join urls on visits.url = urls.id
            Where visits.visit_time between ${st} AND ${et} 
            ${searchString?`AND (urls.title LIKE "%${searchString}%" OR urls.url LIKE "%${searchString}%")`:""}
            ORDER BY visits.visit_time desc
            `
    console.log(query)
        const result = db.exec(
           query
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