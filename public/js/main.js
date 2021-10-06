
const jobs = {};

//generate a url from a position and location
const templateURL = (position, location) => {
	let url = `https://www.indeed.com/jobs?q=${position}&l=${location}`
	return url;
}

// axios response element schema
// response = {data, status, statusText, headers, config} 
async function getJobListings(position, location) {

	//if using jQuery, recommended that jQuery func is used only. Forget about XMLHttpRequest

	let url = templateURL(position, location);

	await $.ajax({ url, success: (result) => console.log(result) });

	const listingTable =  $('.mosaic-provider-jobcards');

	// can use .text(), .html(), .find(), children(), parent() on object
	// scraping id, title, company, location, description, link, date
	listingTable.find('.result').each((i, element) => {
		jobs[i] = {};

		const title = $(element)
			.find('.jobTitle')
			.text();
		jobs[i]["title"] = title;

		const companyName = $(element)
			.find('.companyName')
			.text();
		jobs[i]['company'] = companyName;
				
		const location = $(element)
			.find('.companyLocation')
			.text();
		jobs[i]['location'] = location;

		const description = $(element)
			.find('.job-snippet')
			.text()
			.replace(/(\r\n|\n|\r)/gm, "");
		jobs[i]['description'] = description;

		const link = $(element)
			.attr('href');
		jobs[i]['link'] = 'https://www.indeed.com' + link;

		const date = $(element)
			.find('.date')
			.text();
		jobs[i]['date'] = date;
	});

	return jobs;
};

$(function() {
	$('#criteria').on('submit', function(e) {
		e.preventDefault();
		let data = $('#criteria :input').serializeArray();
		console.log(data);
		console.log('success');
	});
});
