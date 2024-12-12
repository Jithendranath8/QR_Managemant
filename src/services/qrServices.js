const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const QRCode = require("qrcode");

const generateQRCode = async (url, metadata, type, userId) => {
  const qrCode = await prisma.qRCode.create({
    data: { url, metadata, type, userId },
  });
  const qrImage = await QRCode.toDataURL(url);
  return { id: qrCode.id, qrImage };
};

const updateQRCode = async (id, url, userId) => {
  const qrCode = await prisma.qRCode.findUnique({ where: { id } });
  if (!qrCode || qrCode.userId !== userId || qrCode.type !== "DYNAMIC") {
    throw new Error("Unauthorized or invalid QR Code.");
  }


  await prisma.URLHistory.create({
    data: { qrCodeId: id, url: qrCode.url },
  });

  await prisma.qRCode.update({
    where: { id },
    data: { url },
  });

  return { message: "QR Code updated successfully." };
};

const trackEvent = async (qrCodeId, eventData) => {
  await prisma.event.create({ data: { qrCodeId, ...eventData } });
};

const getEvents = async (qrCodeId, userId) => {
  const qrCode = await prisma.qRCode.findUnique({ where: { id: qrCodeId } });
  if (!qrCode || qrCode.userId !== userId) {
    throw new Error("Unauthorized or invalid QR Code.");
  }

  return await prisma.event.findMany({ where: { qrCodeId } });
};

const getQRCodeById = async (req,res,next) => {
  try {
    const { id} = req.params;
    const qrId = await prisma.qRcode.findUnique({where : {id:parseInt(id)}})
    return res.status(200).send(qrId)
  }catch(e){
    next(e);
  }
}

module.exports = {
  generateQRCode,
  updateQRCode,
  trackEvent,
  getEvents,
  getQRCodeById
};
