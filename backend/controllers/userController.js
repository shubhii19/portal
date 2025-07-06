// // import { User } from "../models/userModel.js";
// // import bcrypt from "bcrypt";
// // import jwt from "jsonwebtoken";
// // import getDataUri from "../utils/datauri.js";
// // import cloudinary from "../utils/cloudinary.js";

// // export const registerController = async (req, res) => {
// //   try {
// //     const { fullname, email, phoneNumber, password, role } = req.body;

// //     if (!fullname || !email || !phoneNumber || !password || !role) {
// //       return res.status(400).json({
// //         message: "All fields are required",
// //         success: false,
// //       });
// //     }

// //     const existingUser = await User.findOne({ email });
// //     if (existingUser) {
// //       return res.status(400).json({
// //         message: "User already exists",
// //         success: false,
// //       });
// //     }

// //     let profilePhotoUrl = "";
// //     let resumeUrl = "";
// //     let resumeOriginalName = "";

// //     // Profile Photo Upload
// //     if (req.files?.profilePhoto?.[0]) {
// //       const file = req.files.profilePhoto[0];
// //       const fileUri = getDataUri(file);
// //       const uploadResponse = await cloudinary.uploader.upload(fileUri.content, {
// //         resource_type: "image",
// //         folder: "profiles",
// //       });
// //       profilePhotoUrl = uploadResponse.secure_url;
// //     }

// //     // Resume Upload (PDF)
// //     if (req.files?.resume?.[0]) {
// //       const file = req.files.resume[0];
// //       const fileUri = getDataUri(file);
// //    const uploadResponse = await cloudinary.uploader.upload(fileUri.content, {
// //   resource_type: "raw",  // Use "raw" for PDFs and other non-images
// //   folder: "resumes",
// //   use_filename: true,
// //   unique_filename: false,
// // });

// //       resumeUrl = uploadResponse.secure_url;
// //       resumeOriginalName = file.originalname;
// //     }

// //     const hashedPassword = await bcrypt.hash(password, 10);

// //     await User.create({
// //       fullname,
// //       email,
// //       phoneNumber,
// //       password: hashedPassword,
// //       role,
// //       profile: {
// //         profilePhoto: profilePhotoUrl,
// //         resume: resumeUrl,
// //         resumeOriginalName,
// //       },
// //     });

// //     res.status(201).json({
// //       message: "Account created successfully",
// //       success: true,
// //     });
// //   } catch (error) {
// //     console.log("Register Error:", error);
// //     res.status(500).json({
// //       message: "Something went wrong",
// //       success: false,
// //     });
// //   }
// // };

// // export const registerController = async (req, res) => {
// //   try {
// //     const { fullname, email, phoneNumber, password, role } = req.body;
// //     console.log(req.body);
// //     // console.log(fullname, email, phoneNumber, password, role);

// //     if (!fullname || !email || !phoneNumber || !password || !role) {
// //       return res.status(400).json({
// //         message: "Something is missing",
// //         success: false,
// //       });
// //     }
// //     const file = req.file;
// //     console.log(file);
// //     const fileUri = getDataUri(file);
// //     const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
// //     console.log(cloudResponse);
// //     const user = await User.findOne({ email });
// //     if (user) {
// //       return res.status(400).json({
// //         message: "User already exist with this email",
// //         success: false,
// //       });
// //     }
// //     const hashedPassword = await bcrypt.hash(password, 10);
// //     await User.create({
// //       fullname,
// //       email,
// //       phoneNumber,
// //       password: hashedPassword,
// //       role,
// //       profile: {
// //         profilePhoto: cloudResponse.secure_url,
// //       },
// //     });
// //     return res.status(201).json({
// //       message: "Account created successfully",
// //       success: true,
// //     });
// //   } catch (error) {
// //     console.log(error);
// //   }
// // };

// import { User } from "../models/userModel.js";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import getDataUri from "../utils/datauri.js";
// import imagekit from "../utils/imagekit.js"; // ✅ Use imagekit now

// // ----------------- REGISTER CONTROLLER -----------------
// export const registerController = async (req, res) => {
//   try {
//     const { fullname, email, phoneNumber, password, role } = req.body;

//     if (!fullname || !email || !phoneNumber || !password || !role) {
//       return res.status(400).json({
//         message: "All fields are required",
//         success: false,
//       });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({
//         message: "User already exists",
//         success: false,
//       });
//     }

//     let profilePhotoUrl = "";
//     let resumeUrl = "";
//     let resumeOriginalName = "";

//     // Upload profile photo to ImageKit
//     if (req.files?.profilePhoto?.[0]) {
//       const file = req.files.profilePhoto[0];
//       const fileUri = getDataUri(file);

//       const uploadResponse = await imagekit.upload({
//         file: fileUri.content,
//         fileName: file.originalname,
//         folder: "profiles",
//       });

//       profilePhotoUrl = uploadResponse.url;
//     }

//     // Upload resume (PDF) to ImageKit
//     if (req.files?.resume?.[0]) {
//       const file = req.files.resume[0];
//       const fileUri = getDataUri(file);

//       const uploadResponse = await imagekit.upload({
//         file: fileUri.content,
//         fileName: file.originalname,
//         folder: "resumes",
//       });

//       resumeUrl = uploadResponse.url;
//       resumeOriginalName = file.originalname;
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     await User.create({
//       fullname,
//       email,
//       phoneNumber,
//       password: hashedPassword,
//       role,
//       profile: {
//         profilePhoto: profilePhotoUrl,
//         resume: resumeUrl,
//         resumeOriginalName,
//       },
//     });

//     res.status(201).json({
//       message: "Account created successfully",
//       success: true,
//     });
//   } catch (error) {
//     console.log("Register Error:", error);
//     res.status(500).json({
//       message: "Something went wrong",
//       success: false,
//     });
//   }
// };

// export const loginController = async (req, res) => {
//   try {
//     const { email, password, role } = req.body;
//     if (!email || !password || !role) {
//       return res.status(400).json({
//         message: "Something is missing",
//         success: false,
//       });
//     }
//     let user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({
//         message: "Invalid email or password.",
//         success: false,
//       });
//     }
//     const isPasswordMatch = await bcrypt.compare(password, user.password);
//     if (!isPasswordMatch) {
//       return res.status(400).json({
//         message: "Invalid email or password.",
//         success: false,
//       });
//     }
//     //check role is correct or not
//     if (role != user.role) {
//       return res.status(400).json({
//         message: "Account doesn't exist with current role.",
//         success: false,
//       });
//     }

//     const tokenData = {
//       userId: user._id,
//     };
//     const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
//       expiresIn: "1d",
//     });

//     user = {
//       _id: user._id,
//       fullname: user.fullname,
//       email: user.email,
//       phoneNumber: user.phoneNumber,
//       role: user.role,
//       profile: user.profile,
//     };

//     return res
//       .status(200)
//       .cookie("token", token, {
//         maxAge: 1 * 24 * 60 * 60 * 1000,
//         httpsOnly: true,
//         sameSite: "strict",
//       })
//       .json({
//         message: `Welcome back ${user.fullname}`,
//         user,
//         success: true,
//       });
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const logoutController = async (req, res) => {
//   try {
//     return res.status(200).cookie("token", "", { maxAge: 0 }).json({
//       message: "Logged out successfully",
//       success: true,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// // export const updateProfileController = async (req, res) => {
// //   try {
// //     const { fullname, email, phoneNumber, bio, skills } = req.body;
// //     console.log(fullname, email, phoneNumber, bio, skills);
// //     const file = req.file;

// //     let cloudResponse;
// //     let fileUri;
// //     if (file) {
// //       fileUri = getDataUri(file);
// //       // cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
// //       //   resource_type: "raw",
// //       // });
// //       cloudResponse = await cloudinary.uploader.upload(fileUri.content);
// //     }

// //     console.log("Cloudinary Upload Response: ", cloudResponse);

// //     // const fileUri = getDataUri(file);
// //     // const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

// //     console.log("Body h ye :", req.body); // Debug ke liye
// //     console.log("File h ye : ", file);
// //     let skillsArray;
// //     if (skills) {
// //       skillsArray = skills.split(",");
// //     }
// //     // if (file) {
// //     //   user.profile.resume = file.filename; // or file.path depending on how you're storing it
// //     // }
// //     const userID = req.id; //middleware authentication
// //     let user = await User.findById(userID);

// //     if (!user) {
// //       return res.status(400).json({
// //         message: "User not found.",
// //         success: false,
// //       });
// //     }
// //     // updating data
// //     if (fullname) user.fullname = fullname;
// //     if (email) user.email = email;
// //     if (phoneNumber) user.phoneNumber = phoneNumber;
// //     if (bio) user.profile.bio = bio;
// //     if (skills) user.profile.skills = skillsArray;
// //     // if (file) user.profile.resume = file.originalname;
// //     if (cloudResponse) {
// //       user.profile.resume = cloudResponse.secure_url;
// //       user.profile.resumeOriginalName = file.originalname;
// //     }
// //     console.log("CloudResponse: ", cloudResponse);
// //     await user.save();

// //     user = {
// //       _id: user._id,
// //       fullname: user.fullname,
// //       email: user.email,
// //       phoneNumber: user.phoneNumber,
// //       role: user.role,
// //       profile: user.profile,
// //     };

// //     return res.status(200).json({
// //       message: "Profile updated successfully",
// //       user,
// //       success: true,
// //     });
// //   } catch (error) {
// //     console.log(error);
// //   }
// // };

// // export const updateProfileController = async (req, res) => {
// //   try {
// //     const { fullname, email, phoneNumber, bio, skills } = req.body;
// //     const file = req.file; // or req.files?.resume[0], depending on your multer config

// //     let cloudResponse;
// //     if (file) {
// //       const fileUri = getDataUri(file);
// //       cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
// //         resource_type: "raw", // IMPORTANT for PDF resumes
// //         folder: "resumes",
// //         use_filename: true,
// //         unique_filename: false,
// //         flags: "attachment:false",
// //       });
// //     }

// //     let skillsArray = [];
// //     if (skills) {
// //       skillsArray = skills.split(",").map((skill) => skill.trim());
// //     }

// //     const userID = req.id; // from authentication middleware
// //     let user = await User.findById(userID);

// //     if (!user) {
// //       return res.status(400).json({
// //         message: "User not found.",
// //         success: false,
// //       });
// //     }

// //     if (fullname) user.fullname = fullname;
// //     if (email) user.email = email;
// //     if (phoneNumber) user.phoneNumber = phoneNumber;
// //     if (bio) user.profile.bio = bio;
// //     if (skills) user.profile.skills = skillsArray;
// //     if (cloudResponse) {
// //       user.profile.resume = cloudResponse.secure_url;
// //       user.profile.resumeOriginalName = file.originalname;
// //     }

// //     await user.save();

// //     user = {
// //       _id: user._id,
// //       fullname: user.fullname,
// //       email: user.email,
// //       phoneNumber: user.phoneNumber,
// //       role: user.role,
// //       profile: user.profile,
// //     };

// //     return res.status(200).json({
// //       message: "Profile updated successfully",
// //       user,
// //       success: true,
// //     });
// //   } catch (error) {
// //     console.error("UpdateProfile Error:", error);
// //     return res.status(500).json({
// //       message: "Internal server error",
// //       success: false,
// //     });
// //   }
// // };
// //

// export const updateProfileController = async (req, res) => {
//   try {
//     const { fullname, email, phoneNumber, bio, skills } = req.body;
//     const file = req.file;

//     let uploadResponse;
//     if (file) {
//       const fileUri = getDataUri(file);
//       uploadResponse = await imagekit.upload({
//         file: fileUri.content,
//         fileName: file.originalname,
//         folder: "resumes",
//       });
//     }

//     let skillsArray = [];
//     if (skills) {
//       skillsArray = skills.split(",").map(skill => skill.trim());
//     }

//     const userID = req.id; // from auth middleware
//     let user = await User.findById(userID);

//     if (!user) {
//       return res.status(400).json({
//         message: "User not found.",
//         success: false,
//       });
//     }

//     if (fullname) user.fullname = fullname;
//     if (email) user.email = email;
//     if (phoneNumber) user.phoneNumber = phoneNumber;
//     if (bio) user.profile.bio = bio;
//     if (skills) user.profile.skills = skillsArray;
//     if (uploadResponse) {
//       user.profile.resume = uploadResponse.url;
//       user.profile.resumeOriginalName = file.originalname;
//     }

//     await user.save();

//     return res.status(200).json({
//       message: "Profile updated successfully",
//       user: {
//         _id: user._id,
//         fullname: user.fullname,
//         email: user.email,
//         phoneNumber: user.phoneNumber,
//         role: user.role,
//         profile: user.profile,
//       },
//       success: true,
//     });
//   } catch (error) {
//     console.error("UpdateProfile Error:", error);
//     res.status(500).json({
//       message: "Internal server error",
//       success: false,
//     });
//   }
// };

// --------------------------------------
// import { User } from "../models/userModel.js";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import getDataUri from "../utils/datauri.js";
// import imagekit from "../utils/imagekit.js";

// // REGISTER CONTROLLER
// export const registerController = async (req, res) => {
//   try {
//     const { fullname, email, phoneNumber, password, role } = req.body;

//     if (!fullname || !email || !phoneNumber || !password || !role) {
//       return res.status(400).json({
//         message: "All fields are required",
//         success: false,
//       });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({
//         message: "User already exists",
//         success: false,
//       });
//     }

//     let profilePhotoUrl = "";
//     let resumeUrl = "";
//     let resumeOriginalName = "";

//     // Upload profile photo
//     if (req.files?.profilePhoto?.[0]) {
//       const file = req.files.profilePhoto[0];
//       const fileUri = getDataUri(file);

//       const uploadResponse = await imagekit.upload({
//         file: fileUri.content,
//         fileName: file.originalname,
//         folder: "profiles",
//       });

//       profilePhotoUrl = uploadResponse.url;
//     }

//     // Upload resume (PDF)
//     if (req.files?.resume?.[0]) {
//       const file = req.files.resume[0];
//       const fileUri = getDataUri(file);

//       const uploadResponse = await imagekit.upload({
//         file: fileUri.content,
//         fileName: file.originalname,
//         folder: "resumes",
//       });

//       resumeUrl = uploadResponse.url;
//       resumeOriginalName = file.originalname;
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     await User.create({
//       fullname,
//       email,
//       phoneNumber,
//       password: hashedPassword,
//       role,
//       profile: {
//         profilePhoto: profilePhotoUrl,
//         resume: resumeUrl,
//         resumeOriginalName,
//       },
//     });

//     res.status(201).json({
//       message: "Account created successfully",
//       success: true,
//     });
//   } catch (error) {
//     console.log("Register Error:", error);
//     res.status(500).json({
//       message: "Something went wrong",
//       success: false,
//     });
//   }
// };

// // LOGIN CONTROLLER
// export const loginController = async (req, res) => {
//   try {
//     const { email, password, role } = req.body;
//     if (!email || !password || !role) {
//       return res.status(400).json({
//         message: "Something is missing",
//         success: false,
//       });
//     }
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({
//         message: "Invalid email or password.",
//         success: false,
//       });
//     }
//     const isPasswordMatch = await bcrypt.compare(password, user.password);
//     if (!isPasswordMatch) {
//       return res.status(400).json({
//         message: "Invalid email or password.",
//         success: false,
//       });
//     }
//     if (role !== user.role) {
//       return res.status(400).json({
//         message: "Account doesn't exist with current role.",
//         success: false,
//       });
//     }

//     const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
//       expiresIn: "1d",
//     });

//     return res
//       .status(200)
//       .cookie("token", token, {
//         maxAge: 24 * 60 * 60 * 1000,
//         httpOnly: true,
//         sameSite: "strict",
//       })
//       .json({
//         message: `Welcome back ${user.fullname}`,
//         user: {
//           _id: user._id,
//           fullname: user.fullname,
//           email: user.email,
//           phoneNumber: user.phoneNumber,
//           role: user.role,
//           profile: user.profile,
//         },
//         success: true,
//       });
//   } catch (error) {
//     console.log("Login Error:", error);
//     res.status(500).json({
//       message: "Internal server error",
//       success: false,
//     });
//   }
// };

// // LOGOUT CONTROLLER
// export const logoutController = async (req, res) => {
//   try {
//     return res.status(200).cookie("token", "", { maxAge: 0 }).json({
//       message: "Logged out successfully",
//       success: true,
//     });
//   } catch (error) {
//     console.log("Logout Error:", error);
//     res.status(500).json({
//       message: "Internal server error",
//       success: false,
//     });
//   }
// };

// // UPDATE PROFILE CONTROLLER
// export const updateProfileController = async (req, res) => {
//   try {
//     const { fullname, email, phoneNumber, bio, skills } = req.body;
//     const file = req.file;

//     let uploadResponse;
//     if (file) {
//       const fileUri = getDataUri(file);
//       uploadResponse = await imagekit.upload({
//         file: fileUri.content,
//         fileName: file.originalname,
//         folder: "resumes",
//       });
//     }

//     let skillsArray = [];
//     if (skills) {
//       skillsArray = skills.split(",").map(skill => skill.trim());
//     }

//     const userID = req.id; // from auth middleware
//     const user = await User.findById(userID);

//     if (!user) {
//       return res.status(400).json({
//         message: "User not found.",
//         success: false,
//       });
//     }

//     if (fullname) user.fullname = fullname;
//     if (email) user.email = email;
//     if (phoneNumber) user.phoneNumber = phoneNumber;
//     if (bio) user.profile.bio = bio;
//     if (skills) user.profile.skills = skillsArray;
//     if (uploadResponse) {
//       user.profile.resume = uploadResponse.url;
//       user.profile.resumeOriginalName = file.originalname;
//     }

//     await user.save();

//     return res.status(200).json({
//       message: "Profile updated successfully",
//       user: {
//         _id: user._id,
//         fullname: user.fullname,
//         email: user.email,
//         phoneNumber: user.phoneNumber,
//         role: user.role,
//         profile: user.profile,
//       },
//       success: true,
//     });
//   } catch (error) {
//     console.error("UpdateProfile Error:", error);
//     res.status(500).json({
//       message: "Internal server error",
//       success: false,
//     });
//   }
// };

// -----------------------github---------------

import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const registerController = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;

    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    const file = req.file;
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exist with this email.",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: cloudResponse.secure_url,
      },
    });

    return res.status(201).json({
      message: "Account created successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const loginController = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }
    // check role is correct or not
    if (role !== user.role) {
      return res.status(400).json({
        message: "Account doesn't exist with current role.",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true, // ✅ correct spelling
        secure: true, // ✅ required on Render (uses HTTPS)
        sameSite: "None", // ✅ allows cross-origin
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};
export const logoutController = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const updateProfileController = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;

    const file = req.file;
    // cloudinary ayega idhar
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }
    const userId = req.id; // middleware authentication
    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "User not found.",
        success: false,
      });
    }
    // updating data
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;

    // resume comes later here...
    if (cloudResponse) {
      user.profile.resume = cloudResponse.secure_url; // save the cloudinary url
      user.profile.resumeOriginalName = file.originalname; // Save the original file name
    }

    await user.save();

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile updated successfully.",
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
