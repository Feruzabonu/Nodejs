const fs = require("fs").promises;
const path = require("path");
const http = require("http");

const server = http.createServer(async (request, response)=>{
    let url = request.url;
    let method = request.method;

    if(url === "/" && method === "GET"){
        response.writeHead(200, {
            "Content-type": "text/html; charset=utf-8 ",
        });

        const filePath = path.join(__dirname, "views", "index.html");
        const file = await fs.readFile(filePath, "utf-8");
        response.end(file);
    }else if(url==="/" && method=== "POST"){

        

        let body = {};
          request.on("data",data=>{
              let reqBody = Buffer.from(data).toString();
              reqBody = reqBody.split("&");
              reqBody.forEach(el => {
                  el = el.split("=");
                  body[el[0]] = el[1];
              })

          })

          request.on("end", async ()=>{
            let dbPath = path.join(__dirname, "db.json");

            let db = await fs.readFile(dbPath, "utf-8");
            db = await JSON.parse(db);
            let users = db.users;
            let error = users.find(
                (user) => user.name.toLowerCase()===body.name.toLowerCase()
            );
            if(error){
                response.writeHead(404, {
                    "Content-Type":"text/json"
                })
                response.end(JSON.stringify({
                    ok: false,
                    message: "User already exisits"
                }))
            }else{
                response.writeHead(201, {
                    "Content-Type":"text/json; charset=utf-8"
                })
                users.push({
                    name:body.name,
                    phone: body.phone
                });

                await fs.writeFile(dbPath, JSON.stringify({users}))
            
                response.end(JSON.stringify({ok:true,users}))
            }
          })
    }

})

server.listen(8080);
