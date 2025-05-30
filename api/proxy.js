export default async function handler(req, res) {
  const response = await fetch('http://20.193.149.47:2242/spas/vendor-spa-update-test/1/', {
    method: 'PUT',
    body: req,
    headers: req.headers,
  });

  const data = await response.json();
  res.status(response.status).json(data);
}
