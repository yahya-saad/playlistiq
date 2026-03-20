const calculatorData = () => ({
    rawUrls: localStorage.getItem('rawUrls') || '',
    speed: parseFloat(localStorage.getItem('speed')) || 1,
    range: JSON.parse(localStorage.getItem('range')) || { start: null, end: null },
    loading: false,
    results: null,
    error: null,
    errors: [],
    copied: false,
    toastMessage: '',

    init() {
        // Restore state from URL if present
        const params = new URLSearchParams(window.location.search);
        if (params.has('playlists')) {
            this.rawUrls = params.get('playlists').split(',').join('\n');
            this.speed = parseFloat(params.get('speed')) || this.speed;
            this.calculate();
        }

        // Sync with LocalStorage
        this.$watch('rawUrls', val => localStorage.setItem('rawUrls', val));
        this.$watch('speed', val => localStorage.setItem('speed', val));
        this.$watch('range', val => localStorage.setItem('range', JSON.stringify(val)), { deep: true });

        // Initialize Icons
        this.$nextTick(() => window.lucide?.createIcons());
    },

    async handlePaste(e) {
        e.preventDefault();
        const text = e.clipboardData.getData('text');
        const el = e.target;
        
        // Properly replace selection with pasted text
        const start = el.selectionStart;
        const end = el.selectionEnd;
        const currentVal = this.rawUrls;
        
        this.rawUrls = currentVal.substring(0, start) + text + currentVal.substring(end);
        
        const match = text.match(/[?&]list=([^#&?]+)/);
        if (match) {
            this.calculate();
        }
    },

    async calculate() {
        const urls = this.rawUrls.split('\n').filter(u => u.trim());
        if (!urls.length) return;

        this.loading = true;
        this.error = null;

        // Update URL parameters for shareability
        const cleanUrls = urls.map(u => {
            const m = u.match(/[?&]list=([^#&?]+)/);
            return m ? m[1] : u.trim();
        }).join(',');
        const shareUrl = `${window.location.origin}${window.location.pathname}?playlists=${encodeURIComponent(cleanUrls)}&speed=${this.speed}`;
        window.history.replaceState({}, '', shareUrl);

        try {
            const response = await fetch('/api/calculate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    urls,
                    speed: this.speed,
                    range: (this.range.start || this.range.end) ? this.range : null
                })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error);
            this.results = data;
            this.errors = data.errors || [];

            this.$nextTick(() => window.lucide?.createIcons());
        } catch (e) {
            this.error = e.message;
        } finally {
            this.loading = false;
        }
    },

    reset() {
        this.rawUrls = '';
        this.results = null;
        this.error = null;
        this.range = { start: null, end: null };
        window.history.replaceState({}, '', window.location.pathname);
        this.$nextTick(() => window.lucide?.createIcons());
    },

    formatSeconds(seconds) {
        if (seconds === undefined || seconds === null) return '0m';
        const s = parseFloat(seconds);
        if (isNaN(s)) return '0m';

        const hrs = Math.floor(s / 3600);
        const mins = Math.floor((s % 3600) / 60);
        return `${hrs > 0 ? hrs + 'h ' : ''}${mins}m`;
    },

    showToast(msg) {
        this.toastMessage = msg;
        this.copied = true;
        setTimeout(() => this.copied = false, 2000);
    },

    copyResults() {
        if (!this.results) return;
        let text = `PlaylistIQ – YouTube Playlist Results\n`;
        text += `------------------------\n`;
        text += `Total Duration: ${this.formatSeconds(this.results.totalSeconds)}\n`;
        text += `At ${this.speed}x Speed: ${this.formatSeconds(this.results.totalSeconds / this.speed)}\n`;
        text += `Total Videos: ${this.results.totalVideos}\n`;
        text += `Average Video Length: ${this.formatSeconds(this.results.averageDurationSeconds)}\n\n`;
        text += `Breakdown:\n`;
        this.results.playlists.forEach(p => {
            text += `- ${p.title} (${p.videoCount} videos): ${this.formatSeconds(p.durationSeconds)}\n`;
        });

        navigator.clipboard.writeText(text);
        this.showToast('Results copied to clipboard');
    },

    copyShareLink() {
        navigator.clipboard.writeText(window.location.href);
        this.showToast('Shareable link copied');
    },

    handleKeydown(e) {
        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
            this.calculate();
        }
    }
});

// Set global for Alpine
window.calculatorData = calculatorData;
