
function avatarUpload(req, res, next){
     const upload = uploader(
          "avatars",
          ["image/jpeg","image/jpg","image/png"],
          10000000,
          "Only .jpg, jpeg, png format allowed"
     );
}

module.exports = avatarUpload;