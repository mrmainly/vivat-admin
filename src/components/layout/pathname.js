const pathname = (params) => {
    switch (params.pathname) {
        case "/orders":
            return "Заказы";
        case "/blog":
            return "Блог";
        case "/stocks":
            return "Акции";
        case "/analytics":
            return "Аналитика";
        case "/blog-create":
            return "Создание блога";
        case "/city":
            return "Города";
        case "/city-create":
            return "Создание города";
        case "/blog-detail":
            return "Редактирование блога";
        case "/users":
            return "Пользователи";
        case "/work":
            return "Вакансии";
        case "/work-create":
            return "Создание вакансии";
        case "/stock-create":
            return "Создание акции";
        case "/tags":
            return "Теги";
        case "/tags-create":
            return "Создание тегов";
        case "/products":
            return "Товары";
        case "/catalog":
            return "Тематические подборки";
        case "/catalog-create":
            return "Создание тематической подборки";
        case "/catalog-detail":
            return "Редактирование тематической подборки";
        default:
            return "";
    }
};

export default pathname;
