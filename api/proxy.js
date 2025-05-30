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
        'Content-Type': req.headers['content-type'], // forward correct multipart type
      },
      body: req, // forward raw stream (Vercel handles this properly with bodyParser false)
    });

    const text = await response.text(); // use .text() instead of .json() to safely handle all types

    try {
      const json = JSON.parse(text);
      res.status(response.status).json(json);
    } catch {
      res.status(response.status).send(text); // fallback for plain text errors
    }
  } catch (error) {
    console.error('Proxy Error:', error);
    res.status(500).json({ error: 'Internal Proxy Error', message: error.message });
  }
}
