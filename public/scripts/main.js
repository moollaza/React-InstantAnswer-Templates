var BaseWrap = React.createClass({
	render: function() {
		var Component = this.props.ia.data.length > 1	? TilesWrap : DetailWrap;
		return (
			<div className="zci__base">
				<Component ia={this.props.ia} />
			</div>
		);
	}
});

var DetailWrap = React.createClass({
	render: function() {
		var data = this.props.ia.data,
			layout = this.props.ia.layout;
		return (
			<div className="zci__detail_wrap">
				<Detail key={data.id} layout={layout} {...data} />
			</div>
		);
	}
});

var TilesWrap = React.createClass({
	render: function() {
		var data = this.props.ia.data,
			layout = this.props.ia.layout;
		return (
			<div className="zci__tiles_wrap">
				{data.map(function(result){
					return <Tile key={result.id} layout={layout} {...result} />;
				})}
			</div>
		);
	}
});


// Tile Layouts

var Tile = React.createClass({
	render: function() {
		var props = this.props;
		// console.log(props);
		return (
			<TileLayout {...props} />
		);
	}
});

var TileLayout = React.createClass({
	render: function() {
		var Layout,
			props = this.props;
		switch (this.props.layout) {
			case "text":
				Layout = TileText;
				break;
			case "short":
				Layout = TileShort;
				break;
			default:
				break;
		}
		return (
			<Layout {...props} />
		);
	}
});

var TileText = React.createClass({
	render: function() {
		var layout = this.props.layout;

		var image = this.props.image,
			title = this.props.title,
			subtitle = this.props.subtitle,
			body = this.props.body,
			footer = this.props.footer,
			infobox = this.props.infobox;

		return (
			<div className={"zci__tile--"+layout} >
				<Img data={image} />
				<Title data={title} />
				<Subtitle data={subtitle} />
				<Body data={body} />
				<Footer data={footer} />
				<InfoBox data={infobox} />
			</div>
		);
	}
});


var TileShort = React.createClass({
	render: function() {
		var layout = this.props.layout;

		var image = this.props.image,
			title = this.props.title,
			subtitle = this.props.subtitle,
			body = this.props.body,
			footer = this.props.footer,
			infobox = this.props.infobox;

		return (
			<div className={"zci__tile--"+layout} >
				<Title data={title} />
				<Body data={body} />
				<Subtitle data={subtitle} />
			</div>
		);
	}
});


// Detail Layouts

var Detail = React.createClass({
	render: function() {
		return (
			<DetailLayout layout={this.props.layout} />
		);
	}
});

var DetailLayout = React.createClass({
	render: function() {
		var Layout,
			props = this.props;
		switch (this.props.layout) {
			case "text":
				Layout = DetailText;
				break;
			default:
				break;
		}
		return (
			<Layout {...props} />
		);
	}
});

var DetailText = React.createClass({
	render: function() {
		var layout = this.props.layout;

		var image = this.props.image,
			title = this.props.title,
			subtitle = this.props.subtitle,
			body = this.props.body,
			footer = this.props.footer,
			infobox = this.props.infobox;

		return (
			<div className={"zci__detail--"+layout}>
				<Img data={image}/>
				<Title data={title} />
				<Subtitle data={subtitle} />
				<Body data={body} />
				<Footer data={footer} />
				<InfoBox data={infobox} />
			</div>
		);
	}
});


// Components
function _getText(props){
	var text;
	if (typeof props.data === "string") {
		text = props.data || '';
	} else {
		text = props.data.text || '';
	}
	return text;
}


var Img = React.createClass({
	render: function() {
		return (
			<img src={this.props.src} alt={this.props.alt} />
		);
	}
});

var Title = React.createClass({
	render: function() {
		return (
			<h3 className="zci_title">{_getText(this.props)}</h3>
		);
	}
});

var Subtitle = React.createClass({
	render: function() {
		var divStyle = {
		  color: this.props.data.color || "#333",
			fontSize: this.props.data.fontSize || '15'
		};
		return (
			<h4 className="zci_subtitle" style={divStyle}>{_getText(this.props)}</h4>
		);
	}
});

var Body = React.createClass({
	render: function() {
		return (
			<div className="zci_body">
				{ this.props.data.codeBlock &&
					<pre>{this.props.data.codeBlock.text}</pre>
				}
				{ this.props.data.description &&
					<pre>{this.props.data.description.text}</pre>
				}
			</div>
		);
	}
});

var Footer = React.createClass({
	render: function() {
		return (
			<div className="zci_footer">
				{ this.props.data.moreAt &&
					<MoreAt data={this.props.data.moreAt} />
				}
			</div>
		);
	}
});

var InfoBox = React.createClass({
	render: function() {
		return (
			<div className="zci_infobox"></div>
		);
	}
});


var MoreAt = React.createClass({
	render: function() {
		return (
			<a src={this.props.data.url}>More at {this.props.data.name}</a>
		);
	}
});


// Data

var apiResult = [
	{ id: 1, title: "title 1", subtitle: "subtitle 1", codeSnippet: "var a = 'foo'"},
	{ id: 2, title: "title 2", subtitle: "subtitle 2", codeSnippet: "var b = 'bar'"},
	{ id: 3, title: "title 3", subtitle: "subtitle 3", codeSnippet: "var c = 'duck'"}
];

var spice = {
	id: "mySpice",
	category: "science",
	data: apiResult,
	layout: "short",
	normalize: function(item) {
		return {
			title: item.title,
			subtitle: {
				text: item.subtitle,
				fontSize: 14,
				color: "#555"
			},
			body: {
				codeBlock:{
					text: item.codeSnippet
				},
			},
			footer: {
				moreAt: {
					name: "Wikipedia",
					url: "https://wikipedia.org",
				}
			}
		};
	},
	options: {
		fixedHeight: true // chomps content, adds showMore button
	}
};

apiResult.forEach(function(result){
	$.extend(result, spice.normalize(result));
});


ReactDOM.render(
  <BaseWrap ia={spice}/>,
  document.getElementById('content')
);
