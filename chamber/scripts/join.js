document.getElementById('timestamp').value = new Date().toISOString();
        
        document.querySelectorAll('.modal-link').forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault();
                document.getElementById(this.dataset.modal).style.display = 'block';
            });
        });
        
        document.querySelectorAll('.close').forEach(btn => {
            btn.addEventListener('click', function() {
                this.parentElement.parentElement.style.display = 'none';
            });
        });