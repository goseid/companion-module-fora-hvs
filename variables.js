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
	 * Build the full variable definitions list for the given model
	 * @param {string} model - The model identifier
	 * @returns {Object[]} - Array of { name, variableId } variable definitions
	 */
	getVariableDefinitions(model) {
		let vars = [];

		// Static protocol variables (key on/off, event recall, DVE, etc.)
		vars.push(...protocol[model].VARIABLES);

		let auxSources = protocol[model].SOURCES_AUX.sort((a, b) => a.id - b.id);

		// Dynamic source name variables: short_{slug} and long_{slug}
		auxSources.forEach((src) => {
			let slug = src.label.toLowerCase().replace(/ /g, "");
			vars.push({
				name: "Short name of " + src.label,
				variableId: "short_" + slug,
			});
		});
		auxSources.forEach((src) => {
			let slug = src.label.toLowerCase().replace(/ /g, "");
			vars.push({
				name: "Long name of " + src.label,
				variableId: "long_" + slug,
			});
		});

		// Aux destination short name variables
		protocol[model].AUXES.forEach((aux) => {
			let slug = aux.label.toLowerCase().replace(/ /g, "");
			vars.push({
				name: "Short name of " + aux.label,
				variableId: "short_" + slug,
			});
		});

		// Aux routing variables: aux_{id}_source
		protocol[model].AUXES.forEach((aux) => {
			vars.push({
				name: "Source active on " + aux.label,
				variableId: "aux" + aux.id + "_source",
			});
		});

		// ME routing variables: me{m}_pgm_source and me{m}_pvw_source
		protocol[model].MES.forEach((me) => {
			let slug = me.label.toLowerCase().replace(/ /g, "");
			vars.push({
				name: "PGM source on " + me.label,
				variableId: slug + "_pgm_source",
			});
			vars.push({
				name: "PVW source on " + me.label,
				variableId: slug + "_pvw_source",
			});
		});

		// Keyer source variables: me_{m}_key_{k}_src
		protocol[model].KEYS.forEach((key) => {
			let parts = key.id.split(",");
			vars.push({
				name: key.label + " source",
				variableId: `me_${parts[0]}_key_${parts[1]}_src`,
			});
		});

		return vars;
	},

	/**
	 * Set initial variable values from protocol source defaults
	 * @param {string} model - The model identifier
	 */
	initVariableValues(model) {
		let values = {};

		let auxSources = protocol[model].SOURCES_AUX.sort((a, b) => a.id - b.id);

		// Set default short/long names from source sName and label
		auxSources.forEach((src) => {
			let slug = src.label.toLowerCase().replace(/ /g, "");
			values["short_" + slug] = src.sName || src.label.substring(0, 4);
			values["long_" + slug] = src.label;
		});

		// Set default short names for aux destinations
		protocol[model].AUXES.forEach((aux) => {
			let slug = aux.label.toLowerCase().replace(/ /g, "");
			values["short_" + slug] = aux.sName || aux.label.substring(0, 4);
		});

		this.setVariableValues(values);
	},

	/**
	 * Process SIGNAL_GROUP JSON response to update short/long name variables
	 * @param {Object[]} signals - Array of signal objects with { no, sName, lName }
	 * @param {string} model - The model identifier
	 */
	updateLabels(signals, model) {
		let values = {};
		let allSources = protocol[model].SOURCES_AUX.sort((a, b) => a.id - b.id);

		allSources.forEach((src) => {
			let slug = src.label.toLowerCase().replace(/ /g, "");
			let signal = signals.find((s) => s.no === src.id);
			if (signal) {
				if (signal.sName) {
					values["short_" + slug] = signal.sName;
				}
				if (signal.lName) {
					values["long_" + slug] = signal.lName;
				}
			}
		});

		// Also update aux destination names
		protocol[model].AUXES.forEach((aux) => {
			let slug = aux.label.toLowerCase().replace(/ /g, "");
			let signal = signals.find((s) => s.no === aux.no);
			if (signal && signal.sName) {
				values["short_" + slug] = signal.sName;
			}
		});

		if (Object.keys(values).length > 0) {
			this.setVariableValues(values);
		}
	},

	/**
	 * Look up a source label by its numeric ID
	 * @param {number|string} sourceId - The numeric source ID
	 * @param {string} model - The model identifier
	 * @returns {string} - The source label, or the raw ID if not found
	 */
	getSourceLabel(sourceId, model) {
		let id = parseInt(sourceId);
		let source = protocol[model].SOURCES_AUX.find((s) => s.id === id);
		return source ? source.sName || source.label : String(sourceId);
	},
};
