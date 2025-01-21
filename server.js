const http = require("http");
const getReq = require("./methods/get-request");
const postReq = require("./methods/post-request");
const putReq = require("./methods/put-request");
const deleteReq = require("./methods/delete-request");
let tickets = require("./data/tickets.json");
//require("dotenv").config();

const PORT = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
       req.tickets = tickets;
       switch (req.method){
        case "GET":
         getReq(req, res);
         break;
        case "POST":
         postReq(req, res);
         break;
        case "PUT":
         putReq(req, res);
         break;
        case "DELETE":
         deleteReq(req, res);
         break;
    default:
        res.statusCode = 404;
        res.setHeader("Content-Type", "application/json");
        res.write(JSON.stringify({ title:  "Not Found", message: "Route not found"}));
        res.end();
       } 
});
 

server.listen(PORT, () => {
    console.log(`Server started on port : ${PORT}`);
}); 