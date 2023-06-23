//v7 imports
import user from "./api/v1/controllers/user/routes";
import files from "./api/v1/controllers/UploadFIle/routes";
import property from "./api/v1/controllers/property/routes";
import  wishlist from "./api/v1/controllers/wishlist/routes";

/**
 *
 *
 * @export
 * @param {any} app
 */

export default function routes(app) {

  app.use('/api/v1/user', user);
  app.use('/api/v1/property', property);
  app.use('/api/v1/files', files);
  app.use('/api/v1/wishlist', wishlist);
  return app;
}
