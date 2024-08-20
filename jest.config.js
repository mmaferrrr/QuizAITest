module.exports = {
    transform: {
      "^.+\\.jsx?$": "babel-jest",  //convert modern Js and JSX so Jest can run them
    },
    moduleNameMapper: {
      "\\.(css|less|scss|sass)$": "identity-obj-proxy",  // Mock CSS imports
    },
    testEnvironment: "jsdom",  //simulate a browser for testing React components
    moduleFileExtensions: ["js", "jsx"],  // Recognize .js and .jsx files
  };
  