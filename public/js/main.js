(function ($) {
  let section = $("section.faq-js");
  if (section.length) {
    $(".qa-item").click(function (e) {
      e.preventDefault();
      if ($(this).hasClass("opened")) {
        $(this).removeClass("opened");
        $(this).find(".answer").slideUp(150);
      } else {
        $(".qa-item").removeClass("opened");
        $(".qa-item .answer").slideUp(150);
        $(this).addClass("opened");
        $(this).find(".answer").slideDown(150);
      }
    });
  }
})(jQuery);

// gallery widget
$(document).ready(function () {
  $(".slider").on("input change", function (e) {
    const sliderPos = e.target.value;
    const container = $(this).closest(".before-widget");

    // Update the width of the foreground image within the current container
    container.find(".foreground-img").css("width", `${sliderPos}%`);

    // Update the position of the slider button within the current container
    container.find(".slider-button").css("left", `calc(${sliderPos}% - 22px)`);
  });
});

// testimonial size adjustment so they are all the same height
$(document).ready(function () {
  //   testimonial slider
  $(".testimonial-holder").slick({
    centerMode: true,
    centerPadding: "130px",
    slidesToShow: 3,
    dots: true,
    arrows: true,
    prevArrow: "<button type='button' class='slick-prev pull-left '><svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M10.5878 14.4109L7.01031 10.8334H14.9986V9.16672H7.01031L10.5878 5.58922L9.40948 4.41089L3.82031 10.0001L9.40948 15.5892L10.5878 14.4109Z' fill='#111111' fill-opacity='0.64'/></svg></button>",
    nextArrow: "<button type='button' class='slick-next pull-right'><svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M9.41083 14.4109L10.5892 15.5892L16.1783 10.0001L10.5892 4.41089L9.41083 5.58922L12.9883 9.16672H5V10.8334H12.9883L9.41083 14.4109Z' fill='#111111' fill-opacity='0.64'/></svg></button>",
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          centerMode: true,
          centerPadding: "25px",
          slidesToShow: 1,
        },
      },
    ],
  });

  // Function to set the height of testimonials
  function setTestimonialHeight() {
    var maxHeight = 0;
    $(".testimonial").each(function () {
      maxHeight = Math.max(maxHeight, $(this).height());
    });
    $(".testimonial").height(maxHeight);
  }

  // Initial setup
  setTestimonialHeight();

  // Resize event handler
  $(window).resize(function () {
    setTestimonialHeight();
  });

  //gallery slider

  $(".single-slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: ".bottom-slider",
    prevArrow: "<button type='button' class='slick-prev pull-left'><svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M10.5878 14.4109L7.01031 10.8334H14.9986V9.16672H7.01031L10.5878 5.58922L9.40948 4.41089L3.82031 10.0001L9.40948 15.5892L10.5878 14.4109Z' fill='#111111' fill-opacity='0.64'/></svg></button>",
    nextArrow: "<button type='button' class='slick-next pull-right'><svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M9.41083 14.4109L10.5892 15.5892L16.1783 10.0001L10.5892 4.41089L9.41083 5.58922L12.9883 9.16672H5V10.8334H12.9883L9.41083 14.4109Z' fill='#111111' fill-opacity='0.64'/></svg></button>",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrows: true,
        },
      },
    ],
  });
  $(".bottom-slider").slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: ".single-slider",
    dots: false,
    arrows: true,
    prevArrow: "<button type='button' class='slick-prev pull-left '><svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M10.5878 14.4109L7.01031 10.8334H14.9986V9.16672H7.01031L10.5878 5.58922L9.40948 4.41089L3.82031 10.0001L9.40948 15.5892L10.5878 14.4109Z' fill='#111111' fill-opacity='0.64'/></svg></button>",
    nextArrow: "<button type='button' class='slick-next pull-right'><svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M9.41083 14.4109L10.5892 15.5892L16.1783 10.0001L10.5892 4.41089L9.41083 5.58922L12.9883 9.16672H5V10.8334H12.9883L9.41083 14.4109Z' fill='#111111' fill-opacity='0.64'/></svg></button>",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrows: false,
        },
      },
    ],
  });
});

// old form

document.addEventListener("DOMContentLoaded", function () {
  var leadID = null;
  let formData = {
    email: "",
    phone: "",
    comments: "",
  };
  let quoteForm = document.querySelector("section.discount3");

  var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
      sURLVariables = sPageURL.split("&"),
      sParameterName,
      i;

    for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split("=");

      if (sParameterName[0] === sParam) {
        return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
      }
    }
    return null;
  };

  const sendEvent = (eventName, props = {}, callback = () => {}) => {
    if (typeof eventName === "undefined" || !eventName) return callback();
    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: eventName,
        ...props,
      });
      setTimeout(() => {
        return callback();
      }, 250);
    } catch (err) {
      console.log(err);
    }
  };

  // Format phone
  document.querySelectorAll(".phone-js").forEach(function (input) {
    input.addEventListener("input", function () {
      var value = input.value.replace(/\D/g, ""); // Remove non-digits
      if (value.length > 10) value = value.substring(0, 10); // Limit to 10 digits

      if (value.length <= 3) input.value = value;
      else if (value.length <= 6) input.value = `(${value.substring(0, 3)}) ${value.substring(3)}`;
      else input.value = `(${value.substring(0, 3)}) ${value.substring(3, 6)}-${value.substring(6)}`;
    });
  });

  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  function splitCookieForGTM(gaCookie) {
    if (typeof gaCookie === "boolean") {
      return "";
    } else {
      let splitCookie = gaCookie.split(".");
      return `${splitCookie[2]}.${splitCookie[3]}`;
    }
  }

  function submitLead(data, type = "form") {
    var formDataObject = data;

    console.log("submit lead", data);

    formDataObject["hash"] = document.querySelector('input[name="hash"]').value;
    formDataObject["leadId"] = leadID;
    formDataObject["pathUrl"] = window.location.href;
    formDataObject["gclid"] = getUrlParameter("gclid");
    formDataObject["googleClientId"] = getCookie("_ga") ? splitCookieForGTM(getCookie("_ga")) : "";

    if (!formDataObject.fullName && formDataObject.email) {
      const email = formDataObject.email;
      const match = email.match(/^([^@]+)/);
      formDataObject["fullName"] = match ? match[1] : null;
    }

    document.querySelectorAll("button").forEach((button) => button.setAttribute("disabled", "disabled"));

    fetch("https://api.voolt.com/api/public/websitev2/1/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDataObject),
    })
      .then((response) => response.json())
      .then((response) => {
        document.querySelectorAll("button").forEach((button) => button.removeAttribute("disabled"));
        if (type === "form") {
          document.querySelector(".form-holder").classList.add("hide-form");
          document.querySelector(".quote-form--completed").classList.remove("hide-form");
          window._conv_q = window._conv_q || [];
          _conv_q.push(["triggerConversion", "100449874"]);
          sendEvent("submitLeadForm", { email: formDataObject["email"] });
        }

        if (type === "email-catcher") {
          document.querySelector(".get-a-quote-email").classList.add("hide-form");
          document.querySelector(".get-a-quote-message").classList.remove("hide-form");
          window._conv_q = window._conv_q || [];
          _conv_q.push(["triggerConversion", "100449874"]);
          sendEvent("submitEmailCatcher", { email: formDataObject["email"] });
        }
        if (type === "exit-intent-email-catcher") {
          document.querySelector(".exit-intent-success").style.display = "block";
          var delay = 1000;
          setTimeout(function () {
            document.querySelector(".show-exit-intent").style.display = "none";
            window._conv_q = window._conv_q || [];
            _conv_q.push(["triggerConversion", "100449874"]);
            sendEvent("submitEmailCatcher", { email: formDataObject["email"] });
          }, delay);
        }

        if (type === "comment-Hero") {
          window._conv_q = window._conv_q || [];
          _conv_q.push(["triggerConversion", "100449874"]);
          sendEvent("submitLeadForm", { email: formDataObject["email"] });
        }
        if (type === "comment") {
          document.querySelector(".get-a-quote-message").classList.add("hide-form");
          document.querySelector(".get-a-quote-thank-you").classList.remove("hide-form");
          window._conv_q = window._conv_q || [];
          _conv_q.push(["triggerConversion", "100449874"]);
          sendEvent("submitLeadForm", { email: formDataObject["email"] });
        }
        if (type === "form-js-not-popup") {
          document.querySelector(".get-a-quote-email").classList.add("hide-form");
          document.querySelector(".get-a-quote-thank-you").classList.remove("hide-form");
          window._conv_q = window._conv_q || [];
          _conv_q.push(["triggerConversion", "100449874"]);
          sendEvent("submitLeadForm", { email: formDataObject["email"] });
        }

        leadID = response.data.leadId;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  initForm("#topForm");
  initForm("#bottomForm");
  function initForm(formSelector) {
    var currentFormIndex = 0;
    var totalForms = document.querySelectorAll(formSelector + " .hero-form-content").length;
    var allInformation = "$$";

    function showNextForm() {
      if (currentFormIndex < totalForms - 1) {
        var currentForm = document.querySelectorAll(formSelector + " .hero-form-content")[currentFormIndex];
        var nextForm = document.querySelectorAll(formSelector + " .hero-form-content")[currentFormIndex + 1];
        currentForm.style.display = "none";
        nextForm.style.display = "block";

        currentFormIndex++;
      } else if ((currentFormIndex = totalForms - 1)) {
        var currentForm = document.querySelectorAll(formSelector + " .hero-form-content")[currentFormIndex];
        currentForm.style.display = "none";

        currentFormIndex = 0;
        var nextForm = document.querySelectorAll(formSelector + " .hero-form-content")[0];

        nextForm.style.display = "block";
      }
    }

    document.querySelectorAll(formSelector + " .nextHeroForm").forEach(function (button) {
      button.addEventListener("click", function (e) {
        e.preventDefault();

        var verifyform = false;
        var currentForm = document.querySelectorAll(formSelector + " .hero-form-content")[currentFormIndex];
        var formTitle = currentForm.querySelector("h5").textContent;
        var checkboxString = "";

        if (currentForm.classList.contains("hero-form-1")) {
          currentForm.querySelectorAll('.option-block .custom-checkbox input[type="checkbox"]').forEach(function (checkbox) {
            if (checkbox.checked) {
              var sibling = checkbox.closest(".custom-checkbox").querySelector(".input-text-span");
              // var checkedText = checkbox.nextElementSibling.textContent.trim();
              var checkedText = sibling.textContent.trim();
              checkboxString += checkedText + "\n";
              checkbox.checked = false;
              verifyform = true;
            } else {
              // checkbox.nextElementSibling.classList.add("invalid-input");
              var sibling = checkbox.closest(".custom-checkbox").querySelector(".checkbox-border");
              sibling.classList.add("invalid-input");
              document.querySelector(formSelector + " .hero-form-1 .error-msg").style.display = "block";
            }
          });

          if (verifyform) {
            document.querySelectorAll(formSelector + " .checkbox-border").forEach((el) => el.classList.remove("invalid-input"));
            document.querySelector(formSelector + " .hero-form-1 .error-msg").style.display = "none";
            allInformation += formTitle + "\n" + checkboxString;
            showNextForm();
          }
        } else if (currentForm.classList.contains("hero-form-2")) {
          currentForm.querySelectorAll('.option-block .custom-radio input[type="radio"]').forEach(function (radio) {
            if (radio.checked) {
              var sibling = radio.closest(".custom-radio").querySelector(".input-text-span");
              var checkedText = sibling.textContent.trim();
              allInformation += "\n" + formTitle + "\n" + checkedText + "\n";
              radio.checked = false;
              verifyform = true;
            } else {
              var sibling = radio.closest(".custom-radio").querySelector(".radio-border");
              sibling.classList.add("invalid-input");
              document.querySelector(formSelector + " .hero-form-2 .error-msg").style.display = "block";
            }
          });

          if (verifyform) {
            document.querySelectorAll(formSelector + " .radio-border").forEach((el) => el.classList.remove("invalid-input"));
            document.querySelector(formSelector + " .hero-form-2 .error-msg").style.display = "none";
            showNextForm();
          }
        } else if (currentForm.classList.contains("hero-form-3")) {
          var emailValidation = false;
          var fullnameValidation = false;
          var fullnameInput = document.querySelector(formSelector + " .verify-fullname");
          var emailInput = document.querySelector(formSelector + " .verify-email");

          if (fullnameInput.value.length > 0) {
            formData["fullname"] = document.querySelector(formSelector + " #fullname").value.trim();
            fullnameValidation = true;
            fullnameInput.classList.remove("invalid-input");
            document.querySelector(formSelector + " .fullname-error").style.display = "none";
          } else {
            fullnameInput.classList.add("invalid-input");
            document.querySelector(formSelector + " .fullname-error").style.display = "block";
          }

          if (emailInput.value.length > 0) {
            if (emailInput.checkValidity()) {
              formData["email"] = document.querySelector(formSelector + " #email").value.trim();
              formData["phone"] = document.querySelector(formSelector + " #phone").value.trim();
              var textarea = document.querySelector(formSelector + " #hero-text-area").value.trim();

              if (textarea) {
                allInformation = allInformation.replace("$$", "Message: \n" + textarea + "\n\n");
              }
              formData["comments"] = allInformation;
              emailValidation = true;
              document.querySelector(formSelector + " .email-error").style.display = "none";
              emailInput.classList.remove("invalid-input");
            } else {
              emailInput.classList.add("invalid-input");
              document.querySelector(formSelector + " .error-check-valid").style.display = "block";
              document.querySelector(formSelector + " .email-error").style.display = "none";
            }
          } else {
            emailInput.classList.add("invalid-input");
            document.querySelector(formSelector + " .email-error").style.display = "block";
          }

          if (emailValidation && fullnameValidation) {
            document.querySelector(formSelector + " .custom-textarea textarea").value = allInformation;
            showNextForm();
            resetForm(formSelector);
            submitLead(formData, "form");
          }
        }
      });
    });

    function resetForm(formSelector) {
      document.querySelectorAll(formSelector + " .hero-name, " + formSelector + " .hero-last, " + formSelector + " .options-inputs .input-box input").forEach((el) => (el.value = ""));
      document.querySelector(formSelector + " .custom-textarea textarea").value = "";
      document.querySelector(formSelector + " .verify-email").classList.remove("invalid-input");
      document.querySelector(formSelector + " .form-title").classList.add("hidden-element");
      document.querySelectorAll(formSelector + " .error-msg, " + formSelector + " .error-check-valid").forEach((el) => (el.style.display = "none"));

      if (window.innerWidth < 768) {
        document.querySelector(formSelector + " .hero-form-holder").classList.add("hidden-border");
      }
    }

    document.querySelectorAll(formSelector + " .get-another-quote").forEach(function (button) {
      button.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(formSelector + " .form-title").classList.remove("hidden-element");
        // document.querySelector(formSelector + " .hero-form-holder").classList.remove("hidden-border");
        // currentFormIndex = 0;
        showNextForm();
      });
    });
  }
});
