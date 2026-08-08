export function initRouter() {
    const allViews = document.querySelectorAll('.app-view');
    const navButtons = document.querySelectorAll('.nav-btn');

    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const targetView = document.getElementById(targetId);
            if (targetView) {
                allViews.forEach(view => view.classList.add('hidden'));
                targetView.classList.remove('hidden');
            } else {
                console.error(`Router error: View with ID '${targetId}' not found.`);
            }
        })

    })
}