import Choice from "./Choice"; // Adjust the path as necessary

class Variant {
  constructor(isRequired, allowMultiple, type, choices) {
    this.isRequired = isRequired;
    this.allowMultiple = allowMultiple;
    this.type = type;
    
    if (!Array.isArray(choices) || !choices.every(c => c instanceof Choice)) {
      throw new Error("choices must be an array of Choice instances");
    }
    this.choices = choices;
  }
}

export default Variant;
