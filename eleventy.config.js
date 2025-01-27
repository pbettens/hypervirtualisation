module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("assets");   
    eleventyConfig.addGlobalData("layout", "base");
    
    return {
        dir: {
            input: "src",
            output: "_site",
        },
    };
};
