export function orderStatusEnumToWord(status) {
    const m = {
        "Created": "Criado",
        "Scheduled": "Agendado",
        "PickedUp": "Coletado",
        "Canceled": "Cancelado",
    }

    return m[status];
}

export function orderTypeEnumToWord(type) {
    const m = {
        "Consumable": "Consumível",
        "Recyclable": "Reciclável",
    }

    return m[type];
}