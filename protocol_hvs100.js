module.exports = {
	HVS100: {
		COMMANDS: {
			GET_INPUTS: "GET.SIGNAL_GROUP2",
			GET_LABELS: "GET.SIGNAL_GROUP4",
			GET_STATE: "GET.ALLDATA_ME_XPT",
			REBOOT: "CMD.020503",
			// event: 2-digit hex for the selected event
			RECALL_EVENT: "CMD.030502{event}",
			// macroHex: 2-digit hex for the selected macro
			RECALL_MACRO: "CMD.04058100{macroHex}",
			// me: which me to transition
			TRANS_ME_AUTO: "SET.ME_XPT_ME{me}_BKGD_TRS_AUTO_STAT:1",
			// me: which me to transition
			TRANS_ME_CUT: "SET.ME_XPT_ME{me}_BKGD_TRS_AUTO_STAT:3",
			// me: which me owns the key
			// key: which key to transition
			TRANS_KEY_AUTO: "SET.ME_XPT_ME{me}_KEY{key}_TRS_AUTO_STAT:1",
			// me: which me owns the key
			// key: which key to transition
			TRANS_KEY_CUT: "SET.ME_XPT_ME{me}_KEY{key}_TRS_AUTO_STAT:3",
			// me: which me to set
			// layer: which layer to set
			// source: id of the selected source
			XPT_ME: "SET.ME_XPT_ME{me}_BKGD_{layer}:{source}",
			// aux: which aux to set;
			// source: id of the selected source
			XPT_AUX: "SET.ME_XPT_AUX{aux}:{source}",
		},
		ME_LAYERS: { A: "A", B: "B" },
		AUXES: [
			{ id: 1, label: "Aux 1", sName: "Aux1", no: 240 },
			{ id: 2, label: "Aux 2", sName: "Aux2", no: 241 },
			{ id: 3, label: "Aux 3", sName: "Aux3", no: 242 },
			{ id: 4, label: "Aux 4", sName: "Aux4", no: 243 },
			{ id: 5, label: "Aux 5", sName: "Aux5", no: 244 },
			{ id: 6, label: "Aux 6", sName: "Aux6", no: 245 },
			{ id: 7, label: "Aux 7", sName: "Aux7", no: 246 },
			{ id: 8, label: "Aux 8", sName: "Aux8", no: 247 },
		],
		VARIABLES: [
			{ name: "Last event to be recalled", variableId: "event_recall" },
			{ name: "KEY 1 on/off", variableId: "me_1_key_1" },
			{ name: "KEY 2 on/off", variableId: "me_1_key_2" },
			{ name: "DSK 1 on/off", variableId: "me_1_key_3" },
			{ name: "DSK 2 on/off", variableId: "me_1_key_4" },
		],
		MES: [{ id: 1, label: "ME 1" }],
		KEYS: [
			{ id: "1,1", label: "KEY 1" },
			{ id: "1,2", label: "KEY 2" },
			{ id: "1,3", label: "DSK 1" },
			{ id: "1,4", label: "DSK 2" },
		],
		get SOURCES_ME() {
			let sources = [
				// Built-in Inputs
				{ id: 1, label: "Source 1", sName: "In 1" },
				{ id: 2, label: "Source 2", sName: "In 2" },
				{ id: 3, label: "Source 3", sName: "In 3" },
				{ id: 4, label: "Source 4", sName: "In 4" },
				{ id: 5, label: "Source 5", sName: "In 5" },
				{ id: 6, label: "Source 6", sName: "In 6" },
				{ id: 7, label: "Source 7", sName: "In 7" },
				{ id: 8, label: "Source 8", sName: "In 8" },
				// Optional expansion card inputs
				{ id: 9, label: "Source 9", sName: "In 9" },
				{ id: 10, label: "Source 10", sName: "In10" },
				{ id: 11, label: "Source 11", sName: "In11" },
				{ id: 12, label: "Source 12", sName: "In12" },
				{ id: 13, label: "Source 13", sName: "In13" },
				{ id: 14, label: "Source 14", sName: "In14" },
				{ id: 15, label: "Source 15", sName: "In15" },
				{ id: 16, label: "Source 16", sName: "In16" },
				{ id: 17, label: "Source 17", sName: "In17" },
				{ id: 18, label: "Source 18", sName: "In18" },
				{ id: 19, label: "Source 19", sName: "In19" },
				{ id: 20, label: "Source 20", sName: "In20" },
			];
			let system = [
				// System inputs
				{ id: 0, label: "Black", sName: "BLK " },
				{ id: 29, label: "Still 1", sName: "STL1" },
				{ id: 30, label: "Still 2", sName: "STL2" },
				{ id: 31, label: "Still 1 Key", sName: "STK1" },
				{ id: 32, label: "Still 2 Key", sName: "STK2" },
				{ id: 37, label: "Color Bars", sName: "BARS" },
				{ id: 38, label: "Matte 1", sName: "MAT1" },
				{ id: 39, label: "Matte 2", sName: "MAT2" },
				{ id: 40, label: "Chroma Key Fill", sName: "CKFL" },
				{ id: 41, label: "Chroma Key Key", sName: "CKKY" },
				{ id: 42, label: "Sub Effect 1", sName: "EFF1" },
				{ id: 43, label: "Sub Effect 2", sName: "EFF2" },
				{ id: 50, label: "Multi-View", sName: "MV  " },
			];
			return sources.concat(
				system.sort((a, b) => (a.label > b.label ? 1 : -1)),
			);
		},
		get SOURCES_AUX() {
			let additional = [
				// Additional AUX-only sources
				{ id: 46, label: "Program", sName: "PGM " },
				{ id: 47, label: "Preview", sName: "PVW " },
				{ id: 48, label: "Clean", sName: "CLN " },
				{ id: 49, label: "Key Out", sName: "MEKY" },
			];
			return this.SOURCES_ME.concat(
				additional.sort((a, b) => (a.label > b.label ? 1 : -1)),
			);
		},
	},
};
