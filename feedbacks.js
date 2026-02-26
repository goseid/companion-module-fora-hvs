let { combineRgb } = require("@companion-module/base");

let protocol_hvs100 = require("./protocol_hvs100");
let protocol_hvs390 = require("./protocol_hvs390");
let protocol_hvs2000 = require("./protocol_hvs2000");

let protocol = {
	...protocol_hvs100,
	...protocol_hvs390,
	...protocol_hvs2000,
};

module.exports = {
	/**
	 * Register feedback definitions for the current model
	 */
	updateFeedbacks() {
		let model = this.config.model;
		let feedbacks = {};

		feedbacks.me_pgm_src = {
			type: "boolean",
			name: "ME PGM Source",
			description:
				"If the PGM source of the specified ME matches, change the style",
			defaultStyle: {
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(255, 0, 0),
			},
			options: [
				{
					type: "dropdown",
					label: "ME",
					id: "me",
					default: 1,
					choices: protocol[model].MES,
				},
				{
					type: "dropdown",
					label: "Source",
					id: "source",
					default: 1,
					choices: protocol[model].SOURCES_ME,
				},
			],
			callback: (feedback) => {
				let stateKey = `me_${feedback.options.me}_pgm_src`;
				return this.STATE[stateKey] == feedback.options.source;
			},
		};

		feedbacks.me_pvw_src = {
			type: "boolean",
			name: "ME PVW Source",
			description:
				"If the PVW source of the specified ME matches, change the style",
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(0, 255, 0),
			},
			options: [
				{
					type: "dropdown",
					label: "ME",
					id: "me",
					default: 1,
					choices: protocol[model].MES,
				},
				{
					type: "dropdown",
					label: "Source",
					id: "source",
					default: 1,
					choices: protocol[model].SOURCES_ME,
				},
			],
			callback: (feedback) => {
				let stateKey = `me_${feedback.options.me}_pvw_src`;
				return this.STATE[stateKey] == feedback.options.source;
			},
		};

		feedbacks.aux_src = {
			type: "boolean",
			name: "AUX Source",
			description:
				"If the source of the specified AUX matches, change the style",
			defaultStyle: {
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 255),
			},
			options: [
				{
					type: "dropdown",
					label: "Aux",
					id: "aux",
					default: 1,
					choices: protocol[model].AUXES,
				},
				{
					type: "dropdown",
					label: "Source",
					id: "source",
					default: 1,
					choices: protocol[model].SOURCES_AUX,
				},
			],
			callback: (feedback) => {
				let stateKey = `aux_${feedback.options.aux}_src`;
				return this.STATE[stateKey] == feedback.options.source;
			},
		};

		feedbacks.key_active = {
			type: "boolean",
			name: "Keyer Active",
			description: "Highlight if the specified keyer is active",
			defaultStyle: {
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(255, 0, 0),
			},
			options: [
				{
					type: "dropdown",
					label: "ME",
					id: "me",
					default: 1,
					choices: protocol[model].MES,
				},
				{
					type: "dropdown",
					label: "Keyer",
					id: "keyer",
					default: 1,
					choices: protocol[model].KEYS.map((el) => ({
						id: parseInt(el.id.split(",").pop()),
						label: el.label,
					})),
				},
			],
			callback: (feedback) => {
				let stateKey = `me_${feedback.options.me}_key_${feedback.options.keyer}`;
				return this.STATE[stateKey] === "on";
			},
		};

		this.setFeedbackDefinitions(feedbacks);
	},
};
