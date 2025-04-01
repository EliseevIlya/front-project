import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css"; // Не забудьте создать стили для страницы 404

function NotFoundPage() {
    const navigate = useNavigate();


    return (
        <body className="not-found-page">
    <div className="not-found-container">
        <div className="not-found-content">
                <img src="/src/icons/404error.png" alt="404" class="ghost-icon"/>
                <h2>Страница не найдена</h2>
                <p>Извините, но запрашиваемая вами страница не существует.</p>
                <button onClick={() => navigate("/")} className="go-home-button">
                    Вернуться на главную
                </button>
            </div>
        </div>
        </body>
    );
}

export default NotFoundPage;
