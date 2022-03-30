const Contents = require("../models/contentSchema");
const cloudinary = require("cloudinary").v2;

// cloudinary config

cloudinary.config({
  cloud_name: "https-theoutreachmedia-com",
  api_key: "464252331218129",
  api_secret: "1l5chyx64ZfGE76Zth2MvpEUg30",
  secure: true,
});
// CLOUDINARY_URL=cloudinary://464252331218129:1l5chyx64ZfGE76Zth2MvpEUg30@https-theoutreachmedia-com

exports.getAllContent = async (req, res) => {
  try {
    const contents = await Contents.find();
    res.status(200).json({
      status: "Success",
      Total: contents.length,
      contents,
    });
  } catch (err) {
    res.status(400).json({
      status: "Error",
      err: err.message,
    });
  }
};

exports.getContentById = async (req, res) => {
  try {
    const content = await Contents.findById(req.params.id);
    res.status(200).json({
      status: "Success",
      content,
    });
  } catch (err) {
    res.status(400).json({
      status: "Error",
      err: err.message,
    });
  }
};

exports.createContent = async (req, res) => {
  try {
    const notes = req.body.notes;
    const title = req.body.title;
    const tags = req.body.tags;
    let tempPhoto = req.files.photo;
    // let photo;

    await cloudinary.uploader.upload(
      tempPhoto.tempFilePath,
      function (error, result) {
        // console.log(result.url, error);
        tempPhoto = result.url;
      }
    );
    const newContent = new Contents({
      // firstName,
      // lastName,
      title,
      tags,
      notes,
      photo: tempPhoto,
    });
    // console.log("Photooooooo", tempPhoto);
    const content = await newContent.save();
    res.status(201).json({
      status: "Success",
      message: "Content successfully added to DB",
      content,
    });
  } catch (err) {
    res.status(400).json({
      status: "Error",
      err: err.message,
    });
  }
};

exports.updateContent = async (req, res) => {
  try {
    const content = await Contents.findById(req.params.id);

    if (!content) return res.status(404).json({ Error: "Contact not found" });

    await content.update(req.body, {
      new: true,
    });

    res.status(200).json({
      msg: "Contact updated successfully",
    });
  } catch (err) {
    res.status(400).json({
      status: "Error",
      err: err.message,
    });
  }
};

exports.deleteContent = async (req, res) => {
  try {
    const content = await Contents.findById(req.params.id);

    if (!content) return res.status(404).json({ msg: "Post Not Found" });
    await content.remove();
    res.json({
      msg: "Contact successfully deleted ",
      id: req.params.id,
    });
  } catch (err) {
    res.status(400).json({
      status: "Error",
      err: err.message,
    });
  }
};

exports.approveContent = async (req, res) => {
  try {
    const content = await Contents.findById(req.params.id);

    if (!content) return res.status(404).json({ msg: "Post Not Found" });
    await content.remove();
    res.json({
      msg: "Contact successfully deleted ",
      id: req.params.id,
    });
  } catch (err) {
    res.status(400).json({
      status: "Error",
      err: err.message,
    });
  }
};
