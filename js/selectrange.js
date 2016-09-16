$(function () {

	var plus_5_days	= new Date;
	plus_5_days.addDays(0);
	$('.3-calendars').pickmeup({
		flat		: true,
		date		: [
			new Date,
			plus_5_days
		],
		mode		: 'range',
		calendars	: 5
	});

});
