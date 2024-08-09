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

  if (document.querySelectorAll(".hero-popup-form-content").length > 0) {
    initpopupForm();
  }

  function initpopupForm() {
    var currentFormIndex = 0;
    var totalForms = document.querySelectorAll(".hero-popup-form-content").length;

    function showNextForm() {
      if (currentFormIndex < totalForms - 1) {
        var currentForm = document.querySelectorAll(".hero-popup-form-content")[currentFormIndex];
        var nextForm = document.querySelectorAll(".hero-popup-form-content")[currentFormIndex + 1];
        currentForm.style.display = "none";
        nextForm.style.display = "block";
        currentFormIndex++;
      } else if (currentFormIndex == totalForms - 1) {
        var currentForm = document.querySelectorAll(".hero-popup-form-content")[currentFormIndex];
        currentForm.style.display = "none";
        currentFormIndex = 0;
        var nextForm = document.querySelectorAll(".hero-popup-form-content")[0];
        nextForm.style.display = "block";
      }
    }
    function showPreviousForm() {
      if (currentFormIndex <= totalForms - 1) {
        var currentForm = document.querySelectorAll(".hero-popup-form-content")[currentFormIndex];
        var previousForm = document.querySelectorAll(".hero-popup-form-content")[currentFormIndex - 1];
        currentForm.style.display = "none";
        previousForm.style.display = "block";
        currentFormIndex--;
      }
    }
    document.querySelectorAll(".previous-question").forEach(function (button) {
      button.addEventListener("click", function (e) {
        showPreviousForm();
      });
    });

    document.querySelectorAll(".close-form").forEach(function (button) {
      button.addEventListener("click", function (e) {
        document.querySelector(".hero-popup-form").classList.add("hidden");
        document.body.classList.remove("overflow-hidden");
      });
    });

    document.querySelectorAll(".open-popup").forEach(function (button) {
      button.addEventListener("click", function (e) {
        document.querySelector(".hero-popup-form").classList.remove("hidden");
        document.body.classList.add("overflow-hidden");
      });
    });

    document.querySelectorAll(".nextHeroForm").forEach(function (button) {
      button.addEventListener("click", function (e) {
        e.preventDefault();
        var verifyform = false;
        var currentForm = document.querySelectorAll(".hero-popup-form-content")[currentFormIndex];
        // var formTitle = currentForm.querySelector(".form-question").textContent;

        if (currentForm.classList.contains("hero-pop-form-1")) {
          var step1 = this.querySelector(".form-option").textContent;
          showNextForm();
        } else if (currentForm.classList.contains("hero-pop-form-2")) {
          showNextForm();
        } else if (currentForm.classList.contains("hero-pop-form-3")) {
          var step3 = this.querySelector(".form-option").textContent;
          showNextForm();
        } else if (currentForm.classList.contains("hero-pop-form-4")) {
          var step4 = this.querySelector(".form-option").textContent;
          showNextForm();
        } else if (currentForm.classList.contains("hero-pop-form-5")) {
          var step5 = this.querySelector(".form-option").textContent;
          showNextForm();
        } else if (currentForm.classList.contains("hero-pop-form-6")) {
          var step6 = this.querySelector(".form-option").textContent;
          showNextForm();
        } else if (currentForm.classList.contains("hero-pop-form-7")) {
          var step7 = this.querySelector(".form-option").textContent;
          showNextForm();
        } else if (currentForm.classList.contains("hero-pop-form-8")) {
          var additionalInfo = " ";
          additionalInfo += document.querySelector(".additional-details").value.trim();
          formData["comments"] = additionalInfo;
          showNextForm();
        } else if (currentForm.classList.contains("hero-pop-form-9")) {
          var emailValidation = false;
          var fullnameValidation = false;
          var fullnameInput = document.querySelector(".verify-fullname");
          var emailInput = document.querySelector(".verify-email");
          var phoneValidation = false;
          var phoneInput = document.querySelector(".verify-phone");
          var termsValidation = false;
          var termsCheckboxInput = document.querySelector(".terms-and-privacy");

          if (fullnameInput.value.length > 0) {
            formData["fullname"] = document.querySelector(".verify-fullname").value.trim();
            fullnameValidation = true;
            document.querySelector(".fullname-error").style.display = "none";
          } else {
            fullnameInput.classList.add("invalid-input");
            document.querySelector(".fullname-error").style.display = "block";
          }

          if (emailInput.value.length > 0) {
            if (emailInput.checkValidity()) {
              formData["email"] = document.querySelector(".verify-email").value.trim();

              emailValidation = true;
              document.querySelector(".email-error").style.display = "none";
              document.querySelector(".error-check-valid").style.display = "none";
            } else {
              document.querySelector(".error-check-valid").style.display = "block";
              document.querySelector(".email-error").style.display = "none";
            }
          } else {
            document.querySelector(".email-error").style.display = "block";
            document.querySelector(".error-check-valid").style.display = "none";
          }

          if (phoneInput.value.length > 0) {
            formData["phone"] = document.querySelector(".verify-phone").value.trim();
            phoneValidation = true;
            document.querySelector(".phone-error").style.display = "none";
          } else {
            document.querySelector(".phone-error").style.display = "block";
          }

          if (emailValidation && fullnameValidation) {
            showNextForm();
            submitLead(formData, "form");
          }
        } else if (currentForm.classList.contains("hero-pop-form-10")) {
          document.querySelector(".hero-popup-form").classList.add("hidden");
          document.body.classList.add("overflow-hidden");
        }
      });
    });
  }
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
