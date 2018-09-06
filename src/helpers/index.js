/**
 *
 * @param {String} str - Word to capitalize
 * @returns {String} - Capitalized word
 */
const capitalize = (str) => {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 *
 * @param {String} pkgName - .md file name
 * @returns {String} - Formatted .md file name
 */
const pageTitle = (mdFileName) => {
	return mdFileName.split('-').map(w => capitalize(w)).join(' ');
}

/**
 * @param {String} src - HTML string to parse to cheerio object
 * @returns {Object} Cheerio object
 */
const getCheerioObject = (src) => {
	return require('cheerio').load(src);
}

/**
 * @param {Object} $ - Cheerio object
 * @returns {String} h1 heading of that page
 */
const getH1Heading = ($) => {
	return $('h1').text() || '';
}

/**
 * @description Fixes all heading ids (hanging '-')
 * @param {Object} $ - Cheerio object
 * @returns {String} - Fixed HTML string
 */
const fixHeadingsId = ($) => {
	$('h1, h2, h3, h4, h5, h6').each(function(i, heading){
		const headingId = $(this).attr('id');
		if(headingId && headingId[headingId.length-1] === '-'){
			$(this).attr('id', headingId.slice(0, headingId.length-1)).html();
		}
	});
	return $.html();
}

module.exports = {
	pageTitle,
	fixHeadingsId,
	getCheerioObject,
	getH1Heading
}
