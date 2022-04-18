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
    const jobs = await Job.find();
    res.status(201).send(jobs);
  } catch (e) {
    res.status(500).send({ error: e.toString() });
  }
};

module.exports = { createJob, viewjobs };
