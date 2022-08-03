export const translationStatus = (name) => {
    switch (name) {
        case "NEW":
            return "Новый";
            break;
        case "REGISTERED":
            return "Зарегистрирован";
            break;
        case "RESERVEDPARTIALLY":
            return "Зарезервирован частично";
            break;
        case "CANCELLED":
            return "Отменено";
            break;
        case "READYTOPICKUP":
            return "Готов к выдаче";
            break;
        case "COMPLETED":
            return "Завершен";
            break;
        case "REJECTED":
            return "‘Отклонен’";
    }
};

export const translationDelivery = (name) => {
    switch (name) {
        case "DELIVERY":
            return "Доставка курьером";
        case "PICKUP":
            return "Самовывоз";
    }
};

export const translationPayment = (name) => {
    switch (name) {
        case "CARD":
            return "Картой онлайн при получении";
        case "CASH":
            return "Наличными при получении";
    }
};
