// Quantamdev Admin Panel - Complete JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle Functionality
    const themeToggleButtons = document.querySelectorAll('[id^="themeToggle"]');
    const savedTheme = localStorage.getItem('qd-theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    themeToggleButtons.forEach(btn => {
        // Set initial icon based on theme
        const icon = btn.querySelector('i');
        if (icon && savedTheme === 'dark') {
            icon.className = 'fa fa-sun';
        }
        
        btn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('qd-theme', newTheme);
            
            // Update icon
            const icon = btn.querySelector('i');
            if (icon) {
                icon.className = newTheme === 'light' ? 'fa fa-moon' : 'fa fa-sun';
            }
        });
    });

    // Mobile Menu Functionality
    const mobileMenuBtns = document.querySelectorAll('[id^="mobileMenuBtn"]');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    
    if (mobileMenuBtns.length > 0 && sidebar) {
        mobileMenuBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                sidebar.classList.toggle('mobile-open');
                if (overlay) {
                    overlay.classList.toggle('active');
                }
                document.body.style.overflow = sidebar.classList.contains('mobile-open') ? 'hidden' : '';
            });
        });
    }

    // Close sidebar when clicking overlay
    if (overlay) {
        overlay.addEventListener('click', () => {
            if (sidebar) {
                sidebar.classList.remove('mobile-open');
            }
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Navigation functionality - SINGLE CLEAN VERSION
    const navItems = document.querySelectorAll('.nav-item');
    
    if (navItems.length > 0) {
        // Active page highlighting
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        navItems.forEach(item => {
            const href = item.getAttribute('href');
            
            // Set active class
            if (href === currentPage) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
            
            // Mobile close functionality
            item.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    if (sidebar) {
                        sidebar.classList.remove('mobile-open');
                    }
                    if (overlay) {
                        overlay.classList.remove('active');
                    }
                    document.body.style.overflow = '';
                }
            });
        });
    }

    // Mobile Search Functionality
    const searchContainers = document.querySelectorAll('.search');
    
    searchContainers.forEach(container => {
        const searchBtn = container.querySelector('.icon-btn');
        const searchInput = container.querySelector('input');
        
        if (searchBtn && searchInput) {
            searchBtn.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Close other open searches
                    searchContainers.forEach(otherContainer => {
                        if (otherContainer !== container) {
                            otherContainer.classList.remove('mobile-open');
                        }
                    });
                    
                    container.classList.toggle('mobile-open');
                    
                    if (container.classList.contains('mobile-open')) {
                        searchInput.focus();
                    }
                }
            });

            // Close search when pressing Escape
            searchInput.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    container.classList.remove('mobile-open');
                }
            });
        }
    });

    // Close search when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.search')) {
            searchContainers.forEach(container => {
                container.classList.remove('mobile-open');
            });
        }
    });

    // Sidebar Collapse for Desktop
    const collapseButtons = document.querySelectorAll('[id^="collapseBtn"]');
    
    collapseButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            if (window.innerWidth > 768) {
                const sidebar = document.querySelector('.sidebar');
                const main = document.querySelector('.main');
                if (sidebar && main) {
                    const isCollapsed = sidebar.classList.toggle('collapsed');
                    
                    if (isCollapsed) {
                        main.style.marginLeft = '96px';
                        document.querySelectorAll('.nav-item span, .brand-name').forEach(el => {
                            if (el) el.style.display = 'none';
                        });
                        const icon = btn.querySelector('i');
                        if (icon) icon.className = 'fa fa-angle-right';
                    } else {
                        main.style.marginLeft = '';
                        document.querySelectorAll('.nav-item span, .brand-name').forEach(el => {
                            if (el) el.style.display = 'inline';
                        });
                        const icon = btn.querySelector('i');
                        if (icon) icon.className = 'fa fa-angle-left';
                    }
                    
                    // Save sidebar state
                    localStorage.setItem('qd-sidebar-collapsed', isCollapsed);
                }
            }
        });
    });

    // Restore sidebar state
    const isSidebarCollapsed = localStorage.getItem('qd-sidebar-collapsed') === 'true';
    if (isSidebarCollapsed && window.innerWidth > 768) {
        const sidebar = document.querySelector('.sidebar');
        const main = document.querySelector('.main');
        const collapseBtn = document.querySelector('[id^="collapseBtn"]');
        if (sidebar && main && collapseBtn) {
            sidebar.classList.add('collapsed');
            main.style.marginLeft = '96px';
            document.querySelectorAll('.nav-item span, .brand-name').forEach(el => {
                if (el) el.style.display = 'none';
            });
            const icon = collapseBtn.querySelector('i');
            if (icon) icon.className = 'fa fa-angle-right';
        }
    }

    // Notifications Dropdown
    document.querySelectorAll('.dropdown .icon-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const menu = btn.nextElementSibling;
            if (menu && menu.classList.contains('dropdown-menu')) {
                // Close other dropdowns
                document.querySelectorAll('.dropdown-menu').forEach(otherMenu => {
                    if (otherMenu !== menu) {
                        otherMenu.classList.add('hidden');
                    }
                });
                menu.classList.toggle('hidden');
            }
        });
    });

    // User Menu
    const avatar = document.querySelector('.avatar');
    const userMenu = document.getElementById('userMenu');
    if (avatar && userMenu) {
        avatar.addEventListener('click', (e) => {
            e.stopPropagation();
            // Close other dropdowns
            document.querySelectorAll('.dropdown-menu').forEach(otherMenu => {
                otherMenu.classList.add('hidden');
            });
            userMenu.classList.toggle('hidden');
        });
    }

    // Close all dropdowns when clicking outside
    document.addEventListener('click', () => {
        document.querySelectorAll('.dropdown-menu, .user-menu').forEach(menu => {
            menu.classList.add('hidden');
        });
    });

    // Search functionality
    const searchInputs = document.querySelectorAll('.search input');
    searchInputs.forEach(input => {
        input.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            console.log('Searching for:', searchTerm);
        });
        
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                console.log('Performing search for:', this.value);
            }
        });
    });

    // Settings Form Handling
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Profile settings saved successfully!');
        });
    }

    // Compact Sidebar Preference
    const compactSidebar = document.getElementById('compactSidebar');
    if (compactSidebar) {
        compactSidebar.checked = localStorage.getItem('qd-sidebar-collapsed') === 'true';
        compactSidebar.addEventListener('change', function() {
            localStorage.setItem('qd-sidebar-collapsed', this.checked);
            const sidebar = document.querySelector('.sidebar');
            const main = document.querySelector('.main');
            if (this.checked && window.innerWidth > 768 && sidebar && main) {
                sidebar.classList.add('collapsed');
                main.style.marginLeft = '96px';
            } else if (window.innerWidth > 768 && sidebar && main) {
                sidebar.classList.remove('collapsed');
                main.style.marginLeft = '';
            }
        });
    }

    // Logout Confirmation
    const confirmLogout = document.getElementById('confirmLogout');
    if (confirmLogout) {
        confirmLogout.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('Are you sure you want to logout?')) {
                // Show loading state
                this.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Logging out...';
                this.disabled = true;
                
                // Simulate logout process
                setTimeout(() => {
                    alert('You have been successfully logged out!');
                    window.location.href = 'index.html';
                }, 1500);
            }
        });
    }

    // Initialize Charts
    initCharts();

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Auto-close mobile search when resizing to larger screen
            if (window.innerWidth > 768) {
                searchContainers.forEach(container => {
                    container.classList.remove('mobile-open');
                });
            }
            
            // Auto-close mobile sidebar when resizing to larger screen
            if (window.innerWidth > 768 && sidebar) {
                sidebar.classList.remove('mobile-open');
                if (overlay) {
                    overlay.classList.remove('active');
                }
                document.body.style.overflow = '';
            }
        }, 250);
    });
});

// Charts Initialization
function initCharts() {
    // Check if Chart.js is already loaded
    if (typeof Chart !== 'undefined') {
        createAllCharts();
    } else {
        // Load Chart.js dynamically
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
        script.onload = createAllCharts;
        script.onerror = function() {
            console.log('Failed to load Chart.js');
        };
        document.head.appendChild(script);
    }
}

function createAllCharts() {
    // Check if Chart is available
    if (typeof Chart === 'undefined') {
        console.log('Chart.js not available');
        return;
    }

    // Dashboard Bar Chart
    const barChart = document.getElementById('barChart');
    if (barChart) {
        new Chart(barChart, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
                datasets: [
                    {
                        label: 'Revenue',
                        data: [12000, 15000, 9000, 20000, 18000, 22000, 24000, 26000, 28000, 30000],
                        backgroundColor: '#0E987E'
                    },
                    {
                        label: 'New Projects',
                        data: [2, 3, 1, 4, 3, 5, 4, 6, 5, 7],
                        backgroundColor: 'rgba(14,152,126,0.3)'
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
    
    // Dashboard Pie Chart
    const pieChart = document.getElementById('pieChart');
    if (pieChart) {
        new Chart(pieChart, {
            type: 'pie',
            data: {
                labels: ['Development', 'Design', 'QA', 'Consulting'],
                datasets: [{
                    data: [45, 25, 15, 15],
                    backgroundColor: ['#0E987E', '#2BCFA3', '#F6C85F', '#FF8A80']
                }]
            },
            options: {
                responsive: true
            }
        });
    }
    
    // Projects Pie Chart
    const projectsPie = document.getElementById('projectsPie');
    if (projectsPie) {
        new Chart(projectsPie, {
            type: 'pie',
            data: {
                labels: ['Active', 'On Hold', 'Completed'],
                datasets: [{
                    data: [12, 6, 8],
                    backgroundColor: ['#0E987E', '#F6C85F', '#2BCFA3']
                }]
            },
            options: {
                responsive: true
            }
        });
    }
    
    // Clients Line Chart
    const clientsLine = document.getElementById('clientsLine');
    if (clientsLine) {
        new Chart(clientsLine, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
                datasets: [{
                    label: 'Revenue',
                    data: [4000, 4800, 3000, 5600, 7200],
                    borderColor: '#0E987E',
                    tension: 0.3,
                    fill: false
                }]
            },
            options: {
                responsive: true
            }
        });
    }
    
    // Team Bar Chart
    const teamBar = document.getElementById('teamBar');
    if (teamBar) {
        new Chart(teamBar, {
            type: 'bar',
            data: {
                labels: ['Priya', 'Rahul', 'Anita'],
                datasets: [{
                    label: 'Tasks Completed',
                    data: [24, 18, 30],
                    backgroundColor: '#0E987E'
                }]
            },
            options: {
                responsive: true
            }
        });
    }
    
    // Reports Line Chart
    const reportsLine = document.getElementById('reportsLine');
    if (reportsLine) {
        new Chart(reportsLine, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
                datasets: [{
                    label: 'Revenue',
                    data: [4000, 5000, 4500, 6000, 7200],
                    borderColor: '#0E987E',
                    tension: 0.3,
                    fill: false
                }]
            },
            options: {
                responsive: true
            }
        });
    }
    
    // Reports Pie Chart
    const reportsPie = document.getElementById('reportsPie');
    if (reportsPie) {
        new Chart(reportsPie, {
            type: 'pie',
            data: {
                labels: ['Web', 'Mobile', 'Cloud', 'Design'],
                datasets: [{
                    data: [40, 30, 20, 10],
                    backgroundColor: ['#0E987E', '#2BCFA3', '#F6C85F', '#FF8A80']
                }]
            },
            options: {
                responsive: true
            }
        });
    }
}