import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css"; // Не забудьте создать стили для страницы 404

function NotAccessPage() {
    const navigate = useNavigate();


    return (
        <body className="not-found-page">
        <div className="not-found-container">
            <div className="not-found-content">
                <h1> 4 <img src="/src/icons/403error.png" alt="0" class="wheel-icon"/> 3 </h1>
                <h2>Страница не доступна</h2>
                <p>Извините, но запрашиваемая вами страница не доступна.</p>
                <button onClick={() => navigate("/")} className="go-home-button">
                    Вернуться на главную
                </button>
            </div>
        </div>
        </body>
    );
}

export default NotAccessPage;
