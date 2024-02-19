import { Timestamp } from "firebase/firestore";
import ImageType from "./ImageType"; 
import Variant from "./Variant"; 

class Item {
  constructor(id, createdate, lastupdate, createby, image, description, price, label, category, variants) {
    this.id = id;
    this.createdate = createdate instanceof Timestamp ? createdate : Timestamp.fromDate(new Date(createdate));
    this.lastupdate = lastupdate instanceof Timestamp ? lastupdate : Timestamp.fromDate(new Date(lastupdate));
    this.createby = createby;
    
    if (!(image instanceof ImageType)) {
      throw new Error("image must be an instance of ImageType");
    }
    this.image = image;

    this.description = description;
    this.price = price;
    this.label = label;
    this.category = category;

    if (!Array.isArray(variants) || !variants.every(v => v instanceof Variant)) {
      throw new Error("variants must be an array of Variant instances");
    }
    this.variants = variants;
  }
}

export default Item;
