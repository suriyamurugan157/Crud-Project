module.exports = (req, res) => {
    let baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
    let id = req.url.split("/")[3];
    const regexV4 = new RegExp(
      /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
    );
  
    if (req.url === "/api/tickets") {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.write(JSON.stringify(req.tickets));
      res.end();
    } else if (!regexV4.test(id)) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          title: "Validation Failed",
          message: "UUID is not valid",
        })
      );
    } else if (baseUrl === "/api/tickets/" && regexV4.test(id)) {
      res.setHeader("Content-Type", "application/json");
      let filteredTicket = req.tickets.filter((ticket) => {
        return ticket.id === id;
      });
  
      if (filteredTicket.length > 0) {
        res.statusCode = 200;
        res.write(JSON.stringify(filteredTicket));
        res.end();
      } else {
        res.statusCode = 404;
        res.write(
          JSON.stringify({ title: "Not Found", message: "Ticket not found" })
        );
        res.end();
      }
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ title: "Not Found", message: "Route not found" }));
    }
  };