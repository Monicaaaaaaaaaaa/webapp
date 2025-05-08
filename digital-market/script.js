
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const loginModal = document.getElementById('loginModal');
const signupModal = document.getElementById('signupModal');
const otpModal = document.getElementById('otpModal');
const showLoginModalFromSignup = document.getElementById('showLoginModalFromSignup');
const showSignupModalFromLogin = document.getElementById('showSignupModalFromLogin');
const showSignupModal = document.getElementById('showSignupModal');
const showSignupModalCta = document.getElementById('showSignupModalCta');
const filterBtns = document.querySelectorAll('.filter-btn');
const vendorCards = document.querySelectorAll('.vendor-card');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const dots = document.querySelectorAll('.dot');
const testimonialCards = document.querySelectorAll('.testimonial-card');
const userTypes = document.querySelectorAll('.user-type');
const vendorFields = document.querySelectorAll('.vendor-field');
const togglePasswordBtns = document.querySelectorAll('.toggle-password');
const otpInputs = document.querySelectorAll('.otp-input');
const resendOtpBtn = document.getElementById('resendOtp');
const otpTimerElement = document.getElementById('otpTimer');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && !e.target.closest('.navbar')) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

function openModal(modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}


if (showLoginModalFromSignup) {
    showLoginModalFromSignup.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal(signupModal);
        openModal(loginModal);
    });
}

if (showSignupModalFromLogin) {
    showSignupModalFromLogin.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal(loginModal);
        openModal(signupModal);
    });
}

if (showSignupModal) {
    showSignupModal.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(signupModal);
    });
}

if (showSignupModalCta) {
    showSignupModalCta.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(signupModal);
    });
}

document.querySelectorAll('.close-modal').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
        const modal = closeBtn.closest('.modal');
        closeModal(modal);
    });
});

document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
});

document.querySelector('.btn-login')?.addEventListener('click', (e) => {
    e.preventDefault();
    openModal(loginModal);
});

document.querySelector('.btn-signup')?.addEventListener('click', (e) => {
    e.preventDefault();
    openModal(signupModal);
});

if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            
            vendorCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

                    let currentSlide = 0;
                    
                    function showSlide(index) {
                        testimonialCards.forEach(card => {
                            card.style.display = 'none';
                        });
                        dots.forEach(dot => {
                            dot.classList.remove('active');
                        });
                        if (testimonialCards[index]) {
                            testimonialCards[index].style.display = 'block';
                            dots[index].classList.add('active');
                        }
                    }
                    
                    if (testimonialCards.length > 0) {
                        showSlide(currentSlide);
                        
                        nextBtn?.addEventListener('click', () => {
                            currentSlide = (currentSlide + 1) % testimonialCards.length;
                            showSlide(currentSlide);
                        });
                    
                        prevBtn?.addEventListener('click', () => {
                            currentSlide = (currentSlide - 1 + testimonialCards.length) % testimonialCards.length;
                            showSlide(currentSlide);
                        });
                        dots.forEach((dot, index) => {
                            dot.addEventListener('click', () => {
                                currentSlide = index;
                                showSlide(currentSlide);
                            });
                        });
                    }
                    if (userTypes.length > 0) {
                        userTypes.forEach(type => {
                            type.addEventListener('click', () => {
                                userTypes.forEach(t => t.classList.remove('active'));
                                type.classList.add('active');
                                if (type.dataset.type === 'vendor') {
                                    vendorFields.forEach(field => {
                                        field.style.display = 'block';
                                    });
                                } else {
                                    vendorFields.forEach(field => {
                                        field.style.display = 'none';
                                    });
                                }
                            });
                        });
                    }
                    if (togglePasswordBtns.length > 0) {
                        togglePasswordBtns.forEach(btn => {
                            btn.addEventListener('click', () => {
                                const passwordField = btn.previousElementSibling;
                                const icon = btn.querySelector('i');
                                
                                if (passwordField.type === 'password') {
                                    passwordField.type = 'text';
                                    icon.classList.remove('fa-eye');
                                    icon.classList.add('fa-eye-slash');
                                } else {
                                    passwordField.type = 'password';
                                    icon.classList.remove('fa-eye-slash');
                                    icon.classList.add('fa-eye');
                                }
                            });
                        });
                    }
                    if (otpInputs.length > 0) {
                        otpInputs.forEach((input, index) => {
                            input.addEventListener('input', () => {
                                if (input.value.length === 1) {
                                    if (index < otpInputs.length - 1) {
                                        otpInputs[index + 1].focus();
                                    } else {
                                        verifyOTP();
                                    }
                                }
                            });
                            input.addEventListener('keydown', (e) => {
                                if (e.key === 'Backspace' && input.value === '' && index > 0) {
                                    otpInputs[index - 1].focus();
                                }
                            });
                        });
                    }
                    function verifyOTP() {
                        let otp = '';
                        otpInputs.forEach(input => {
                            otp += input.value;
                        });
                        
                        if (otp.length === otpInputs.length) {
                            console.log('OTP entered:', otp);
                            document.getElementById('otpForm')?.addEventListener('submit', (e) => {
                                e.preventDefault();
                                closeModal(otpModal);
                            });
                        }
                    }
                    let otpTimer;
                    const otpTimerDuration = 60;
                    
                    function startOTPTimer() {
                        let timeLeft = otpTimerDuration;
                        otpTimerElement.textContent = `${timeLeft}s`;
                        resendOtpBtn.disabled = true;
                        
                        otpTimer = setInterval(() => {
                            timeLeft--;
                            otpTimerElement.textContent = `${timeLeft}s`;
                            
                            if (timeLeft <= 0) {
                                clearInterval(otpTimer);
                                resendOtpBtn.disabled = false;
                                otpTimerElement.textContent = '';
                            }
                        }, 1000);
                    }
                    if (resendOtpBtn) {
                        resendOtpBtn.addEventListener('click', () => {
                            console.log('Resending OTP...');
                            startOTPTimer();
                        });
                        document.getElementById('sendOtp')?.addEventListener('click', (e) => {
                            e.preventDefault();
                            closeModal(loginModal);
                            openModal(otpModal);
                            startOTPTimer();
                        });
                    }
                    document.querySelectorAll('form').forEach(form => {
                        form.addEventListener('submit', (e) => {
                            const requiredFields = form.querySelectorAll('[required]');
                            let isValid = true;
                            
                            requiredFields.forEach(field => {
                                if (!field.value.trim()) {
                                    isValid = false;
                                    field.classList.add('error');
                                } else {
                                    field.classList.remove('error');
                                }
                            });
                            
                            if (!isValid) {
                                e.preventDefault();
                            }
                        });
                    });
                    document.addEventListener("DOMContentLoaded", function() {
                        const sortDropdown = document.getElementById("sortOptions");
                        const vendorsGrid = document.querySelector(".vendors-grid");
                        const vendorCards = Array.from(document.querySelectorAll(".vendor-card"));
                    
                        sortDropdown.addEventListener("change", function() {
                            let sortedVendors = [...vendorCards];
                    
                            if (this.value === "rating") {
                                sortedVendors.sort((a, b) => {
                                    const ratingA = parseFloat(a.querySelector(".vendor-rating span").textContent);
                                    const ratingB = parseFloat(b.querySelector(".vendor-rating span").textContent);
                                    return ratingB - ratingA; 
                                });
                            } else if (this.value === "name") {
                                sortedVendors.sort((a, b) => {
                                    const nameA = a.querySelector("h3").textContent.toLowerCase();
                                    const nameB = b.querySelector("h3").textContent.toLowerCase();
                                    return nameA.localeCompare(nameB); 
                                });
                            }

                            vendorsGrid.innerHTML = "";
                            sortedVendors.forEach(vendor => vendorsGrid.appendChild(vendor));
                        });
                    });
                    document.addEventListener("DOMContentLoaded", function () {
                        const signupForm = document.getElementById("signupForm");
                        const businessRegistration = document.getElementById("business-registration");
                        const userTypeSelectors = document.querySelectorAll(".user-type");
                        let selectedUserType = "customer"; 
                        userTypeSelectors.forEach((selector) => {
                            selector.addEventListener("click", function () {
                                userTypeSelectors.forEach((el) => el.classList.remove("active"));
                                this.classList.add("active");
                                selectedUserType = this.getAttribute("data-type");
                                const vendorFields = document.querySelectorAll(".vendor-field");
                                vendorFields.forEach(field => {
                                    field.style.display = selectedUserType === "vendor" ? "block" : "none";
                                });
                            });
                        });
                        signupForm.addEventListener("submit", function (event) {
                            event.preventDefault(); 
                    
                            if (selectedUserType === "vendor") {
                                const vendorName = document.getElementById("signupName").value;
                                const vendorEmail = document.getElementById("signupEmail").value;
                                const vendorPhone = document.getElementById("signupPhone").value;
                    
                                localStorage.setItem("vendorLoggedIn", "true");
                                localStorage.setItem("vendorName", vendorName);
                                localStorage.setItem("vendorEmail", vendorEmail);
                                localStorage.setItem("vendorPhone", vendorPhone);
                    
                                document.getElementById("signupModal").style.display = "none";
                    
                                businessRegistration.style.display = "block";
                            }
                        });
                        document.getElementById("business-registration-form").addEventListener("submit", function (event) {
                            event.preventDefault();
                    
                            const businessName = document.getElementById("business-name").value;
                            const category = document.getElementById("category").value;
                            const businessDescription = document.getElementById("business-description").value;
                            const businessLogo = document.getElementById("business-logo").files[0];
                    
                            console.log("Business Registered:", businessName, category, businessDescription, businessLogo);
                    
                            alert("Business Registered Successfully!");
                            document.getElementById("business-registration-form").reset();
                        });
                    
                        if (localStorage.getItem("vendorLoggedIn") === "true") {
                            businessRegistration.style.display = "block";
                        }
                    });
                    // Consolidated JavaScript for Bowen Marketplace Animations
document.addEventListener('DOMContentLoaded', function() {
    // Function to check if element is in viewport
    function isInViewport(element) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
        rect.bottom >= 0
      );
    }
    
    // ===== Mission and Vision Card Animations =====
    function animateInfoCards() {
      const cards = document.querySelectorAll('.info-card');
      
      cards.forEach(card => {
        if (isInViewport(card) && !card.classList.contains('animated')) {
          card.classList.add('animated');
        }
      });
    }
    
    // Add hover effect for info card icons
    const cardIcons = document.querySelectorAll('.card-icon');
    
    cardIcons.forEach(icon => {
      icon.addEventListener('mouseenter', function() {
        const iconElement = this.querySelector('i');
        iconElement.style.transform = 'scale(1.2)';
        iconElement.style.transition = 'transform 0.3s ease';
      });
      
      icon.addEventListener('mouseleave', function() {
        const iconElement = this.querySelector('i');
        iconElement.style.transform = 'scale(1)';
      });
    });
    
    // ===== How It Works Section Animations =====
    // Animation for sections on scroll
    const animateOnScroll = () => {
      const elements = [
        ...document.querySelectorAll('.vision-card'),
        ...document.querySelectorAll('.step-card')
      ];
      
      elements.forEach((element, index) => {
        if (isInViewport(element) && !element.classList.contains('animated')) {
          setTimeout(() => {
            element.classList.add('animated');
          }, index * 150); // Staggered animation
        }
      });
    };
    
    // Enhance mission/vision icons with animation
    const enhanceIcons = () => {
      // Replace static icons with animated versions
      const missionIcon = document.querySelector('.mission-icon i');
      const visionIcon = document.querySelector('.vision-icon i');
      
      if (missionIcon) {
        missionIcon.className = 'fas fa-rocket';
        
        // Add subtle animation
        setInterval(() => {
          missionIcon.classList.add('fa-shake');
          setTimeout(() => {
            missionIcon.classList.remove('fa-shake');
          }, 1000);
        }, 5000);
      }
      
      if (visionIcon) {
        visionIcon.className = 'fas fa-lightbulb';
        
        // Add subtle animation
        setInterval(() => {
          visionIcon.classList.add('fa-pulse');
          setTimeout(() => {
            visionIcon.classList.remove('fa-pulse');
          }, 1000);
        }, 4000);
      }
    };
    
    enhanceIcons();
    
    // Add mouseover effects to step cards
    const stepCards = document.querySelectorAll('.step-card');
    stepCards.forEach(card => {
      card.addEventListener('mouseover', function() {
        const number = this.querySelector('.step-number');
        if (number) {
          number.style.transform = 'scale(1.1) rotate(10deg)';
          
          setTimeout(() => {
            number.style.transform = 'scale(1) rotate(0deg)';
          }, 300);
        }
      });
    });

    const animateNumbers = () => {
      const stepNumbers = document.querySelectorAll('.step-number');
      
      stepNumbers.forEach((number, index) => {
        const finalNumber = index + 1;
        let currentNumber = 0;
        const duration = 1500; // ms
        const interval = 100;
        const steps = duration / interval;
        const increment = finalNumber / steps;
        
        const counter = setInterval(() => {
          currentNumber += increment;
          if (currentNumber >= finalNumber) {
            currentNumber = finalNumber;
            clearInterval(counter);
          }
          number.textContent = Math.floor(currentNumber);
        }, interval);
      });
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains('steps-grid')) {
            animateNumbers();
          }
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    
    const stepsGrid = document.querySelector('.steps-grid');
    if (stepsGrid) {
      observer.observe(stepsGrid);
    }
    
    animateInfoCards();
    animateOnScroll();
    
    window.addEventListener('scroll', function() {
      animateInfoCards();
      animateOnScroll();
    });
  });
                    
                    document.addEventListener("DOMContentLoaded", function () {
                        gsap.from(".hero-content h1", { duration: 1, y: 50, opacity: 0, ease: "power3.out" });
                        gsap.from(".hero-content p", { duration: 1.2, y: 50, opacity: 0, ease: "power3.out", delay: 0.3 });
                        gsap.from(".hero-buttons", { duration: 1.4, y: 30, opacity: 0, ease: "power3.out", delay: 0.6 });
                    });
                    