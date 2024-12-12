const { Prisma } = require("@prisma/client");
const {
    generateQRCode,
    updateQRCode,
    trackEvent,
    getEvents,
  } = require("../services/qrServices");
const { prismaClient } = require("../config/db");

  
  const createStaticQRCode = async (req, res, next) => {
    try {
      const { url, metadata } = req.body;
      const qrCode = await generateQRCode(url, metadata, "STATIC", req.user.id);
      res.status(201).json(qrCode);
    } catch (err) {
      next(err);
    }
  };
  
  const createDynamicQRCode = async (req, res, next) => {
    try {
      const { url, metadata } = req.body;
      const qrCode = await generateQRCode(url, metadata, "DYNAMIC", req.user.id);
      res.status(201).json(qrCode);
    } catch (err) {
      next(err);
    }
  };
  
  const updateDynamicQRCode = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { url } = req.body;
  
      if (!url || !url.startsWith("http")) {
        return res.status(400).json({ message: "Invalid URL." });
      }
  
      const result = await updateQRCode(id, url, req.user.id);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };
  
  const trackQRCodeEvent = async (req, res, next) => {
    try {
      const { id } = req.params;
      const eventData = req.body;
      await trackEvent(id, eventData);
      res.status(200).json({ message: "Event tracked successfully." });
    } catch (err) {
      next(err);
    }
  };
  
  const getQRCodeEvents = async (req, res, next) => {
    try {
      const { id } = req.params;
      const events = await getEvents(id, req.user.id);
      res.status(200).json(events);
    } catch (err) {
      next(err);
    }
  };

  // const getQRCodeById = async (req,res,next) => {
  //   try {
  //     const { id} = req.params;
  //     const qrId = await prismaClient.qRcode.findUnique({where : {id:parseInt(id)}})
  //     return res.status(200).send(qrId)
  //   }catch(e){
  //     next(e);
  //   }
  // }
  
  module.exports = {
    createStaticQRCode,
    createDynamicQRCode,
    updateDynamicQRCode,
    trackQRCodeEvent,
    getQRCodeEvents
    // getQRCodeById
  };
  