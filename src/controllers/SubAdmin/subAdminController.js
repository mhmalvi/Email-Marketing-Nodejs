const User = require("../../../models").User;
const { fieldsValidation } = require("../../../config/utils");
const AppPassword = require("../../../models").AppPassword;
const {
  transporter,
} = require("../../common/transporterUtils/customTransporter");
const {
  createSubAdminUtils,
} = require("../../common/users/subadmin/createSubadmin");
const createSubAdmin = async (req, res) => {
  const { userID, email, userName } = req.body;
  const requiredFields = {
    userID,
    email,
    userName,
  };
  const missingFields = await fieldsValidation(requiredFields); ///// validation
  if (missingFields.length > 0) {
    res.status(422).json({
      message: `Missing fields are ${missingFields.join(", ")}`,
      status: 422,
    });
  } else {
    // try {
    const userExist = await User.findOne({ where: { email: email } });
    const sender = await AppPassword.findOne({
      where: { user_id: userID },
    }); ////////// get app password
    if (userExist) {
      console.log("enter", userExist);
      const pid = userExist.pid;
      if (pid.includes(userID)) {
        res.status(422).json({
          message: "Sub admin already exists",
          status: 422,
        });
      } else {
        const templatePath = path.join(__dirname, "../../views/hbs/mail.hbs");
        var templateSource = fs.readFileSync(templatePath, "utf8");
        const finalTemplate = handlebars.compile(templateSource);
        const htmlToSend = finalTemplate(userID);
        let transporterResponse = await transporter(sender); ////////// transport
        const mailOptions = {
          from: `${sender.email}`,
          to: email, // list of receivers
          subject: "Invitation", // Subject line
          html: htmlToSend,
        };
        // const result = await createSubAdminUtils(req.body); //////////////// create subadmin
        // res.json({ false: false });
      }
      // res.json(userExist.pid);
    }
    // const result = await createSubAdminUtils(req.body); //////////////// create subadmin
    // if (result) {
    //   res.status(201).json({
    //     message: "created",
    //     status: 201,
    //     subadmin: result,
    //   });
    // }
    // } catch (error) {
    //   res.json({
    //     message: "failed",
    //     error: error,
    //   });
    // }
  }
};
module.exports = { createSubAdmin };
