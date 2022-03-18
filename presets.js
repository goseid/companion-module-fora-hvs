module.exports = {
    getPresets: (config) => {
        const presets = [];
        config.AUXES.forEach(aux => {
            config.SOURCES_AUX.forEach(source => {
                presets.push({
                    category: aux.label,
                    label: `${source.label} button for ${aux.label}`,
                    bank: {
                        style: 'text',
                        text: `$(fora:long_${source.label.toLowerCase().replace(/ /g, '')})`,
                        size: '18',
                        color: '0',
                        bgcolor: '12632319'
                    },
                    feedbacks: [{
                        type: "aux_src",
                        options: {
                            aux: aux.id,
                            source: source.id,
                        },
                        style: {
                            bgcolor: '255',
                            color: '16777215',
                        },
                    }],
                    actions: [{
                        action: "xpt_aux",
                        options: {
                            aux: aux.id,
                            source: source.id
                        }
                    }]
                });
            });
        });
        config.MES.forEach(ME => {
            config.SOURCES_ME.forEach(source => {
                presets.push({
                    category: `${ME.label} PVW`,
                    label: `${source.label} button for ${ME.label} PVW`,
                    bank: {
                        style: 'text',
                        text: `$(fora:long_${source.label.toLowerCase().replace(/ /g, '')})`,
                        size: '18',
                        color: '0',
                        bgcolor: '15663086'
                    },
                    feedbacks: [{
                        type: "me_pvw_src",
                        options: {
                            me: ME.id,
                            source: source.id,
                        },
                        style: {
                            bgcolor: '65280',
                            color: '0',
                        },
                    }],
                    actions: [{
                        action: "xpt_me",
                        options: {
                            me: ME.id,
                            layer: 'B',
                            source: source.id
                        }
                    }]
                });
            });
            config.SOURCES_ME.forEach(source => {
                presets.push({
                    category: `${ME.label} PGM`,
                    label: `${source.label} button for ${ME.label} PGM`,
                    bank: {
                        style: 'text',
                        text: `$(fora:long_${source.label.toLowerCase().replace(/ /g, '')})`,
                        size: '18',
                        color: '0',
                        bgcolor: '16772846'
                    },
                    feedbacks: [{
                        type: "me_pgm_src",
                        options: {
                            me: ME.id,
                            source: source.id,
                        },
                        style: {
                            bgcolor: '16711680',
                            color: '16777215',
                        },
                    }],
                    actions: [{
                        action: "xpt_me",
                        options: {
                            me: ME.id,
                            layer: 'A',
                            source: source.id
                        }
                    }]
                });
            });
        });
        config.KEYS.forEach(keyer => {
            const keyerNo = parseInt(keyer.id.split(",").pop());
            presets.push({
                category: 'Keyers',
                label: `Toggle ${keyer.label}`,
                bank: {
                    style: 'text',
                    text: `${keyer.label}\\n$(fora:me_1_key_${keyerNo}_src)`,
                    size: '18',
                    color: '16744448',
                    bgcolor: '0'
                },
                feedbacks: [{
                    type: "key_active",
                    options: {
                        me: 1,
                        keyer: keyerNo,
                    },
                    style: {
                        bgcolor: '16711680',
                        color: '16777215',
                    },
                }],
                actions: [{
                    action: "trans_key",
                    options: {
                        type: "AUTO",
                        key: keyer.id,
                    }
                }]
        });
        });
        config.AUXES.forEach(aux => {
            presets.push({
                category: 'Pages',
                label: `Set Companion to ${aux.label} page`,
                bank: {
                    style: 'text',
                    text: `$(fora:short_${aux.label.toLowerCase().replace(/ /g, '')})\\n`
                        + `$(fora:aux${aux.id}_source)`,
                    size: '18',
                    color: '255',
                    bgcolor: '0'
                },
            });
        });
        config.AUXES.forEach(aux => {
            presets.push({
                category: 'Pages',
                label: `${aux.label} page active`,
                bank: {
                    style: 'text',
                    text: `$(fora:short_${aux.label.toLowerCase().replace(/ /g, '')})\\n`
                        + `$(fora:aux${aux.id}_source)`,
                    size: '18',
                    color: '0',
                    bgcolor: '255'
                },
            });
        });
        // config.KEYS.forEach(keyer => {
        //     presets.push({
        //         category: 'Keyers',
        //         label: `Toggle ${keyer.label}`,
        //         bank: {
        //             style: 'text',
        //             text: `${keyer.label}\\n$(fora:${keyer.label.toLowerCase().replace(/ /g, '')})`,
        //             size: '18',
        //             color: '16744448',
        //             bgcolor: '0'
        //         },
        //     });
        //     presets.push({
        //         category: 'Keyers',
        //         label: `${keyer.label} page active`,
        //         bank: {
        //             style: 'text',
        //             text: `${keyer.label}\\n$(fora:${keyer.label.toLowerCase().replace(/ /g, '')})`,
        //             size: '18',
        //             color: '0',
        //             bgcolor: '16744448'
        //         },
        //     });
        // });
        config.MES.forEach(ME => {
            presets.push({
                category: 'Pages',
                label: `Set Companion to ${ME.label} page`,
                bank: {
                    style: 'text',
                    text: `${ME.label}\\n$(fora:me${ME.id}_pgm_source)`,
                    size: '18',
                    color: '16711680',
                    bgcolor: '0'
                },
            });
            presets.push({
                category: 'Pages',
                label: `${ME.label} page active`,
                bank: {
                    style: 'text',
                    text: `${ME.label}\\n$(fora:me${ME.id}_pgm_source)`,
                    size: '18',
                    color: '0',
                    bgcolor: '16711680'
                },
            });
        });

        return presets;
    }
}