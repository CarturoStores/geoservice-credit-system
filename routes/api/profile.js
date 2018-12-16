const express = require("express");
const router = express.Router();
const passport = require("passport");
const Profile = require("../../models").Profile;
const User = require("../../models").User;

//Validation filed
const validateProfileInput = require("../../validation/profile");
const validateVisitedInput = require("../../validation/visited");
const validateAppointmentListInput = require("../../validation/appointmentlist");

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Profile Routes Works" }));

// @route   GET api/profile
// @desc    Gets current users profile
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    errors = {};

    Profile.findOne({
      where: { userId: req.user.id }
    })
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   POST api/profile
// @desc    Creates current users profile
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // Get fields
    const profileFields = {};
    profileFields.userId = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;

    // Social
    profileFields.social = {};
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
    console.log(JSON.stringify(profileFields));

    Profile.findOne({ where: { userId: req.user.id }}).then(profile => {
      if (profile) {
        // Update Profile if one exists
        Profile.findOrCreate({where: { userId: req.user.id }, 
          defaults: Obbject.assign(req.body, profileFields)})
          .then(profile => res.json(profile))
          .catch(err => console.log(err));
      } else {
        // Create Profile if one does not exist

        // Check if handle exists
        Profile.findOne({ where: { handle: profileFields.handle }})
          .then(profile => {
            if (profile) {
              errors.handle = "That handle already exists";
              res.status(400).json(errors);
            }
            // Save Profile if handle is open
            Profile.create(Object.assign(req.body, profileFields))
              .then(profile => res.json(profile))
              .catch(() => res.status(404).json({ err: 'Unexpected Error Ocurred'}));
          });
      }
    });
  }
);

// @route   GET api/profile/handle/:handle
// @desc    Get profile with handle
// @access  Public
router.get("/handle/:handle", (req, res) => {
  const errors = {};

  Profile.findOne({ where: { handle: req.params.handle }})
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for the specified user";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile with user_id
// @access  Public
router.get("/user/:user_id", (req, res) => {
  const errors = {};

  Profile.findOne({ where: { userId: req.params.user_id }})
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for the specified user";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({ profile: "There is no profile with this ID" })
    );
});

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public

router.get("/all", (req, res) => {
  const errors = {};
  Profile.findAll()
    .then(profiles => {
      if (!profiles) {
        errors.profiles = "There are no profiles";
        return res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch(err => res.status(404).json({ profile: "There are no profiles" }));
});

// @route   POST api/profile/visited
// @desc    Post new locations visited
// @access  Private

router.post(
  "/visited",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateVisitedInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors
      return res.status(400).json(errors);
    }

    Profile.findOne({ where: { userId: req.user.id }}).then(profile => {
      const newLocation = {
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        synopsis: req.body.synopsis
      };
      // Add to visited array
      profile.visited.unshift(newLocation);

      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route   POST api/profile/appointmentlist
// @desc    Post new locations that users would like to visit
// @access  Private
router.post(
  "/appointmentlist",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateAppointmentListInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    Profile.findOne({ where: { userId: req.user.id }}).then(profile => {
      const newLocation = {
        location: req.body.location,
        date: req.body.date,
        synopsis: req.body.synopsis
      };
      // Add to exp array
      profile.appointmentlist.unshift(newLocation);

      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route   DELETE api/profile/visited/:id
// @desc    Delete visited location from profile
// @access  Private

router.delete(
  "/visited/:visited_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ where: { userId: req.user.id }})
      .then(profile => {
        //remove index
        const removeVisitedItem = profile.visited
          .map(item => item.id)
          .indexOf(req.params.visited_id);

        //splice out of array
        profile.visited.splice(removeVisitedItem, 1);

        //save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   DELETE api/profile/appointmentlist
// @desc    Delete appointmentlist item from profile
// @access  Private
router.delete(
  "/appointmentlist/:appointmentlist_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ where: { user: req.user.id }})
      .then(profile => {
        //remove index
        const removeAppointmentListItem = profile.appointmentlist
          .map(item => item.id)
          .indexOf(req.params.appointmentlist_id);

        //splice out of array
        profile.appointmentlist.splice(removeAppointmentListItem, 1);

        //save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   DELETE api/profile/
// @desc    Delete user/profile
// @access  Private

router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ where: { userId: req.user.id }}).then(() => {
      User.findOneAndRemove({ where: { userId: req.user.id }}).then(() =>
        res.json({ success: true })
      );
    });
  }
);
module.exports = router;