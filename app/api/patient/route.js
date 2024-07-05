import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const GET = async (req, res) => {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get('name');

  if (!name) {
    return new Response('Patient name is required', { status: 400 });
  }

  try {
    const patient = await prisma.patient.findUnique({
      where: { name },
    });

    if (!patient) {
      return new Response('Patient not found', { status: 404 });
    }

    return new Response(JSON.stringify({ customId: patient.customId }), { status: 200 });
  } catch (error) {
    return new Response('Error fetching patient', { status: 500 });
  }
};
