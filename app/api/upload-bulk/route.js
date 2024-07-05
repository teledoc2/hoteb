// app/api/upload-bulk/route.js

import { PrismaClient } from '@prisma/client';
import { promises as fs } from 'fs';
import path from 'path';
import csvParser from 'csv-parser';

const prisma = new PrismaClient();

export const POST = async (req) => {
  try {
    const data = await req.formData();
    const file = data.get('file');
    const companyId = data.get('companyId');

    if (!file || !companyId) {
      return new Response('File and Company ID are required', { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const tempFilePath = path.join(process.cwd(), 'temp', 'upload.csv');
    await fs.writeFile(tempFilePath, buffer);

    const patients = [];

    await new Promise((resolve, reject) => {
      fs.createReadStream(tempFilePath)
        .pipe(csvParser())
        .on('data', (row) => {
          patients.push({
            patientName: row.name,
            email: row.email,
            phone: row.phone,
            companyId,
          });
        })
        .on('end', resolve)
        .on('error', reject);
    });

    await prisma.patient.createMany({
      data: patients,
    });

    await fs.unlink(tempFilePath); // Clean up the temp file
    return new Response('Patients uploaded successfully', { status: 200 });
  } catch (error) {
    console.error('Error uploading patients:', error);
    return new Response('Error uploading patients', { status: 500 });
  }
};
