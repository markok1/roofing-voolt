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

  if ($(".hero-popup-form-content").length > 0) {
    initpopupForm();
  }

  function initpopupForm() {
    var currentFormIndex = 0;
    var totalForms = $(".hero-popup-form-content").length;

    function showNextForm() {
      if (currentFormIndex < totalForms - 1) {
        var $currentForm = $(".hero-popup-form-content").eq(currentFormIndex);
        var $nextForm = $(".hero-popup-form-content").eq(currentFormIndex + 1);
        $currentForm.hide();
        $nextForm.show();
        currentFormIndex++;
      } else if (currentFormIndex == totalForms - 1) {
        var $currentForm = $(".hero-popup-form-content").eq(currentFormIndex);
        $currentForm.hide();
        currentFormIndex = 0;
        var $nextForm = $(".hero-popup-form-content").eq(0);
        $nextForm.show();
      }
    }
    function showPreviousForm() {
      if (currentFormIndex <= totalForms - 1) {
        var $currentForm = $(".hero-popup-form-content").eq(currentFormIndex);
        var $previousForm = $(".hero-popup-form-content").eq(currentFormIndex - 1);
        $currentForm.hide();
        $previousForm.show();
        currentFormIndex--;
      }
    }
    $(".previous-question").on("click", function (e) {
      showPreviousForm();
    });

    $(".close-form").on("click", function (e) {
      $(".hero-popup-form").addClass("hidden");
      document.body.classList.remove("overflow-hidden");
    });
    $(".open-popup").on("click", function (e) {
      $(".hero-popup-form").removeClass("hidden");
      document.body.classList.add("overflow-hidden");
    });

    $(".nextHeroForm").on("click", function (e) {
      e.preventDefault();
      var verifyform = false;
      var $currentForm = $(".hero-popup-form-content").eq(currentFormIndex);
      var formTitle = $currentForm.find(".form-question").text();

      if ($currentForm.hasClass("hero-pop-form-1")) {
        var step1 = $(this).find(".form-option").text();
        showNextForm();
      } else if ($currentForm.hasClass("hero-pop-form-2")) {
        showNextForm();
      } else if ($currentForm.hasClass("hero-pop-form-3")) {
        var step3 = $(this).find(".form-option").text();
        showNextForm();
      } else if ($currentForm.hasClass("hero-pop-form-4")) {
        var step4 = $(this).find(".form-option").text();
        showNextForm();
      } else if ($currentForm.hasClass("hero-pop-form-5")) {
        var step5 = $(this).find(".form-option").text();
        showNextForm();
      } else if ($currentForm.hasClass("hero-pop-form-6")) {
        var step6 = $(this).find(".form-option").text();
        showNextForm();
      } else if ($currentForm.hasClass("hero-pop-form-7")) {
        var step7 = $(this).find(".form-option").text();
        showNextForm();
      } else if ($currentForm.hasClass("hero-pop-form-8")) {
        var additionalInfo = " ";
        additionalInfo += $(".additional-details").val().trim();
        formData["comments"] = additionalInfo;
        showNextForm();
      } else if ($currentForm.hasClass("hero-pop-form-9")) {
        var emailValidation = false;
        var fullnameValidation = false;
        var $fullnameInput = $(".verify-fullname");
        var $emailInput = $(".verify-email");
        var phoneValidation = false;
        var $phoneInput = $(".verify-phone");
        var termsValidation = false;
        var $termsCheckboxInput = $(".terms-and-privacy");

        if ($fullnameInput.val().length > 0) {
          formData["fullname"] = $(".verify-fullname").val().trim();
          fullnameValidation = true;
          $(".fullname-error").hide();
        } else {
          $fullnameInput.addClass("invalid-input");
          $(".fullname-error").show();
        }

        if ($emailInput.val().length > 0) {
          if ($emailInput[0].checkValidity()) {
            formData["email"] = $(".verify-email").val().trim();

            emailValidation = true;
            $(".email-error").hide();
            $(".error-check-valid").hide();
          } else {
            $(".error-check-valid").show();
            $(".email-error").hide();
          }
        } else {
          $(".email-error").show();
          $(".error-check-valid").hide();
        }

        if ($phoneInput.val().length > 0) {
          formData["phone"] = $(".verify-phone").val().trim();
          phoneValidation = true;
          $(".phone-error").hide();
        } else {
          $(".phone-error").show();
        }

        if (emailValidation && fullnameValidation) {
          showNextForm();
          submitLead(formData, "form");
        }
      } else if ($currentForm.hasClass("hero-pop-form-10")) {
        $(".hero-popup-form").addClass("hidden");
      }
    });
  }
});

function checkInput() {
  if ($(".map-input").val().trim() !== "") {
    $(".addressbtn").removeClass("hidden");
  } else {
    $(".addressbtn").addClass("hidden");
  }
}
$(".map-input").on("input", function () {
  checkInput();
});
