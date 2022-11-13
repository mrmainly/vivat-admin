const pathname = (params) => {
    switch (params.pathname) {
        case "/city":
            return "Города";
        case "/orders":
            return "Заказы";
        case "/products":
            return "Товары";
        case "/blog":
            return "Блог";
        case "/catalog":
            return "Тематические подборки";
        case "/stocks":
            return "Акции";
        // case "/analytics":
        //     return "Аналитика";
        case "/advantage-create":
            return "Создание наших преимуществ";
        case "/work":
            return "Вакансии";
        case "/users":
            return "Пользователи";
        case "/blog-create":
            return "Создание блога";
        case "/city-create":
            return "Создание города";
        case "/blog-detail":
            return "Редактирование блога";
        case "/work-create":
            return "Создание вакансии";
        case "/stock-create":
            return "Создание акции";
        case "/tags":
            return "Темы";
        case "/tags-create":
            return "Создание тегов";

        case "/catalog-create":
            return "Создание тематической подборки";
        case "/catalog-detail":
            return "Редактирование тематической подборки";
        case "/advantage":
            return "Наши преимущества";

        case "/advantage-detail":
            return "Редактирование наших преимуществ";
        default:
            return "";
    }
};

export default pathname;
