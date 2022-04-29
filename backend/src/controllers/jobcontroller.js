const mongoose = require("mongoose");
const Job = require("../models/job");
const validator = require("validator");

// @desc     Create a new job
// @route   /jobs/create
const createJob = async (req, res) => {
  try {
    if (!validator.isURL(req.body.joblink)) {
      throw new Error("Please Provide Valid Job Apply Link");
    }
    const addjob = new Job({
      ...req.body,
      logo: req.file.path,
      owner: req.user._id,
    });
    await addjob.save();
    res.status(201).send(addjob);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

// @desc     View all job
// @route   /jobs
const viewjobs = async (req, res) => {
  try {
    const { skip, limit, sort } = req.query;
    if (Object.keys(req.body).length !== 0) {
      const count = await Job.aggregate([
        {
          $match: { category: { $in: [...req.body] } },
        },
        {
          $count: "count",
        },
      ]);
      const jobs = await Job.aggregate([
        {
          $match: { category: { $in: [...req.body] } },
        },
        { $sort: { _id: parseInt(sort) } },
        { $skip: parseInt(skip) },
        { $limit: parseInt(limit) },
      ]);

      return res.status(201).send({ jobs, count });
    }
    const count = await Job.find().count();
    const jobs = await Job.find()
      .limit(parseInt(req.query.limit))
      .skip(parseInt(req.query.skip))
      .sort({ _id: parseInt(req.query.sort) });

    res.status(201).send({ jobs, count });
  } catch (e) {
    res.status(500).send({ error: e.toString() });
  }
};

module.exports = { createJob, viewjobs };
