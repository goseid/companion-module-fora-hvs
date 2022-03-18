let protocol_hvs100 = require("./protocol_hvs100");
let protocol_hvs2000 = require("./protocol_hvs2000");

let protocol = {
	...protocol_hvs100,
	...protocol_hvs2000,
};

module.exports = {
	getProtocol: (model) => {
		return protocol[model];
	},
	/**
	 * Build the list of actions
	 * @param {string} model - The model we are requesting actions for
	 * @returns {Object} - The actions
	 */
	getActions: (model) => {
		// Global actions
		let actions = {};
		actions["custom"] = {
			label: "Send Custom Command",
			options: [
				{
					type: "textinput",
					label: "Command",
					id: "command",
					default: "",
					required: true,
				},
			],
		};
		actions["reboot"] = { label: "Reboot Switcher" };
		actions["recall_event"] = {
			label: "Recall Event",
			options: [
				{
					type: "number",
					label: "Event Number",
					id: "event",
					default: 0,
					min: 0,
					max: 99,
					required: true,
				},
			],
		};
		actions["reconnect"] = {
			label: "Reconnect",
			tooltip:
				"If the switcher drops the connection, this action will reconnect.",
		};
		actions["trans_me"] = {
			label: "Transition ME",
			options: [
				{
					type: "dropdown",
					label: "Type",
					id: "type",
					required: true,
					default: "CUT",
					choices: [
						{ id: "AUTO", label: "Auto" },
						{ id: "CUT", label: "Cut" },
					],
				},
				{
					type: "dropdown",
					label: "ME",
					id: "me",
					required: true,
					default: 1,
					choices: protocol[model].MES,
				},
			]
		};
		actions["trans_key"] = {
			label: "Transition Key",
			options: [
				{
					type: "dropdown",
					label: "Type",
					id: "type",
					required: true,
					default: "CUT",
					choices: [
						{ id: "AUTO", label: "Auto" },
						{ id: "CUT", label: "Cut" },
					],
				},
				{
					type: "dropdown",
					label: "Key",
					id: "key",
					required: true,
					default: "1,1",
					choices: protocol[model].KEYS,
				},
			]
		};
		actions["xpt_aux"] = {
			label: "Set AUX",
			options: [
				{
					type: "dropdown",
					label: "Aux",
					id: "aux",
					required: true,
					default: 1,
					choices: protocol[model].AUXES,
				},
				{
					type: "dropdown",
					label: "Source",
					id: "source",
					required: true,
					default: 1,
					choices: protocol[model].SOURCES_AUX,
					minChoicesForSearch: 1
				},
			],
		};
		actions["xpt_me"] = {
			label: "Set ME",
			options: [
				{
					type: "dropdown",
					label: "ME",
					id: "me",
					required: true,
					default: 1,
					choices: protocol[model].MES,
				},
				{
					type: "dropdown",
					label: "Layer",
					id: "layer",
					required: true,
					default: "A",
					choices: [
						{ id: "A", label: "A / PGM" },
						{ id: "B", label: "B / PVW" },
					],
				},
				{
					type: "dropdown",
					label: "Source",
					id: "source",
					required: true,
					default: 1,
					choices: protocol[model].SOURCES_ME,
					minChoicesForSearch: 1
				},
			],
		};

		// HVS2000 only actions
		if (model === "HVS2000") {
			actions["xpt_mel"] = {
				label: "Set MELite",
				options: [
					{
						type: "dropdown",
						label: "MELite",
						id: "mel",
						required: true,
						default: 1,
						choices: protocol[model].MELS,
					},
					{
						type: "dropdown",
						label: "Layer",
						id: "layer",
						required: true,
						default: "A",
						choices: [
							{ id: "A", label: "A / PGM" },
							{ id: "B", label: "B / PVW" },
						],
					},
					{
						type: "dropdown",
						label: "Source",
						id: "source",
						required: true,
						default: 1,
						choices: protocol[model].SOURCES_ME,
						minChoicesForSearch: 1
					},
				],
			};
			actions["trans_mel"] = {
				label: "Transition MELite",
				options: [
					{
						type: "dropdown",
						label: "Type",
						id: "type",
						required: true,
						default: "CUT",
						choices: [
							{ id: "AUTO", label: "Auto" },
							{ id: "CUT", label: "Cut" },
						],
					},
					{
						type: "dropdown",
						label: "MELite",
						id: "mel",
						required: true,
						default: 1,
						choices: protocol[model].MELS,
					},
				]
			};
			actions["trans_flex_key"] = {
				label: "Transition Flex Key",
				options: [
					{
						type: "dropdown",
						label: "Type",
						id: "type",
						required: true,
						default: "CUT",
						choices: [
							{ id: "AUTO", label: "Auto" },
							{ id: "CUT", label: "Cut" },
						],
					},
					{
						type: "dropdown",
						label: "Key",
						id: "key",
						required: true,
						default: 1,
						choices: protocol[model].FLEX_KEYS,
					},
				]
			};
		}
		return actions;
	},

	/**
	 * Build the list of feedbacks
	 * @param {string} model - The model we are requesting actions for
	 * @returns {Object} - The feedbacks
	 */
	getFeedbacks: (instance, model, state) => {
		//console.log('................................................................GettingFeedbacks');
		state.fromActions = "added from actions.js";
		// console.log('........................................................added State from Actions');
		// Global feedbacks
		const feedbacks = {}
		feedbacks['me_pgm_src'] = {
			type: 'boolean',
			label: 'ME PGM Source',
			description: 'If the source of the Program Bus of the specifed ME matches the specified input, change the style',
			style: {
				color: instance.rgb(255, 255, 255),
				bgcolor: instance.rgb(255, 0, 0)
			},
			options: [
				{
					type: "dropdown",
					label: "ME",
					id: "me",
					default: 1,
					choices: protocol[model].MES
				},
				{
					type: "dropdown",
					label: "Source",
					id: "source",
					default: 1,
					choices: protocol[model].SOURCES_ME
				},
			],

			callback: (feedback, btnProps, btnInfo) => {
				const MELayerSource = protocol[model].MES.find(ME => ME.id == feedback.options.me)['A'].source;
				console.log("MELayerSource:", MELayerSource, 'f.o.s:', feedback.options.source, feedback.options.source === MELayerSource);
				return feedback.options.source === MELayerSource;
			}
		};
		feedbacks['me_pvw_src'] = {
			type: 'boolean',
			label: 'ME PVW Source',
			description: 'If the source of the Program Bus of the specifed ME matches the specified input, change the style',
			style: {
				color: instance.rgb(0, 0, 0),
				bgcolor: instance.rgb(0, 255, 0)
			},
			options: [
				{
					type: "dropdown",
					label: "ME",
					id: "me",
					default: 1,
					choices: protocol[model].MES
				},
				{
					type: "dropdown",
					label: "Source",
					id: "source",
					default: 1,
					choices: protocol[model].SOURCES_ME
				},
			],

			callback: (feedback, btnProps, btnInfo) => {
				const MELayerSource = protocol[model].MES.find(ME => ME.id == feedback.options.me)['B'].source;
				console.log("MELayerSource:", MELayerSource, 'f.o.s:', feedback.options.source, feedback.options.source === MELayerSource);
				return feedback.options.source === MELayerSource;
			}
		};
		feedbacks[`aux_src`] = {
			type: 'boolean',
			label: 'Aux Source',
			description: 'If the source of the aux matches the specified input, change the style',
			style: {
				color: instance.rgb(255, 255, 255),
				bgcolor: instance.rgb(0, 0, 255)
			},
			options: [
				// {type: 'number', label: "Number", id: "number", default: 1},
				{
					type: 'dropdown',
					label: 'Aux',
					id: 'aux',
					default: 1,
					choices: protocol[model].AUXES
				},
				{
					type: 'dropdown',
					label: 'Source',
					id: 'source',
					default: 1,
					choices: protocol[model].SOURCES_AUX
				}
			],
			callback: (feedback, btnProps, btnInfo) => {
				const auxSrc = protocol[model].AUXES.find(aux => aux.id == feedback.options.aux).source.no;
				return feedback.options.source === auxSrc;
			}
		};
		// console.log('protocol[model].KEYS');
		// console.log(protocol[model].KEYS);
		console.log(protocol[model].KEYS.map(
			el => ({ id: parseInt(el.id.split(",").pop()), label: el.label })
		))
		// console.log(protocol[model].KEYS.map(({kid,klabel}) =>({
		// 	id: parseInt(ME.kid.split(",").pop()),
		// 	label: klabel
		// })));
		feedbacks[`key_active`] = {
			type: 'boolean',
			label: 'Keyer Active',
			description: 'Highlight if the specified keyer is active',
			style: {
				color: instance.rgb(255, 255, 255),
				bgcolor: instance.rgb(255, 0, 0)
			},
			options: [
				{
					type: "dropdown",
					label: "ME",
					id: "me",
					default: 1,
					choices: protocol[model].MES
				},
				{
					type: "dropdown",
					label: "Keyer",
					id: "keyer",
					default: 1,
					choices: protocol[model].KEYS.map(
						el => ({ id: parseInt(el.id.split(",").pop()), label: el.label })
					)
				},
			],
			callback: (feedback, btnProps, btnInfo) => {
				// key = `me_${match[1]}_key_${match[2]}`
				const v = protocol[model].VARIABLES.find(
					el => el.name === `me_${feedback.options.me}_key_${feedback.options.keyer}`
				);
				console.log("V", v);
				return v.active;
			}
		};
		// console.log("vvvv feedbacks vvvv");
		// console.dir(feedbacks);
		return feedbacks;
	},


	/**
	 * Process data recieved from the switcher
	 * @param {string} - The data that was recieved
	 */
	dataRecieved: (data) => {
		// TODO: Process this data to populate feedbacks
	},

	generateVariables: (model) => {
		// console.log(".............................................Source Variables to Add");
		const auxSources = protocol[model].SOURCES_AUX
			.sort((a, b) => (a.id > b.id ? 1 : -1));
		auxSources.forEach(src => {
			protocol[model].VARIABLES.push({
				name: 'short_' + src.label.toLowerCase().replace(/ /g, ''),
				label: 'short name of ' + src.label,
				default: src.sName,
				no: src.id
			});
		});
		auxSources.forEach(src => {
			protocol[model].VARIABLES.push({
				name: 'long_' + src.label.toLowerCase().replace(/ /g, ''),
				label: 'long name of ' + src.label,
				default: src.label,
				no: src.id
			});
		});

		const destinations = protocol[model].AUXES;
		destinations.forEach(aux => {
			protocol[model].VARIABLES.push({
				name: 'short_' + aux.label.toLowerCase().replace(/ /g, ''),
				label: 'short name of ' + aux.label,
				default: aux.sName,
				no: aux.no
			});
		});
		// destinations.push(...protocol[model].)
		destinations.forEach(dest => {
			protocol[model].VARIABLES.push({
				name: dest.label.toLowerCase().replace(/ /g, '') + '_source',
				label: 'Source active on ' + dest.label,
			});
		});
		protocol[model].MES.forEach(ME => {
			protocol[model].VARIABLES.push({
				name: ME.label.toLowerCase().replace(/ /g, '') + '_pgm_source',
				label: 'Source active on ' + ME.label,
			});
			protocol[model].VARIABLES.push({
				name: ME.label.toLowerCase().replace(/ /g, '') + '_pvw_source',
				label: 'Source active on ' + ME.label,
			});
		});
		// console.dir(protocol[model].VARIABLES);
		// console.log("can you see them?");
		// console.log("STATE from Actions:", state);
	},
	parseVariable: (data, model, instance) => {
		let [key, value] = data.split(':');
		let match;
		// HVS100 Events
		if (key === 'EVT_SETUP_LAST_RCL_NO') {
			key = 'event_recall';
		}
		// HVS2000 Global Events
		else if (key === 'EVENT_LASTRECALL_NO') {
			key = 'global_event_recall'
		}
		// HVS2000 Local Events
		else if ((match = key.match('^ME([1-3])_EVENT_LASTRECALL_NO$')) !== null) {
			key = `me_${match[1]}_event_recall`;
		}
		// HVS100 & HVS2000 ME Keys
		else if ((match = key.match('^M([1-3])K([1-4])_KEYONAIR$')) !== null) {
			// console.log('^M([1-3])K([1-4])_KEYONAIR$', key, match);
			key = `me_${match[1]}_key_${match[2]}`;
			const v = protocol[model].VARIABLES.find(el => el.name === key);
			v.active = parseInt(value);
			value = value === '0' ? 'off' : 'on';
			instance.checkFeedbacks('key_active');
		}
		// HVS100 & HVS2000 ME Keyer Sources
		else if ((match = key.match('^ME_XPT_ME([1-3])_KEY([1-4])_([A-B])$')) !== null) {
			// console.log('^M([1-3])K([1-4])_KEYONAIR$', key, match);
			const source = protocol[model].VARIABLES.find(el => el.no == value);
			key = `me_${match[1]}_key_${match[2]}_src`;
			value = source.default;
		}
		// HVS100 & ?HVS2000? ME Layer Sources
		else if ((match = key.match('^ME_XPT_ME([1-4])_BKGD_([A-B])$')) !== null) {
			// console.log(protocol[model].VARIABLES);
			// console.log('^ME_XPT_AUX([1-9]|1[0-8])', key, res[1], value);
			const meNumber = match[1];
			switch (layer = match[2]) {
				case "A":
					bus = "pgm";
					break;
				case "B":
					bus = "pvw";
					break;
				default:
					console.error('unexpected layer in ' + data, layer);
					break;
			}
			key = `me${meNumber}_${bus}_source`;
			const source = protocol[model].VARIABLES.find(el => el.no == value);
			const me = protocol[model].MES.find(el => el.id == meNumber);
			if (!me[layer]) {
				me[layer] = { source: parseInt(value) };
			} else {
				me[layer].source = parseInt(value);
			}
			value = source.default;
			console.log(data, meNumber, layer, bus);
			console.dir(me);

			// key = 'me' + auxNumber + '_source';
			// const source = protocol[model].VARIABLES.find(el => el.no == value);
			// value = source.default;
			// const aux = protocol[model].AUXES.find(el => el.id == auxNumber);
			// aux.source = source;
			instance.checkFeedbacks(`me_${bus}_src`);
		}
		// HVS100 & ?HVS2000? Aux 1-18 Sources 
		else if ((match = key.match('^ME_XPT_AUX([1-9]|1[0-8])')) !== null) {
			let auxNumber = match[1];
			key = 'aux' + auxNumber + '_source';
			const source = protocol[model].VARIABLES.find(el => el.no == value);
			value = source.default;
			const aux = protocol[model].AUXES.find(el => el.id == auxNumber);
			aux.source = source;
			instance.checkFeedbacks('aux_src');
		}
		// HVS2000 Flex Keys
		else if ((match = key.match('^FLX([1-4])_KEYONAIR$')) !== null) {
			key = `flex_key_${match[1]}`;
			value = value === '0' ? 'off' : 'on';
		}
		else {
			return null;
		}

		return [key, value];
	},

	getVariableList: (model) => {
		return protocol[model].VARIABLES;
	},

	/**
	 * Process labels, match with variables and return array to update
	 * @param {Object[]} signals - Array of signal names from switcher
	 * @param {string} model - The model of switcher to get the command for
	 * @returns {Object[]} - Array of {variable, value} to be updated
	 */
	updateLabels: (signals, model) => {
		const updates = [];
		protocol[model].VARIABLES
			.filter(v => v.hasOwnProperty("no"))
			.forEach(variable => {
				const s = signals.find(e => e.no === variable.no && variable.name.includes('short'));
				if (s) {
					updates.push({ name: variable.name, value: s.sName });
				}
				const l = signals.find(e => e.no === variable.no && variable.name.includes('long'));
				if (l) {
					updates.push({ name: variable.name, value: l.lName });
				}
			});
		return updates;
	},

	/**
	 * Return the command string fot the provided action
	 * @param {string} model - The model of switcher to get the command for
	 * @param {string} action - The id of the action we want a command for
	 * @param {Object} options - Any options from the action
	 * @returns {string} - The command string
	 */
	getCommandForAction: (model, action, options) => {
		let command = "";

		switch (action) {
			// Global actions
			case "get_state":
				command = protocol[model].COMMANDS.GET_STATE || "";
				break;
			case "get_labels":
				command = protocol[model].COMMANDS.GET_LABELS || "";
				break;
			case "reboot":
				command = protocol[model].COMMANDS.REBOOT || "";
				break;
			case "recall_event":
				let eventInt = parseInt(options.event) + 1; // Although the switcher labels them starting at 0, they are recalled with a 1 base...
				let eventHex = ("0" + eventInt.toString(16)).slice(-2); // The switcher expects the event Id as a 2-digit hexidecimal
				command = (protocol[model].COMMANDS.RECALL_EVENT || "")
					.replace("{event}", eventHex);
				break;
			case "trans_me":
				command = (protocol[model].COMMANDS[`TRANS_ME_${options.type}`] || "")
					.replace("{me}", options.me);
				break;
			case "trans_key":
				let key = options.key.split(",");
				command = (protocol[model].COMMANDS[`TRANS_KEY_${options.type}`] || "")
					.replace("{me}", key[0])
					.replace("{key}", key[1]);
				break;
			case "xpt_me":
				command = (protocol[model].COMMANDS.XPT_ME || "")
					.replace("{me}", options.me)
					.replace("{layer}", protocol[model].ME_LAYERS[options.layer])
					.replace("{source}", options.source);
				break;
			case "xpt_aux":
				command = (protocol[model].COMMANDS.XPT_AUX || "")
					.replace("{aux}", options.aux)
					.replace("{source}", options.source);
				break;

			// HVS2000 only actions
			case "trans_mel":
				command = (protocol[model].COMMANDS[`TRANS_MEL_${options.type}`] || "")
					.replace("{mel}", options.mel);
				break;
			case "xpt_mel":
				command = (protocol[model].COMMANDS.XPT_MEL || "")
					.replace("{mel}", options.mel)
					.replace("{layer}", protocol[model].ME_LAYERS[options.layer])
					.replace("{source}", options.source);
				break;
			case "trans_flex_key":
				command = (protocol[model].COMMANDS[`TRANS_FLEX_KEY_${options.type}`] || "")
					.replace("{key}", options.key);
				break;

			// Allow for custom commands
			case "custom":
				command = options.command.trim();
				break;
		}

		return command;
	},
};
