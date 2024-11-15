function contract(req, res) {
  res.send({
    qualAnalytics: [
      { name: "elements_created_at", type: "application/json" },
      { name: "elements_content", type: "application/json" },
    ],
    quantAnalytics: [{ name: "elements_count", type: "integer" }],
  });
}

function show(req, res) {
  const { activityID } = req.body;
  if (!activityID)
    return res.status(400).json({ error: "activity id are required" });
  res.status(200).json([
    {
      inveniraStdID: "1001",
      quantAnalytics: [
        { name: "Analytic 1", type: "boolean", value: true },
        { name: "Analytic 2", type: "integer", value: 234 },
      ],
      qualAnalytics: [
        { name: "Analytic 3", type: "text/plain", value: "text" },
        { name: "Analytic 4", type: "URL", value: "http://<address>/1001" },
      ],
    },
  ]);
}

export const analytics = {
  contract,
  show,
};
