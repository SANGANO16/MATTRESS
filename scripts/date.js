document.addEventListener('DOMContentLoaded', function() {
    const now = document.getElementById("date");
    const today = new Date();
    now.innerHTML = new Intl.DateTimeFormat('en-US', {dateStyle: 'full'}).format(today);
});