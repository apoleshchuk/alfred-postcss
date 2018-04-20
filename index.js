const alfredNotifier = require("alfred-notifier");
const alfy = require("alfy");

const fetchOptions = {
	maxAge: 1000 * 60 * 60 * 24 // 1 day
};

const url =
	"https://raw.githubusercontent.com/himynameisdave/postcss-plugins/master/plugins.json";

alfredNotifier();

alfy.fetch(url, fetchOptions).then(plugins => {
	const items = alfy
		.inputMatches(plugins, (x, input) =>
			[x.name, x.description].join(" ").includes(input)
		)
		.map(x => ({
			autocomplete: x.name,
			title: x.name,
			subtitle: `⭐️ ${x.stars} 	${x.description}`,
			arg: x.url,
			quicklookurl: x.url
		}));

	alfy.output(items);
});
