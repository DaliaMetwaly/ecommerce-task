/* eslint-disable radix */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
const mongoose = require('mongoose');
const coffeeStuffModel = require('../models/coffeeStuffModel');

exports.getCoffeeStuff = async (req, res, next) => {
  try {
    const {
      stuffType, productType, waterLineCompatible, flavor, packSize,
    } = req.query;
    let filterObj;
    const conditions = [];

    if (stuffType === 'machine') {
      conditions.push({ stuffType });
      if (waterLineCompatible) conditions.push({ waterLineCompatible: (waterLineCompatible === 'true') });
      if (productType) conditions.push({ 'productTypes.name': productType });
      filterObj = {
        $match: {
          $and: conditions,
        },
      };
    } else {
      conditions.push({ stuffType });
      if (flavor) conditions.push({ 'flavor.name': flavor });
      if (packSize) conditions.push({ 'packSize.name': packSize });
      if (productType) conditions.push({ 'productTypes.name': productType });
      filterObj = {
        $match: {
          $and: conditions,
        },
      };
    }

    const records = await coffeeStuffModel.aggregate([
      {
        $lookup: {
          from: 'producttypes',
          localField: 'productType',
          foreignField: '_id',
          as: 'productTypes',
        },
      },
      {
        $unwind: {
          path: '$productTypes',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'flavors',
          localField: 'flavor',
          foreignField: '_id',
          as: 'flavor',
        },
      },
      {
        $unwind: {
          path: '$flavor',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'packsizes',
          localField: 'packSize',
          foreignField: '_id',
          as: 'packSize',
        },
      },
      {
        $unwind: {
          path: '$packSize',
          preserveNullAndEmptyArrays: true,
        },
      },
      filterObj,
      {
        $project:
        {
          _id: 0,
          code: 1,
          productType: '$productTypes.name',
          productModel: 1,
          waterLineCompatible: 1,
          packSize: '$packSize.name',
          flavor: '$flavor.name',
        },
      },
    ]);

    return res.status(200).json({
      records,
      status: 'success',
    });
  } catch (error) {
    console.log(`error${error}`);
    next(error);
  }
};
