import response from "../../../../../assets/response";

import commonFunction from "../../../../helper/util";

export class uploadFileController {
  /**
   * @swagger
   * /files/uploadFiles:
   *   post:
   *     tags:
   *       - UploadFile
   *     summary: Upload single or multiple file to get file url,
   *     description: UploadFile
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: file
   *         description: file
   *         in: formData
   *         type : file
   *         required: true
   *     responses:
   *       200:
   *         description: File uploadded successfully
   *       501:
   *         description: Something went wrong.
   *       500:
   *         description: Internal server error.
   */
  async uploadFiles(req, res, next) {
    try {
      console.log("------------", req.files);
      console.log("------------", req.files[0].path);
      const file = req.files[0].path;
      return res.json(
        new response(file, `Files has been uploaded successfully`)
      );

      // const fileUrl = await commonFunction.getImageUrl(file);
      // for (let i = 0; i < req.files.length; i++) {
      //     var file = req.file[i];
      //     var result = await commonFunction.getImageMultipleUrl(file.path);
      //     let obj = {
      //         fileName: String(req.files[i].filename).split('_')[String(req.files[i].filename).split('_').length - 1],
      //         url: result
      //     }
      //     finalresult.push(obj);
      // }
      // return res.json(new response(finalresult, `Files has been uploaded successfully`));
    } catch (error) {
      console.log("error ==========> file", error);
      return next(error);
    }
  }

  async uploadSingleFiles(req, res, next) {
    try {
        console.log("--------fiel log-----------------",req.files);
        var result = await commonFunction.getImageUrl( req.files[0].path);
        return res.json(new response(result, `Files has been uploaded successfully`));
    } catch (error) {
        console.log("error ==========> file", error)
        return next(error);
    }
}

  async uploadSingleFilesssssssss(req, res, next) {
    try {
      if (req.file) {
        console.log("------------>>>>>>>>>> clint file name", req.file[0].path);
        const CloudImg = commonFunction.getImageUrl(image);
        const uploaddedFIle = await res.json(
          new response(CloudImg, `Files has been uploaded successfully`)
        );
        console.log("Cloud uploded res---  : ", uploaddedFIle);
        return uploaddedFIle;
      }
    } catch (error) {
      console.log("error ==========> file", error);
      return next(error);
    }
  }

  // async uploadSingleFiles(req, res, next) {
  //     try {
  //         console.log("------------>>>>>>>>>>", req.files);
  //         // console.log("------------", req.files[0].path);
  //         // const file = req.files[0].path;
  //         const file = req.files;
  //         // const file = req.files.req.body;
  //         const uploaddedFIle =  res.json(new response(file, `Files has been uploaded successfully`));
  //         console.log("file uploded url  : ", uploaddedFIle.req.url);
  //         console.log("file uploded url  : ", uploaddedFIle.req.body);
  //         // console.log("file uploded url  : ", uploaddedFIle.url);
  //         return uploaddedFIle.req.body;
  //     } catch (error) {
  //         console.log("error ==========> file", error)
  //         return next(error);
  //     }
  // }
}
export default new uploadFileController();
