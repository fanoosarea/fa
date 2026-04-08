const fanoosSlogans = [
    "جایی برای درنگ و آگاهی.",
    "نوری در تاریکی کلمات.",
    "سادگی، زیباترین شکل هوشمندی است.",
    "هر کلمه، نوری است در مسیر.",
    "درنگ کن، شاید حقیقتی اینجاست.",
    "آگاهی، آغاز آزادی است.",
    "فانوس، همراه لحظه‌های سکوت شما.",
    "کمی عمیق‌تر بخوانیم.",
    "جستجوی معنا در دنیای شلوغ.",
    "بازتاب نور در آینه کلمات."
];

function setRandomSlogan() {
    // این قسمت متن زیر کلمه فانوس را پیدا می‌کند
    const sloganElement = document.querySelector('header p'); 
    if (sloganElement && fanoosSlogans.length > 0) {
        const randomIndex = Math.floor(Math.random() * fanoosSlogans.length);
        sloganElement.innerText = fanoosSlogans[randomIndex];
    }
}

// اجرای تابع به محض لود شدن صفحه
document.addEventListener('DOMContentLoaded', setRandomSlogan);