export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const apiUrl = 'http://20.193.149.47:2242/spas/vendor-spa-update-test/1/';

  try {
    const response = await fetch(apiUrl, {
      method: req.method,
      headers: {
        'Content-Type': req.headers['content-type'], // Important for multipart/form-data
      },
      body: req, // Stream the raw body
      duplex: 'half', // 👈 This fixes the issue in Node.js 18+
    });

    const text = await response.text();

    try {
      const json = JSON.parse(text);
      res.status(response.status).json(json);
    } catch {
      res.status(response.status).send(text);
    }
  } catch (error) {
    console.error('Proxy Error:', error);
    res.status(500).json({ error: 'Internal Proxy Error', message: error.message });
  }
}
