const fanoosSlogans = [
    "فانوسی برای عبور از مهِ خرافات",
    "در هجوم سایه‌ها، به نورِ ایمان تکیه کن",
    "پرسیدن عیب نیست، چشم‌بسته قبول کردن عیب است",
    "اسلام، آیینِ بیداری است؛ نه تکرارِ خفتگی",
    "توحید، راه رهایی از بندگیِ غیرِ خداست",
    "دینی که با «بخوان» آغاز شد، هرگز با جهل نمی‌ماند",
    "در بن‌بست‌ها، چشم به «فتاح» بدوز؛ او راهگشاست",
    "انرژی مثبت، همان «حسنِ ظن» به تدبیرِ پروردگار است",
    "شکرگزاری، کوتاه‌ترین مسیر برای تکثیرِ نعمت‌هاست",
    "حقیقت پشت پرده‌ی خرافه پنهان نمی‌ماند"
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