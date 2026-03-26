/* ========================================
   Portfolio JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  // ======================================
  // 1. Chart.js - Publisher Core Competencies
  // ======================================
  initCompetencyChart();

  // ======================================
  // 2. Dynamic Skills Rendering & Filtering
  // ======================================
  initSkillsFilter();

  // ======================================
  // 3. Smooth Scroll Navigation
  // ======================================
  initSmoothScroll();
});

/**
 * Initialize Competency Radar Chart
 */
function initCompetencyChart() {
  const ctx = document.getElementById('competencyChart').getContext('2d');
  new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['Semantic Markup', 'CSS Architecture (BEM)', 'Web Accessibility', 'Cross-Browsing', 'UI/UX Interaction'],
      datasets: [{
        label: 'Competency Level',
        data: [95, 90, 85, 95, 80],
        fill: true,
        backgroundColor: 'rgba(37, 99, 235, 0.2)',
        borderColor: 'rgb(37, 99, 235)',
        pointBackgroundColor: 'rgb(37, 99, 235)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(37, 99, 235)'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          angleLines: { color: '#E5E7EB' },
          grid: { color: '#E5E7EB' },
          pointLabels: {
            font: { size: 12, family: "'Noto Sans KR', sans-serif" },
            color: '#4B5563'
          },
          ticks: { display: false, max: 100, min: 0 }
        }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: function(context) {
              return context.formattedValue + '%';
            }
          }
        }
      }
    }
  });
}

/**
 * Initialize Skills Filter and Rendering
 */
function initSkillsFilter() {
  const skillsData = [
    { name: 'HTML5', category: 'core', level: 'Expert' },
    { name: 'CSS3 / CSS Animation', category: 'core', level: 'Expert' },
    { name: 'JavaScript (ES6+)', category: 'core', level: 'Advanced' },
    { name: 'Sass (SCSS)', category: 'arch', level: 'Advanced' },
    { name: 'BEM Methodology', category: 'arch', level: 'Expert' },
    { name: 'Tailwind CSS', category: 'arch', level: 'Intermediate' },
    { name: 'Web Accessibility (WAI-ARIA)', category: 'standard', level: 'Advanced' },
    { name: 'Cross-Browsing', category: 'standard', level: 'Expert' },
    { name: 'Responsive Web Design', category: 'standard', level: 'Expert' },
    { name: 'Git / SVN', category: 'tools', level: 'Advanced' },
    { name: 'Figma / Zeplin', category: 'tools', level: 'Advanced' },
    { name: 'jQuery', category: 'core', level: 'Advanced' }
  ];

  const skillsGrid = document.getElementById('skills-grid');
  const filterBtns = document.querySelectorAll('.skill-btn');

  function renderSkills(filter) {
    skillsGrid.innerHTML = '';
    const filteredSkills = filter === 'all' 
      ? skillsData 
      : skillsData.filter(skill => skill.category === filter || (filter === 'tools' && skill.category === 'tools'));

    filteredSkills.forEach(skill => {
      const el = document.createElement('div');
      let badgeColor = 'bg-gray-100 text-gray-700';
      
      if (skill.category === 'core') badgeColor = 'bg-blue-50 text-blue-700 border-blue-100';
      if (skill.category === 'arch') badgeColor = 'bg-pink-50 text-pink-700 border-pink-100';
      if (skill.category === 'standard') badgeColor = 'bg-green-50 text-green-700 border-green-100';

      el.className = `p-4 rounded-xl border ${badgeColor} shadow-sm flex items-center justify-between transition hover:scale-105`;
      el.innerHTML = `
        <span class="font-medium text-sm md:text-base">${skill.name}</span>
        <span class="text-xs opacity-75 bg-white bg-opacity-60 px-2 py-0.5 rounded">${skill.level}</span>
      `;
      skillsGrid.appendChild(el);
    });
  }

  // Initial Render
  renderSkills('all');

  // Event Listeners for Filters
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderSkills(btn.dataset.filter);
    });
  });
}

/**
 * Initialize Smooth Scroll Navigation
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
}
