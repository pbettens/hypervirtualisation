const markdownIt = require("markdown-it");

module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("assets");   
    eleventyConfig.addGlobalData("layout", "base");

    let markdownLib = markdownIt({
        html: true,
        linkify: true,
        typographer: true,
    }).use(function (md) {
        md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
            const hrefIndex = tokens[idx].attrIndex("href");
            if (hrefIndex >= 0) {
                const href = tokens[idx].attrs[hrefIndex][1];
                if (href.endsWith(".md")) {
                    tokens[idx].attrs[hrefIndex][1] = href.replace(".md", "/");
                }
            }
            return self.renderToken(tokens, idx, options);
        };
    });
    eleventyConfig.setLibrary("md", markdownLib);
    
    return {
        dir: {
            input: "src",
            output: "_site",
        },
    };
};
