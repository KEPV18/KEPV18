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

// إخفاء الصورة وتغيير خصائص الهيدر عند التمرير
window.addEventListener('scroll', function() {
    var header = document.querySelector('header');
    var logoImage = document.querySelector('header img');
    var scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollPosition > 100) { // يمكنك تعديل هذه القيمة بناءً على احتياجاتك
        logoImage.style.display = 'none'; // إخفاء الصورة
        header.style.height = '75px'; // تقليل ارتفاع الهيدر
        header.style.backgroundColor = '#1bc075'; // تغيير لون الخلفية إذا لزم الأمر
    } else {
        logoImage.style.display = 'block'; // إظهار الصورة
        header.style.height = 'auto'; // إعادة ارتفاع الهيدر
        header.style.backgroundColor = 'transparent'; // إعادة لون الخلفية
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
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            console.log('Service Worker registered with scope:', registration.scope);
        }).catch(function(error) {
            console.log('Service Worker registration failed:', error);
        });
    });
}

// التبديل بين اللغات عند النقر على زر تغيير اللغة
const langToggle = document.getElementById('lang-toggle');

// تحديد سلوك الزر عند لنقر
langToggle.addEventListener('click', function() {
    // الحصول على اسم الصفحة الحالية
    const currentPage = window.location.href;
    // إذا كان اسم الصفحة index.html فقم بتبديله إلى index-ar.html والعكس صحيح
    const newPage = currentPage.includes('index.html') ? 'index-ar.html' : 'index.html';
    // تحميل الصفحة الجديدة
    window.location.href = newPage;
});

// إدارة الكاش في Service Worker لتسريع تحميل الصفحة
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
