import win_ from '@src/typings/win';

const win:win_ = window

const eventsRegistered: any = {};

type origin = "barterLeft" | "barterRight" | "barterSearch" | "BarterLeftItem" | "BarterCenterItem" | "BarterLeftSelector" | "BarterCenter" | "AppBarter" | "BarterBottomRight" | "BarterBottomLeft";


async function isAlreadyRegistered(event: string, from: origin, fun:any) {
    

    Object.keys(eventsRegistered).forEach((key) => {
        
        if (eventsRegistered[key].event === event && eventsRegistered[key].from === from) {
            win.api.remove(event, fun);
            return true;
        }
    });

    return false;
}

function registerEvent(event: string, from: origin, fun: any) {
    if (isAlreadyRegistered(event, from, fun)) {
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
            console.log(`Barter item selected: ${icon}, ${tier}, ${item}`);
        }

        // On envoie l'item sélectionné au main process
        win.api.send('barterItemSelect', {icon: icon, tier: tier, name: item});

    },

    onBarterItemSelect(from: origin, fun: (icon: string, tier: number, name: string) => void) {
    
        if(registerEvent("barterItemSelect", from, (data:{icon: string, tier: number, name: string}) => { fun(data.icon, data.tier, data.name); })) {
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
            });
        }
    },

    totalValue(from: origin, value: number) {
        
        if (process.env.NODE_ENV === 'development') {
            console.log(`Total value: ${value}`);
        }

        win.api.send('total-value', {value: value});
    },

    onTotalValue(from: origin, fun: (value: number) => void) {
            
        if(registerEvent("total-value", from, (data:{value: number}) => { fun(data.value); })) {
            win.api.receive('total-value', (data:{value: number}) => {
                fun(data.value);
            });
        }
    },

    thresholdChange(from: origin, data:{name: "iliya" | "epheria" | "ancado", value: string}) {

        const value = parseInt(data.value);
        const name = data.name;

        if (process.env.NODE_ENV === 'development') {
            console.log(`Threshold change: ${name} => ${value}`);
        }

        win.api.send('threshold-change', {name: name, value: value});

    },

    onThresholdChange(from: origin, fun: (name: "iliya" | "epheria" | "ancado", value: number) => void) {

        if(registerEvent("threshold-change", from, (data:{name: "iliya" | "epheria" | "ancado", value: number}) => { fun(data.name, data.value); })) {
            win.api.receive('threshold-change', (data:{name: "iliya" | "epheria" | "ancado", value: number}) => {
                fun(data.name, data.value);
            });
        }
    }
}