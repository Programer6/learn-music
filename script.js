

   let slideIndex = 1;

   // Check if the slideshow actually exists on this page before running
   if (document.getElementsByClassName("mySlides").length > 0) {
       showSlides(slideIndex);
   }
   
   function plusSlides(n) {
     showSlides(slideIndex += n);
   }
   
   function currentSlide(n) {
     showSlides(slideIndex = n);
   }
   
   function showSlides(n) {
     let i;
     let slides = document.getElementsByClassName("mySlides");
     let dots = document.getElementsByClassName("dot-slide");
     
     // Safety check: if no slides, stop here
     if (slides.length === 0) return;
   
     if (n > slides.length) {slideIndex = 1}    
     if (n < 1) {slideIndex = slides.length}
     
     for (i = 0; i < slides.length; i++) {
       slides[i].style.display = "none";  
     }
     for (i = 0; i < dots.length; i++) {
       dots[i].className = dots[i].className.replace(" active", "");
     }
     
     slides[slideIndex-1].style.display = "block";  
     dots[slideIndex-1].className += " active";
   }
   
   

   
   const quotes = [
       "Practice makes progress, not perfection!",
       "Every pro was once a beginner who didn't quit.",
       "Don't practice until you get it right. Practice until you can't get it wrong.",
       "Music is a language that the soul speaks.",
       "Small steps every day lead to big results!",
       "You are doing great! Keep the streak alive!",
       "Focus on the process, the results will follow."
   ];
   
   const motivateBtn = document.getElementById('motivate-btn');
   const motivateText = document.getElementById('motivation-text');
   
   // Only run this if the button exists on the current page
   if (motivateBtn) {
       motivateBtn.addEventListener('click', function() {
           console.log("Button Clicked!"); 
   
           const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
           
           motivateText.innerText = `"${randomQuote}"`;
           
           motivateText.style.animation = 'none';
           motivateText.offsetHeight; 
           motivateText.style.animation = 'fadeIn 0.5s ease-in-out';
       });
   }

const acc = document.getElementsByClassName("accordion-btn");
let j;

for (j = 0; j < acc.length; j++) {
  acc[j].addEventListener("click", function() {
    this.classList.toggle("active");

    const panel = this.nextElementSibling;
    const icon = this.querySelector('.icon');

    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
      icon.innerText = "+";
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
      icon.innerText = "-";
    } 
  });
}