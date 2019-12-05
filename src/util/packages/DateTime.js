/*
  DateTime pack by Zytekaron#0572
  Convert time lengths to readable output.
  Allows inputs in default: milliseconds. Other options are: s=seconds m=minutes h=hours d=days M=months Y=Years
  See bottom of file for full example.
*/
function DateTime (input, t = 'ms') {
	if(t === 's') input *= 1000;
	if(t === 'm') input *= 60000;
	if(t === 'h') input *= 3600000;
	if(t === 'd') input *= 86400000;
	if(t === 'M') input *= 2592000000;
	if(t === 'Y') input *= 31536000000;
	const data = {}
		, units = [{ t:'seconds', m:60000 }, { t:'minutes', m:60 }, { t:'hours', m:24 }, { t:'days', m:30 }, { t:'months', m:12 }, { t:'years', m:10 }];

	units.forEach((unit) => input = (input - (data[unit.t] = (input % unit.m))) / unit.m);
	data.h = () => {
		return units.reverse()
			.filter((unit) => data[unit.t])
			.map((unit) => {
				let one = '';
				if(unit.t === 'seconds') {
					one += Math.ceil(data[unit.t] / 1000) + ' ';
					one += Math.ceil(data[unit.t] / 1000) === 1 ? unit.t.slice(0, -1) : unit.t;
				} else {
					one += data[unit.t] + ' ';
					one += data[unit.t] === 1 ? unit.t.slice(0, -1) : unit.t;
				}
				return one;
			})
			.join(', ');
	};
	return data;
}
module.exports = DateTime;

/*
const DateTime = require('./path-to-file.js');
const time = new DateTime(process.uptime(), 's')
console.log("Process Uptime: " + time.h()) // Process Uptime: 2 hours, 12 minutes, 32 seconds.
*/
