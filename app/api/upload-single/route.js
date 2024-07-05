// app/api/upload-single/route.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const POST = async (req) => {
  try {
    const { name, companyId } = await req.json();

    if (!name || !companyId) {
      return new Response('Name and Company ID are required', { status: 400 });
    }

    await prisma.patient.create({
      data: { patientName: name, companyId },
    });
    return new Response('Patient uploaded successfully', { status: 200 });
  } catch (error) {
    console.error('Error uploading patient:', error);
    return new Response('Error uploading patient', { status: 500 });
  }
};
