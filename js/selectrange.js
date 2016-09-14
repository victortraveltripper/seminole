$(function () {

	$('.multiple').pickmeup({
		flat	: false,
		mode	: 'multiple'
	});
	$('.range').pickmeup({
		flat	: true,
		mode	: 'range'
	});
	var plus_5_days	= new Date;
	plus_5_days.addDays(0);
	$('.3-calendars').pickmeup({
		flat		: true,
		date		: [
			new Date,
			plus_5_days
		],
		mode		: 'range',
		calendars	: 3
	});
	//$('input').pickmeup({
	//	position		: 'right',
	//	hide_on_select	: true
//	});
});
