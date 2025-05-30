// /pages/api/proxy.js
import formidable from 'formidable';
import FormData from 'form-data';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const apiUrl = 'http://20.193.149.47:2242/spas/vendor-spa-update-test/1/';

  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const form = formidable({ multiples: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Form parse error:', err);
      return res.status(500).json({ message: 'Form parsing error', error: err });
    }

    try {
      const formData = new FormData();

      // Append normal fields
      Object.keys(fields).forEach((key) => {
        formData.append(key, fields[key][0]); // formidable returns arrays
      });

      // Append files
      if (files.images) {
        const images = Array.isArray(files.images) ? files.images : [files.images];
        images.forEach((file) => {
          formData.append('images', fs.createReadStream(file.filepath), file.originalFilename);
        });
      }

      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: formData.getHeaders(),
        body: formData,
      });

      const text = await response.text();

      try {
        const json = JSON.parse(text);
        res.status(response.status).json(json);
      } catch {
        res.status(response.status).send(text);
      }
    } catch (error) {
      console.error('Upload proxy error:', error);
      res.status(500).json({ error: 'Internal proxy error', message: error.message });
    }
  });
}
