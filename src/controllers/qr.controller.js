const { PrismaClient } = require('@prisma/client');
const QRCode = require('qrcode');
const prisma = new PrismaClient();

class QRController {
  async generateStaticQR(req, res) {
    try {
      const { url, metadata } = req.body;
      const userId = req.user.id;

      const qrCode = await prisma.qRCode.create({
        data: {
          type: 'STATIC',
          currentUrl: url,
          metadata: JSON.stringify(metadata),
          userId
        }
      });

      const qrImage = await QRCode.toDataURL(url);

      res.json({ qrCode, qrImage });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async generateDynamicQR(req, res) {
    try {
      const { url, metadata } = req.body;
      const userId = req.user.id;

      const qrCode = await prisma.qRCode.create({
        data: {
          type: 'DYNAMIC',
          currentUrl: url,
          metadata: JSON.stringify(metadata),
          userId
        }
      });

      // Generate QR code with redirect URL
      const redirectUrl = `${process.env.BASE_URL}/redirect/${qrCode.id}`;
      const qrImage = await QRCode.toDataURL(redirectUrl);

      res.json({ qrCode, qrImage });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateDynamicQR(req, res) {
    try {
      const { id } = req.params;
      const { url } = req.body;
      const userId = req.user.id;

      const qrCode = await prisma.qRCode.findUnique({
        where: { id }
      });

      if (!qrCode) {
        return res.status(404).json({ error: 'QR code not found' });
      }

      if (qrCode.userId !== userId) {
        return res.status(403).json({ error: 'Unauthorized' });
      }

      if (qrCode.type !== 'DYNAMIC') {
        return res.status(400).json({ error: 'Cannot update static QR code' });
      }

      // Record URL history
      await prisma.urlHistory.create({
        data: {
          qrCodeId: id,
          url: qrCode.currentUrl
        }
      });

      // Update QR code
      const updatedQRCode = await prisma.qRCode.update({
        where: { id },
        data: { currentUrl: url }
      });

      res.json(updatedQRCode);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async trackEvent(req, res) {
    try {
      const { id } = req.params;
      const { location, device, browser, ipAddress, metadata } = req.body;

      const event = await prisma.event.create({
        data: {
          qrCodeId: id,
          location,
          device,
          browser,
          ipAddress,
          metadata: JSON.stringify(metadata)
        }
      });

      res.json(event);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getEvents(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const qrCode = await prisma.qRCode.findUnique({
        where: { id }
      });

      if (!qrCode || qrCode.userId !== userId) {
        return res.status(403).json({ error: 'Unauthorized' });
      }

      const events = await prisma.event.findMany({
        where: { qrCodeId: id },
        orderBy: { timestamp: 'desc' }
      });

      res.json(events);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getMyCodes(req, res) {
    try {
      const userId = req.user.id;

      const qrCodes = await prisma.qRCode.findMany({
        where: { userId },
        include: {
          _count: {
            select: { events: true }
          }
        }
      });

      res.json(qrCodes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = QRController;