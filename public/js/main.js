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

  function submitLead2(data, type = "form") {
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
          // document.querySelector(".form-holder").classList.add("hide-form");
          // document.querySelector(".quote-form--completed").classList.remove("hide-form");
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

  $(".submit-bottom-form").on("click", function (e) {
    e.preventDefault();
    var emailValidation = false;
    var fullnameValidation = false;
    var $fullnameInput = $(".verify-bottom-fullname");
    var $emailInput = $(".verify-bottom-email");
    var phoneValidation = false;
    var $phoneInput = $(".verify-bottom-phone");
    var textarea = $(".additional-bottom-details");

    if ($fullnameInput.val().length > 0) {
      formData["fullname"] = $(".verify-bottom-fullname").val().trim();
      fullnameValidation = true;
      $(".show-error-name").removeClass("error-border");
    } else {
      $(".show-error-name").addClass("error-border");
    }

    if ($emailInput.val().length > 0) {
      if ($emailInput[0].checkValidity()) {
        formData["email"] = $(".verify-bottom-email").val().trim();

        emailValidation = true;
        $(".show-error-email").removeClass("error-border");
      } else {
        $(".show-error-email").addClass("error-border");
      }
    } else {
      $(".show-error-email").addClass("error-border");
    }

    if ($phoneInput.val().length > 0) {
      formData["phone"] = $(".verify-bottom-phone").val().trim();
      phoneValidation = true;
      $(".show-error-phone").removeClass("error-border");
    } else {
      $(".show-error-phone").addClass("error-border");
    }
    if (textarea.val().length > 0) {
      var additionalInfo = " ";
      additionalInfo += $(".additional-bottom-details").val().trim();
      formData["comments"] = additionalInfo;
    }

    if (emailValidation && fullnameValidation && phoneValidation) {
      $(".discount-form-inputs").css("display", "none");
      $(".thank-you-bottom").removeClass("hidden");
      submitLead2(formData, "form");
    }
  });
});

function checkInput() {
  if (document.querySelector(".map-input").value.trim() !== "") {
    document.querySelector(".addressbtn").classList.remove("hidden");
  } else {
    document.querySelector(".addressbtn").classList.add("hidden");
  }
}
document.querySelector(".map-input").addEventListener("input", function () {
  checkInput();
});
