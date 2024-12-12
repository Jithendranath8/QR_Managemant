const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAnalytics = async (qrCodeId, userId, from, to) => {
  const qrCode = await prisma.qRCode.findUnique({ where: { id: qrCodeId } });
  if (!qrCode || qrCode.userId !== userId) {
    throw new Error("Unauthorized or invalid QR Code.");
  }

  const events = await prisma.event.findMany({
    where: { qrCodeId, timestamp: { gte: new Date(from), lte: new Date(to) } },
  });

  return {
    totalEvents: events.length,
    eventsByLocation: events.reduce((acc, event) => {
      const location = event.location || "Unknown";
      acc[location] = (acc[location] || 0) + 1;
      return acc;
    }, {}),
  };
};

module.exports = { getAnalytics };
