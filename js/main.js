// إدارة التمرير وتغيير حجم الهيدر بناءً على موقع التمرير
let lastKnownScrollPosition = 0;
let ticking = false;

// وظيفة لتعديل خصائص الهيدر بناءً على موقع التمرير
function adjustHeader(scrollPos) {
    const header = document.querySelector('header');
    const logoImage = document.querySelector('header img');

    // تطبيق الشروط لتغيير حجم الهيدر وإخفاء الصورة
    if (scrollPos > 100) {
        header.classList.add('small-header');
        logoImage.style.display = 'none';
        header.style.position = 'fixed';
        header.style.top = '0';
        header.style.width = '100%';
    } else {
        header.classList.remove('small-header');
        logoImage.style.display = 'block';
        header.style.position = 'relative'; // يعود الهيدر للوضع الطبيعي
    }
}

// معالج الحدث للتمرير
window.addEventListener('scroll', function(e) {
    lastKnownScrollPosition = window.scrollY;

    if (!ticking) {
        window.requestAnimationFrame(function() {
            adjustHeader(lastKnownScrollPosition);
            ticking = false;
        });

        ticking = true;
    }
});

// تنفيذ التنقل السلس للروابط
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// تسجيل Service Worker لتحسين تحميل الصفحة وتوفير المحتوى في حالات عدم الاتصال
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

// التبديل بين اللغات عند النقر على زر تغيير اللغة
document.addEventListener('DOMContentLoaded', function() {
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', function() {
            const currentPage = window.location.href;
            const newPage = currentPage.includes('index.html') ? 'index-ar.html' : 'index.html';
            window.location.href = newPage;
        });
    } else {
        console.log('العنصر غير موجود');
    }
});

// إارة الكاش في Service Worker لتسريع تحميل الصفحة
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('v1').then(function(cache) {
            return cache.addAll([
                '/',
                '/css/styles.css',
                '/image/2.jpg',
                '/image/1.png',
                '/image/2.png',
                '/image/3.png',
                '/image/4.png',
                '/js/script.js'
            ]);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});

// تطبيق التحميل المتأخر للصور
document.querySelectorAll('img').forEach(img => {
    img.setAttribute('loading', 'lazy');
});

// تأكيد استخدام HTTPS
if (location.protocol !== 'https:') {
    location.replace(`https:${location.href.substring(location.protocol.length)}`);
}

// تقييد الوصول إلى الصفحات الإدارية
if (document.location.pathname.includes('/admin')) {
    // تحقق من وجود توكن الأمان أو إعادة توجيه إلى صفحة الدخول
    if (!sessionStorage.getItem('adminToken')) {
        window.location.href = '/login.html';
    }
}

// تطبيق تدابير الحماية ضد XSS
function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

document.querySelectorAll('input[type="text"]').forEach(input => {
    input.addEventListener('input', function() {
        this.value = sanitizeInput(this.value);
    });
});


document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('img').forEach(img => {
        new Compressor(img, {
            quality: 0.6, // ضبط جودة الصورة
            success(result) {
                const reader = new FileReader();
                reader.readAsDataURL(result);
                reader.onloadend = function() {
                    img.src = reader.result;
                };
            },
        });
    });
});
