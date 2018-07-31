(function(){
	const ham = document.querySelector('button.hamburger');
	ham.addEventListener('click', function(e){
		this.classList.toggle('is-active');
		const nav = document.querySelector('.nav');
		nav.classList.toggle('open');
		e.stopPropagation();
	})
})();