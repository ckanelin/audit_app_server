const FuzzySet = require("fuzzyset.js");

class Matcher {
  // Takes in a list of fields to be matched and Map of key value pairs
  static match(fields, keyValuePairs) {
    const matchesMap = new Map();
    keyValuePairs.forEach((value, key, map) => {
      const fuzzyFields = FuzzySet(fields); //a = FuzzySet(['Michael Axiak']);
      const auditorFieldMatch = fuzzyFields.get(key); //a.get("micael asiak"); returns [[0.8461538461538461, 'Michael Axiak']]
      if (auditorFieldMatch) {
        const match = auditorFieldMatch[0][1];
        matchesMap.set(match, value);
        //TODO: For multiple matches do a if statement that checks if the map already has a key equal to 'match', if it does, add it to the corresponding value's list
      }
    });
    return matchesMap;
  }
}

module.exports = Matcher;
