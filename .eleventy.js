const pluginTailwindCSS = require("eleventy-plugin-tailwindcss")
const navigation = require("@11ty/eleventy-navigation")
const seo = require("eleventy-plugin-seo")
const embedEverything = require("eleventy-plugin-embed-everything")
const unpkgInliner = require("eleventy-njk-unpkg-inliner")
const site = require("./src/_data/site.js")
const fetch = require("node-fetch")

module.exports = function(eleventyConfig) {

    // PASS THROUGHS
    eleventyConfig.addPassthroughCopy("src/_admin");

    // TEMPLATES
    eleventyConfig.addLayoutAlias('default', 'layouts/base.njk')
    
    // PLUGINS
    eleventyConfig.addPlugin(pluginTailwindCSS, {
        src: "src/css/*"
    })

    eleventyConfig.addPlugin(embedEverything, {
        use: ['vimeo', 'youtube']
      });

    eleventyConfig.addPlugin(seo, {
        title: site.title,
        description: site.description,
        url: site.url,
        author: site.author.name,
        twitter: site.author.twitter,
        image: site.image
      })
    
    // SHORTCODES
    eleventyConfig.addNunjucksAsyncShortcode('inline', unpkgInliner)

    eleventyConfig.addNunjucksAsyncFilter('vimeoThumbnail', function (vimeoUrl, callback) {
        const thumb =
        fetch('https://vimeo.com/api/oembed.json?url=' + vimeoUrl).
        then( res => res.json() ).
        then( data => {callback(null, data.thumbnail_url)} )
    } )

    // DEEP DATA MERGE
    eleventyConfig.setDataDeepMerge(true)

    return {
        dir: {
            input: 'src',
            output: 'dist'
        },
        templateFormats: ['md', 'njk', 'html'],
        markdownTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk'

    }

}
