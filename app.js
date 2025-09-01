import Chart from 'chart.js/auto';
import L from 'leaflet';

document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Menu Toggle for index.html ---
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // --- Dashboard Sidebar Toggle ---
    const dashboardToggle = document.querySelector('.dashboard-toggle');
    const sidebar = document.querySelector('.sidebar');

    if (dashboardToggle && sidebar) {
        dashboardToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            dashboardToggle.classList.toggle('active');
        });

        // Optional: Close sidebar when clicking outside on mobile
        document.addEventListener('click', (event) => {
            const isClickInsideSidebar = sidebar.contains(event.target);
            const isClickOnToggle = dashboardToggle.contains(event.target);

            if (!isClickInsideSidebar && !isClickOnToggle && sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
                dashboardToggle.classList.remove('active');
            }
        });
    }

    // --- Dashboard Chart ---
    const attendanceChartCanvas = document.getElementById('attendanceChart');
    if (attendanceChartCanvas) {
        const ctx = attendanceChartCanvas.getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
                datasets: [{
                    label: 'Presença de Alunos',
                    data: [120, 125, 122, 126, 128, 118],
                    backgroundColor: 'rgba(0, 87, 255, 0.1)',
                    borderColor: 'rgba(0, 87, 255, 1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: false
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    // --- Dashboard Map (Leaflet) ---
    const mapElement = document.getElementById('map');
    if (mapElement) {
        // Prevent map from re-initializing on hot-reloads in dev
        if (!mapElement._leaflet_id) { 
            const map = L.map('map').setView([-23.55052, -46.633308], 12); // São Paulo coordinates

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            // Mock bus locations
            const busLocations = [
                { lat: -23.54, lng: -46.63, name: "Rota 1" },
                { lat: -23.56, lng: -46.65, name: "Rota 2" },
                { lat: -23.57, lng: -46.62, name: "Rota 3" },
            ];
            
            // Custom bus icon
            const busIcon = L.icon({
                iconUrl: 'logo.png',
                iconSize: [38, 38], 
                iconAnchor: [19, 19],
                popupAnchor: [0, -20]
            });

            busLocations.forEach(bus => {
                L.marker([bus.lat, bus.lng], {icon: busIcon}).addTo(map)
                    .bindPopup(`<b>${bus.name}</b><br>Ônibus em movimento.`);
            });
        }
    }

});