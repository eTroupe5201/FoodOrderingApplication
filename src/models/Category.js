import { Timestamp } from "firebase/firestore";
import ImageType from "./Image"

class Category {
  constructor(id, createdate, lastupdate, createby, image, title, description) {
    this.id = id;
    this.createdate = typeof createdate === "string" ? Timestamp.fromDate(new Date(createdate)) : createdate;
    this.lastupdate = typeof lastupdate === "string" ? Timestamp.fromDate(new Date(lastupdate)) : lastupdate;
    this.createby = createby;

    if (image instanceof ImageType) {
      this.image = image;
    } else {
      throw new Error("image must be an instance of ImageType");
    }

    this.title = title;
    this.description = description;
  }
}

export default Category;