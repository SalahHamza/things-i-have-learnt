/**
 * 
 * @param {Array} headings - Array of h2/h3 elements as cheerio objects
 * @returns {Object} An object containing an array of heading textContent
 * and an array containing h2 indexes
 */
const getHeadingsIndexes = (headings) => {
	const indexes = [];
	const hds = [];
	headings.each((i, elem) => {
		hds.push(headings.eq(i).text());
		if(elem.name === 'h2'){
			indexes.push(i);
		}
	})
	return {hds,indexes};
}

/**
 * 
 * @param {Array} headings Array of h2/h3 elements as cheerio objects
 * @returns {Array} returns heading structure with h2 as heading and h3 as subheadings
 */
const headingsHandler = (headings) => {
	let {hds, indexes} = getHeadingsIndexes(headings);

	if(indexes.length === 0) return [];
	if(indexes.length === 1) return headings;
	let curr = indexes[0], next;
	indexes = indexes.slice(1);
	let sections = [];
	for(i of indexes){
		next = i;
		section = hds.slice(curr, next);
		const heading = section[0];
		section = section.slice(1);
		sections.push({
			heading,
			subHeadings: section
		});
		curr = next;
	}
	return sections;
}


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

module.exports = {
	pageTitle,
	headingsHandler
}
