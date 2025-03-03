class Calendar {
    constructor(container) {
        this.container = container;
        this.date = new Date();
        this.events = [
            { date: '2024-05-15', title: 'Market Analysis Workshop' },
            { date: '2024-05-22', title: 'Guest Speaker Series' },
            { date: '2024-06-01', title: 'Economic Policy Discussion' }
        ];
        this.render();
    }

    render() {
        const year = this.date.getFullYear();
        const month = this.date.getMonth();
        
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        
        let html = `
            <div class="calendar-header">
                <button class="btn btn-sm btn-outline-primary" onclick="calendar.previousMonth()">&lt;</button>
                <h3>${new Date(year, month).toLocaleString('default', { month: 'long' })} ${year}</h3>
                <button class="btn btn-sm btn-outline-primary" onclick="calendar.nextMonth()">&gt;</button>
            </div>
            <table class="table">
                <thead>
                    <tr>
                        ${['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
                            .map(day => `<th>${day}</th>`).join('')}
                    </tr>
                </thead>
                <tbody>
        `;

        let day = 1;
        let dateString = '';

        for (let i = 0; i < 6; i++) {
            html += '<tr>';
            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < firstDay.getDay()) {
                    html += '<td></td>';
                } else if (day > lastDay.getDate()) {
                    html += '<td></td>';
                } else {
                    dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                    const event = this.events.find(e => e.date === dateString);
                    
                    html += `<td class="${event ? 'has-event' : ''}" data-date="${dateString}">
                        ${day}
                        ${event ? `<div class="event-indicator" title="${event.title}"></div>` : ''}
                    </td>`;
                    day++;
                }
            }
            html += '</tr>';
            if (day > lastDay.getDate()) break;
        }

        html += '</tbody></table>';
        this.container.innerHTML = html;
    }

    previousMonth() {
        this.date.setMonth(this.date.getMonth() - 1);
        this.render();
    }

    nextMonth() {
        this.date.setMonth(this.date.getMonth() + 1);
        this.render();
    }
}

// Initialize calendar
document.addEventListener('DOMContentLoaded', function() {
    const calendarContainer = document.getElementById('calendar');
    if (calendarContainer) {
        window.calendar = new Calendar(calendarContainer);
    }
});
