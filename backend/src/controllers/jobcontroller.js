const mongoose = require("mongoose");
const Job = require("../models/job");
const validator = require("validator");

// @desc   Create a new job
// @route   /jobs/create
const createJob = async (req, res) => {
  try {
    if (!validator.isURL(req.body.joblink)) {
      throw new Error("Please Provide Valid Job Apply Link");
    }
    const files = req.file?.path;
    if (!files) {
      throw new Error("Please Provide Image");
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
      const c = await Job.aggregate([
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

      return res.status(201).send({ jobs, count: c[0].count });
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

// @desc    myjobs
// @route   /jobs/myjobs

const getmyjobs = async (req, res) => {
  try {
    const count = await Job.find({ owner: req.user._id }).count();
    const jobs = await Job.find({ owner: req.user._id })
      .limit(parseInt(req.query.limit))
      .skip(parseInt(req.query.skip))
      .sort({ _id: parseInt(req.query.sort) });
    if (jobs.length === 0) throw new Error("No Job Found");
    res.send({ jobs, count });
  } catch (e) {
    res.send({ error: e.message });
  }
};

// @desc    update job
// @route   /jobs/update/:id
const updateJob = async (req, res) => {
  try {
    const filter = { _id: req.params.id };
    const img = req.file?.path;
    let update = {};
    if (img) {
      update = {
        ...req.body,
        logo: img,
      };
    } else {
      update = { ...req.body };
    }

    const job = await Job.findByIdAndUpdate(filter, update, { new: true });

    res.status(200).send(job);
  } catch (e) {
    res.status(400).send({ error: e.toString() });
  }
};

// @desc    delete job
// @route  /job/delete/:id
const deleteJob = async (req, res) => {
  const job = await Job.findById(req.params.id);
  try {
    if (job) {
      await job.remove();
      res.status(200).send();
    } else {
      throw new Error("JOB not found");
    }
  } catch (e) {
    res.send({ error: e.message });
  }
};
module.exports = { createJob, viewjobs, getmyjobs, updateJob, deleteJob };
