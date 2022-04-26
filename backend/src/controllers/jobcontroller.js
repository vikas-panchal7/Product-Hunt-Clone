const mongoose = require("mongoose");
const Job = require("../models/job");

// @desc     Create a new job
// @route   /jobs/create
const createJob = async (req, res) => {
  console.log(req.body);
  const addjob = new Job({
    ...req.body,
    logo: req.file.path,
    owner: req.user._id,
  });
  try {
    await addjob.save();
    res.status(201).send(addjob);
  } catch (e) {
    res.status(500).send({ error: e.toString() });
  }
};

// @desc     View all job
// @route   /jobs
const viewjobs = async (req, res) => {
  try {
    const { skip, limit, sort } = req.query;
    if (Object.keys(req.body).length !== 0) {
      const jobs = await Job.aggregate([
        {
          $match: { category: { $in: [...req.body] } },
        },
        // { $skip: skip },
        // { $limit: limit },
      ]);
      return res.status(201).send({ jobs, count: jobs.length });
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
