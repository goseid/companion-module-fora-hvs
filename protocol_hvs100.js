module.exports = {
	HVS100: {
		COMMANDS: {
			GET_INPUTS: "GET.SIGNAL_GROUP2",
			GET_STATE: "GET.ALLDATA_ME_XPT",
			REBOOT: "CMD.020503",
			// event: 2-digit hex for the selected event
			RECALL_EVENT: "CMD.030502{event}",
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
			{ id: 1, label: "Aux 1" },
			{ id: 2, label: "Aux 2" },
			{ id: 3, label: "Aux 3" },
			{ id: 4, label: "Aux 4" },
			{ id: 5, label: "Aux 5" },
			{ id: 6, label: "Aux 6" },
			{ id: 7, label: "Aux 7" },
			{ id: 8, label: "Aux 8" },
		],
		VARIABLES: [
			{ label: 'Last event to be recalled', name: 'event_recall' },
			{ label: 'KEY 1 on/off', name: 'me_1_key_1' },
			{ label: 'KEY 2 on/off', name: 'me_1_key_2' },
			{ label: 'DSK 1 on/off', name: 'me_1_key_3' },
			{ label: 'DSK 2 on/off', name: 'me_1_key_4' },
			{ name: "short_black", label: "Short name of BLACK", default: "BLK", no: 0 },
			{ name: "short_1", label: "Short name of input 1", default: "In 1", no: 1 },
			{ name: "short_2", label: "Short name of input 2", default: "In 2", no: 2 },
			{ name: "short_3", label: "Short name of input 3", default: "In 3", no: 3 },
			{ name: "short_4", label: "Short name of input 4", default: "In 4", no: 4 },
			{ name: "short_5", label: "Short name of input 5", default: "In 5", no: 5 },
			{ name: "short_6", label: "Short name of input 6", default: "In 6", no: 6 },
			{ name: "short_7", label: "Short name of input 7", default: "In 7", no: 7 },
			{ name: "short_8", label: "Short name of input 8", default: "In 8", no: 8 },
			{ name: "short_9", label: "Short name of input 9", default: "In 9", no: 9 },
			{ name: "short_10", label: "Short name of input 10", default: "In10", no: 10 },
			{ name: "short_11", label: "Short name of input 11", default: "In11", no: 11 },
			{ name: "short_12", label: "Short name of input 12", default: "In12", no: 12 },
			{ name: "short_13", label: "Short name of input 13", default: "In13", no: 13 },
			{ name: "short_14", label: "Short name of input 14", default: "In14", no: 14 },
			{ name: "short_15", label: "Short name of input 15", default: "In15", no: 15 },
			{ name: "short_16", label: "Short name of input 16", default: "In16", no: 16 },
			{ name: "short_17", label: "Short name of input 17", default: "In17", no: 17 },
			{ name: "short_18", label: "Short name of input 18", default: "In18", no: 18 },
			{ name: "short_19", label: "Short name of input 19", default: "In19", no: 19 },
			{ name: "short_20", label: "Short name of input 20", default: "In20", no: 20 },
			{ name: "short_still1", label: "Short name of Still 1", default: "STL1", no: 29 },
			{ name: "short_still2", label: "Short name of Still 2", default: "STL2", no: 30 },
			{ name: "short_still1key", label: "Short name of Still 1 Key", default: "STK1", no: 31 },
			{ name: "short_still2key", label: "Short name of Still 2 Key", default: "STK2", no: 32 },
			{ name: "short_chromakeyfill", label: "Short name of Chroma Key Fill", default: "CKFL", no: 40 },
			{ name: "short_chromakeykey", label: "Short name of Chroma Key Key", default: "CKKY", no: 41 },
			{ name: "short_subeffect1", label: "Short name of Sub Effect 1", default: "EFF1", no: 42 },
			{ name: "short_subeffect2", label: "Short name of Sub Effect 2", default: "EFF2", no: 43 },
			{ name: "short_matte1", label: "Short name of Matte 1", default: "MAT1", no: 38 },
			{ name: "short_matte2", label: "Short name of Matte 2", default: "MAT2", no: 39 },
			{ name: "short_colorbars", label: "Short name of Color Bars", default: "BARS", no: 37 },
			{ name: "short_program", label: "Short name of PROGRAM", default: "PGM", no: 46 },
			{ name: "short_preview", label: "Short name of PREVIEW", default: "PVW", no: 47 },
			{ name: "short_clean", label: "Short name of CLEAN", default: "CLN", no: 48 },
			{ name: "short_keyout", label: "Short name of KEY OUT", default: "MEKY", no: 49 },
			{ name: "short_multiview", label: "Short name of Multi-View", default: "MV", no: 50 },
			{ name: "short_aux1", label: "Short name of Aux 1", default: "Aux1", no: 240 },
			{ name: "short_aux2", label: "Short name of Aux 2", default: "Aux2", no: 241 },
			{ name: "short_aux3", label: "Short name of Aux 3", default: "Aux3", no: 242 },
			{ name: "short_aux4", label: "Short name of Aux 4", default: "Aux4", no: 243 },
			{ name: "short_aux5", label: "Short name of Aux 5", default: "Aux5", no: 244 },
			{ name: "short_aux6", label: "Short name of Aux 6", default: "Aux6", no: 245 },
			{ name: "short_aux7", label: "Short name of Aux 7", default: "Aux7", no: 246 },
			{ name: "short_aux8", label: "Short name of Aux 8", default: "Aux8", no: 247 }
		],
		MES: [
			{ id: 1, label: "ME 1" },
		],
		KEYS: [
			{ id: "1,1", label: "KEY 1" },
			{ id: "1,2", label: "KEY 2" },
			{ id: "1,3", label: "DSK 1" },
			{ id: "1,4", label: "DSK 2" },
		],
		get SOURCES_ME() {
			let sources = [
				// Built-in Inputs
				{ id: 1, label: "Source 1" },
				{ id: 2, label: "Source 2" },
				{ id: 3, label: "Source 3" },
				{ id: 4, label: "Source 4" },
				{ id: 5, label: "Source 5" },
				{ id: 6, label: "Source 6" },
				{ id: 7, label: "Source 7" },
				{ id: 8, label: "Source 8" },
				// Optional expansion card inputs
				{ id: 9, label: "Source 9" },
				{ id: 10, label: "Source 10" },
				{ id: 11, label: "Source 11" },
				{ id: 12, label: "Source 12" },
				{ id: 13, label: "Source 13" },
				{ id: 14, label: "Source 14" },
				{ id: 15, label: "Source 15" },
				{ id: 16, label: "Source 16" },
				{ id: 17, label: "Source 17" },
				{ id: 18, label: "Source 18" },
				{ id: 19, label: "Source 19" },
				{ id: 20, label: "Source 20" },
			];
			let system = [
				// System inputs
				{ id: 0, label: "Black" },
				{ id: 29, label: "Still 1" },
				{ id: 30, label: "Still 2" },
				{ id: 37, label: "Color Bars" },
				{ id: 38, label: "Matte 1" },
				{ id: 39, label: "Matte 2" },
				{ id: 40, label: "Color Key Fill" },
				{ id: 41, label: "Color Key Key" },
				{ id: 42, label: "Sub Effect 1" },
				{ id: 43, label: "Sub Effect 2" },
			];
			return sources.concat(
				system.sort((a, b) => (a.label > b.label ? 1 : -1))
			);
		},
		get SOURCES_AUX() {
			let additional = [
				// Additional AUX-only sources
				{ id: 46, label: "Program" },
				{ id: 47, label: "Preview" },
				{ id: 48, label: "Clean" },
				{ id: 50, label: "Multi-View" },
			];
			return this.SOURCES_ME.concat(
				additional.sort((a, b) => (a.label > b.label ? 1 : -1))
			);
		},
	},
};
