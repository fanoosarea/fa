const SHEET_API_URL = "https://script.googleusercontent.com/macros/echo?user_content_key=AWDtjMXsvYxcZElwr7tmc6R4ZKtm3IRDpCdSE0uDzJeIXnP5xioSROq2OCp9n7sYu4kiy_Hdd8v3niREw2GFen50FAppNvuKRQRt-ZfMIC_gsrshTu3OlR_Smdd0MpmXu8XHaU6hUpnmG9YLAlsOQtk5uAPVqQGzxaxaErLbYkFC0v3XcL1YAO2mJNd9IStMW620RQK1ndZoWsj1Nc6xVFabqlJfSCctOcI5BnEkqlJkH2ioHqF2xGth_s3rPo1LhccezWEnilLzlzLWVCQOQH0&lib=MW_jymRbi8bNJxFwP9YWfX9Uj6pQy2WoH"; 
let posts = [];

async function fetchPosts() {
    try {
        const res = await fetch(SHEET_API_URL);
        const data = await res.json();
        // مشکل انتشار: معکوس کردن لیست برای نمایش جدیدترین‌ها در اول
        posts = data.reverse(); 
        createDynamicCategories(); 
        renderPosts('همه');
    } catch (e) {
        console.error("خطا در دریافت اطلاعات");
    }
}

function createDynamicCategories() {
    const container = document.getElementById('dynamic-cats');
    const tags = ['همه', ...new Set(posts.map(p => p.tag))];
    container.innerHTML = tags.map(tag => `
        <div class="cat-btn ${tag === 'همه' ? 'active' : ''}" onclick="filterCat(this, '${tag}')">
            ${tag}
        </div>
    `).join('');
}

function renderPosts(filter = 'همه') {
    const container = document.getElementById('content-area');
    const filtered = filter === 'همه' ? posts : posts.filter(p => p.tag === filter);
    
    container.innerHTML = filtered.map(p => `
        <article class="glass-card">
            <div class="mb-5"><span class="tag">${p.tag}</span></div>
            <p class="text-2xl leading-[1.8] font-medium opacity-90 mb-8">${p.content}</p>
            <div class="flex justify-end pt-5 border-t border-black/5 dark:border-white/5">
                <button onclick="share('${p.content.replace(/'/g, "\\'")}')" class="text-[var(--main-accent)] opacity-40 hover:opacity-100 p-1">
                    <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>
                </button>
            </div>
        </article>
    `).join('');
}

function filterCat(btn, tag) {
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderPosts(tag);
    closePanels();
}

function handleNav(action) {
    if (action === 'theme') {
        toggleDark();
        return;
    }
    
    const isAlreadyOpen = document.getElementById(action === 'categories' ? 'category-panel' : 'color-panel')?.classList.contains('show');

    closePanels();

    if (!isAlreadyOpen) {
        if (action === 'home') {
            document.getElementById('nav-home').classList.add('active');
            renderPosts('همه');
        } else if (action === 'categories') {
            document.getElementById('nav-cats').classList.add('active');
            document.getElementById('category-panel').classList.add('show');
            document.body.style.overflow = 'hidden'; // جلوگیری از اسکرول صفحه زیرین
        } else if (action === 'colors') {
            document.getElementById('nav-colors').classList.add('active');
            document.getElementById('color-panel').classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    }
}

function closePanels() {
    document.querySelectorAll('.panel-popup').forEach(p => p.classList.remove('show'));
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    document.body.style.overflow = ''; // برگشت اسکرول صفحه
}

function toggleDark() {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    document.getElementById('theme-sun').classList.toggle('hidden', isDark);
    document.getElementById('theme-moon').classList.toggle('hidden', !isDark);
}

function openAbout() { document.getElementById('about-overlay').classList.add('show'); }
function closeAbout() { document.getElementById('about-overlay').classList.remove('show'); }

function setTheme(bg, accent, text) {
    document.documentElement.style.setProperty('--main-bg', bg);
    document.documentElement.style.setProperty('--main-accent', accent);
    document.documentElement.style.setProperty('--main-text', text);
    closePanels();
    document.getElementById('nav-home').classList.add('active');
}

function share(text) {
    const shareMessage = `${text}\n---------------------------\nهمراه ما باشید در:\nاینستاگرام: https://www.instagram.com/fanoosarea\nتلگرام: https://t.me/fanoosarea\nتیک تاک: https://www.tiktok.com/@fanoosarea`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(shareMessage).then(() => showToast("کپی شد!"));
    }
}

function showToast(message) {
    const old = document.querySelector('.toast-msg');
    if (old) old.remove();
    const toast = document.createElement('div');
    toast.className = 'toast-msg';
    toast.innerText = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 50);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, 2500);
}

// بستن پنل با کلیک روی فضای خالی (اصلاح شده)
window.addEventListener('mousedown', function(e) {
    const panels = document.querySelectorAll('.panel-popup');
    const navItems = document.querySelectorAll('.nav-item');
    
    let clickedInsidePanel = false;
    panels.forEach(p => { if(p.contains(e.target)) clickedInsidePanel = true; });
    
    let clickedNav = false;
    navItems.forEach(n => { if(n.contains(e.target)) clickedNav = true; });

    if (!clickedInsidePanel && !clickedNav) {
        closePanels();
    }
});

window.onload = fetchPosts;