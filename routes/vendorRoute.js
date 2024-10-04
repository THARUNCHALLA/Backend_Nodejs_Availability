const express = require("express");
const path = require('path');
const router = express.Router();
const { vendorRegistrations,vendorLogin,getvenderList,singlevender } = require("../controller/vendorcontroller");

router.post("/register", vendorRegistrations); 
router.post("/login",vendorLogin)
router.get("/all-vender",getvenderList)

router.get("/single/:id",singlevender)



module.exports = router;


{/*If you remove ".." from path.join(__dirname, "..", "uploads", imageName), the code will no longer move up to the parent directory, and the uploads folder will be assumed to be inside the current directory where the JavaScript file resides.

Here’s what would happen in both cases:

With "..":
javascript
Copy code
const imagePath = path.join(__dirname, "..", "uploads", imageName);
__dirname points to the directory where the current file is located (e.g., /home/user/project/routes).
The .. makes the path go up one level to the parent directory (e.g., /home/user/project).
"uploads" then targets the uploads directory located in /home/user/project/uploads.
The final path would be /home/user/project/uploads/sample.jpg.
Without "..":
javascript
Copy code
const imagePath = path.join(__dirname, "uploads", imageName);
__dirname still points to the current file’s directory (e.g., /home/user/project/routes).
Since there is no "..", the uploads directory will be searched for inside the same directory as the current file (e.g., /home/user/project/routes/uploads).
The final path would be /home/user/project/routes/uploads/sample.jpg.
Impact:
If the uploads directory is at the same level as the directory where your JavaScript file is located, removing .. would work fine.
If the uploads folder is in the parent directory (as it seems to be in your case), removing .. would break the path, and you would get an error because Node.js would try to look for the uploads folder in the wrong place.
In summary, removing .. makes the path relative to the current directory instead of the parent directory. You should keep it if your uploads folder is located outside the current directory.*/}