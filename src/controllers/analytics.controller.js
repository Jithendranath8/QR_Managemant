const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class AnalyticsController {
  async getAnalytics(req, res) {
    try {
      const { id } = req.params;
      const { startDate, endDate } = req.query;
      const userId = req.user.id;

      const qrCode = await prisma.qRCode.findUnique({
        where: { id }
      });

      if (!qrCode || qrCode.userId !== userId) {
        return res.status(403).json({ error: 'Unauthorized' });
      }

      const dateFilter = {};
      if (startDate) {
        dateFilter.gte = new Date(startDate);
      }
      if (endDate) {
        dateFilter.lte = new Date(endDate);
      }

      // Get total scans
      const totalScans = await prisma.event.count({
        where: {
          qrCodeId: id,
          ...(Object.keys(dateFilter).length && { timestamp: dateFilter })
        }
      });

      // Get unique users (by IP)
      const uniqueUsers = await prisma.event.groupBy({
        by: ['ipAddress'],
        where: {
          qrCodeId: id,
          ...(Object.keys(dateFilter).length && { timestamp: dateFilter })
        }
      });

      // Get device distribution
      const deviceAnalytics = await prisma.event.groupBy({
        by: ['device'],
        where: {
          qrCodeId: id,
          ...(Object.keys(dateFilter).length && { timestamp: dateFilter })
        },
        _count: true
      });

      // Get geographic distribution
      const geoAnalytics = await prisma.event.groupBy({
        by: ['location'],
        where: {
          qrCodeId: id,
          ...(Object.keys(dateFilter).length && { timestamp: dateFilter })
        },
        _count: true
      });

      // Get daily scan trends
      const dailyScans = await prisma.$queryRaw`
        SELECT DATE(timestamp) as date, COUNT(*) as count
        FROM Event
        WHERE qrCodeId = ${id}
        GROUP BY DATE(timestamp)
        ORDER BY date
      `;

      res.json({
        totalScans,
        uniqueUsers: uniqueUsers.length,
        deviceDistribution: deviceAnalytics,
        geographicDistribution: geoAnalytics,
        dailyTrends: dailyScans
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = AnalyticsController;