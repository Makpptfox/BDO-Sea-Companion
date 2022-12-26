import win_ from '@src/typings/win';

const win:win_ = window

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const eventsRegistered: any = {};

type origin = "appRenderer" | "barterLeft" | "barterRight" | "barterSearch" | "BarterLeftItem" | "BarterCenterItem" | "BarterLeftSelector" | "BarterCenter" | "AppBarter" | "BarterBottomRight" | "BarterBottomLeft" | "windowControls";


async function isAlreadyRegistered(event: string, from: origin) {
    

    Object.keys(eventsRegistered).forEach((key) => {
        
        if (eventsRegistered[key].event === event && eventsRegistered[key].from === from) {
            win.api.remove(event, eventsRegistered[key].func);
            return true;
        }
    });

    return false;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function registerEvent(event: string, from: origin, fun: any) {
    if (isAlreadyRegistered(event, from)) {
        console.trace(`Event ${event} already registered from ${from}!`)
    }
    eventsRegistered[from]=({event: event, from: from, func: fun});

    return true;
}

// TODO: Déplacer TOUS les événements des barters dans ce fichier

export const barterEventManager = {
    barterItemSelect(from: origin, icon: string, tier: number, item: string) {
        
        // Si en dév, on affiche les infos de l'item
        if (process.env.NODE_ENV === 'development') {
            console.trace(`Barter item selected: ${icon}, ${tier}, ${item}`);
        }

        // On envoie l'item sélectionné au main process
        win.api.send('barterItemSelect', {icon: icon, tier: tier, name: item});

    },

    onBarterItemSelect(from: origin, fun: (icon: string, tier: number, name: string) => void) {
    
        if(registerEvent("barterItemSelect", from, (data:{icon: string, tier: number, name: string}) => { fun(data.icon, data.tier, data.name); })) {
            win.api.removeAll('barterItemSelect')
            win.api.receive('barterItemSelect', (data:{icon: string, tier: number, name: string}) => {

                fun(data.icon, data.tier, data.name);
            });
        }
    
    },

    barterSearch(from: origin, search: string) {
        win.api.send('search-barter', {search: search});
    },

    onBarterSearch(from: origin, fun: (search: string) => void) {

        if(registerEvent("search-barter", from, (data:{search: string}) => { fun(data.search); })) {
            win.api.remove('search-barter', fun)
            win.api.receive('search-barter', (data:{search: string}) => {
                fun(data.search);
            });
        }
    },

    saveItem(from: origin, key: string, value: number, type: "iliya" | "epheria" | "ancado") {
        win.api.send('save-item', {key: key, value: value, type: type});
    },

    onHideColBarter(from: origin, fun: (hide: boolean, type: "iliya" | "epheria" | "ancado") => void) {
            
        if(registerEvent("r_hide-col-barter", from, (data:{hide: boolean, type: "iliya" | "epheria" | "ancado"}) => { fun(data.hide, data.type); })) {
            win.api.receive('r_hide-col-barter', (data:{hide: boolean, type: "iliya" | "epheria" | "ancado"}) => {
                fun(data.hide, data.type);
                win.api.removeAll('r_hide-col-barter')
            });
        }
    },

    totalValue(from: origin, value: number) {
        new Promise((resolve) => {
            if (process.env.NODE_ENV === 'development') {
                console.trace(`Total value: ${value}`);
            }

            win.api.send('total-value', {value: value});
            resolve(true);
        })
    },

    onTotalValue(from: origin, fun: (value: number) => void) {
        
        
        if(registerEvent("total-value", from, (data:{value: number}) => { fun(data.value); })) {
            win.api.receive('total-value', (data:{value: number}) => {
                win.api.removeAll('total-value')
                fun(data.value);
            });
        }
    },

    thresholdChange(from: origin, data:{name: "iliya" | "epheria" | "ancado", value: string}) {

        const value = parseInt(data.value);
        const name = data.name;

        if (process.env.NODE_ENV === 'development') {
            console.trace(`Threshold change: ${name} => ${value}`);
        }

        win.api.send('threshold-change', {name: name, value: value});

    },

    onThresholdChange(from: origin, fun: (name: "iliya" | "epheria" | "ancado", value: number) => void) {

        if(registerEvent("threshold-change", from, (data:{name: "iliya" | "epheria" | "ancado", value: number}) => { fun(data.name, data.value); })) {
            win.api.receive('threshold-change', (data:{name: "iliya" | "epheria" | "ancado", value: number}) => {
                fun(data.name, data.value);
            });
        }
    },

    thresholdWarning(from: origin, data:{name: "iliya" | "epheria" | "ancado"}) {

        const name = data.name;

        if (process.env.NODE_ENV === 'development') {
            console.trace(`Threshold warning: ${name}`);
        }

        win.api.send('threshold-warning', {name: name});

    },

    onThresholdWarning(from: origin, fun: (name: "iliya" | "epheria" | "ancado") => void) {

        if(registerEvent("threshold-warning", from, (data:{name: "iliya" | "epheria" | "ancado"}) => { fun(data.name); })) {
            win.api.receive('threshold-warning', (data:{name: "iliya" | "epheria" | "ancado"}) => {
                fun(data.name);
            });
        }
    },

    checkThreshold(from: origin, data:{name: "iliya" | "epheria" | "ancado"}) {
        const name = data.name;

        if (process.env.NODE_ENV === 'development') {
            console.trace(`Check threshold: ${name}`);
        }

        win.api.send('check-threshold', {name: name});

    },

    onCheckThreshold(from: origin, fun: (name: "iliya" | "epheria" | "ancado") => void) {

        if(registerEvent("check-threshold", from, (data:{name: "iliya" | "epheria" | "ancado"}) => { fun(data.name); })) {
            win.api.receive('check-threshold', (data:{name: "iliya" | "epheria" | "ancado"}) => {
                fun(data.name);
            });
        }
    },

    askCheckThreshold(from: origin, data:{name: "iliya" | "epheria" | "ancado"}) {
            
        const name = data.name;

        if (process.env.NODE_ENV === 'development') {
            console.trace(`Ask check threshold: ${name}}`);
        }

        win.api.send('ask-check-threshold', {name: name});

    },

    onAskCheckThreshold(from: origin, fun: (name: "iliya" | "epheria" | "ancado") => void) {
        
        if(registerEvent("ask-check-threshold", from, (data:{name: "iliya" | "epheria" | "ancado"}) => { fun(data.name); })) {
            win.api.receive('ask-check-threshold', (data:{name: "iliya" | "epheria" | "ancado"}) => {
                fun(data.name);
            });
        }
    },

    onAppMaximizeReply(from: origin, fun: (maximized: boolean) => void) {
        if(registerEvent("app-maximize-reply", from, (data:{maximize: boolean}) => { fun(data.maximize); })) {
            win.api.receive('app-maximize-reply', (data:{maximize: boolean}) => {
                fun(data.maximize);
            });
        }
    },

    setLang(from: origin, lang: string) {
        win.api.send('set-lang', {lang: lang});
    },

    onSetLang(from: origin, fun: (lang: string) => void) {
        if(registerEvent("set-lang", from, (data:{lang: string}) => { fun(data.lang); })) {
            win.api.receive('set-lang', (data:{lang: string}) => {
                fun(data.lang);
            });
        }
    }
}