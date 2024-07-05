import { promises as fs } from 'fs';
import path from 'path';

export const POST = async (req, res) => {
  try {
    const data = await req.formData();
    const file = data.get('file');

    if (!file) {
      return new Response('No file uploaded', { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filePath = path.join(process.cwd(), 'audio', file.name);

    await fs.writeFile(filePath, buffer);

    return new Response('File uploaded successfully', { status: 200 });
  } catch (error) {
    return new Response('Error uploading file', { status: 500 });
  }
};
