const markdownIt = require("markdown-it");
const markdownItContainer = require("markdown-it-container");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const markdownItFootnote = require("markdown-it-footnote");

module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("assets");   
    eleventyConfig.addGlobalData("layout", "base");
    eleventyConfig.addPlugin(pluginSyntaxHighlight);

    // Gestion des liens (conversion lien.md vers lien/index.html)
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
    }).use(markdownItFootnote);

    // Ajout de style particulier 
    // :::note est transformé en <div class="note"…
    const containerTypes = ["note", "warning", "tip"];
    const containerIcon = {
        "note": "link",
        "warning": "fire",
        "tip": "lightbulb"};
    containerTypes.forEach((type) => {
        markdownLib.use(markdownItContainer, type, {
            validate: function (params) {
                return params.trim().match(new RegExp(`^${type}(\\s+.*)?$`));
            },
            render: function (tokens, idx) {
                const m = tokens[idx].info.trim().match(new RegExp(`^${type}(\\s+(.*))?$`));
                const title = m && m[2] ? markdownLib.renderInline(m[2]) : null;

                if (tokens[idx].nesting === 1) {
                    // Début du conteneur
                    let html = `<div class="${type}">`;
                    if (title) {
                        html += `<h4><i class="fa-solid fa-${containerIcon[type]}"></i> ${title}</h4>`;
                    }
                    return html;
                } else {
                    // Fin du conteneur
                    return `</div>\n`;
                }
            },
        });
    });

    eleventyConfig.addTransform("fixImagePaths", function (content, outputPath) {
        if (outputPath && outputPath.endsWith(".html")) {
            return content.replace(/<img src="\/assets\/img\/(.*?)"/g, (match, filename) => {
                return `<img src="/hypervirtualisation/assets/img/${filename}"`;
            });
        }
        return content;
    });


    eleventyConfig.setLibrary("md", markdownLib);
    
    return {
        pathPrefix: "hypervirtualisation",
        dir: {
            input: "src",
            output: "_site",
        },
    };
};
