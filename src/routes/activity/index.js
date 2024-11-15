function deploy(req, res) {
  const { activityID, IstdID, json_params } = req.body;
  const { name, instructions, boardid } = json_params;
  const protocol = req.protocol;
  const host = req.get("host");

  // subscribe to board
  // register activityid and boardid

  //send response
  res.status(200).send(`${protocol}://${host}/activity/${activityID}`);
}

function show(req, res) {
  const activityID = req.params.id;
  //need to fetch some data related to the activity provided as param
  //need to add functionality to send request directly to AP to register user into board
  const html = `
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <title>Activity Details</title>
  </head>
  <body>
      <h1>Activity Details for activity: ${activityID}</h1>
      <p>
          Instructions: 
      </p>
      <form>
          <label for="userId">User ID:</label><br>
          <input type="text" id="userId" name="userId" placeholder="Your Miro User ID" readonly><br><br>
      </form>
  </body>
  </html>
`;
  res.status(200).send(html);
}

export const activity = {
  show,
  deploy,
};
