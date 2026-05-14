"use strict";

console.log("DEBUG: forms-ajax loaded", new Date().toISOString());

function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.className = "global-toast";
  toast.textContent = message;

  const bg = type === "error" ? "#dc2626" : "#f6c84c";
  const color = type === "error" ? "#fff" : "#222";

  toast.style.cssText = [
    "position:fixed",
    "top:20px",
    "left:50%",
    "transform:translateX(-50%)",
    `background:${bg}`,
    `color:${color}`,
    "padding:10px 16px",
    "border-radius:8px",
    "font-weight:700",
    "box-shadow:0 8px 30px rgba(0,0,0,0.18)",
    "z-index:10001",
    "opacity:1",
    "transition:all 220ms ease"
  ].join(";");

  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(-50%) translateY(-6px)";
    setTimeout(() => {
      if (toast && toast.parentNode) toast.parentNode.removeChild(toast);
    }, 240);
  }, 2200);
}

function showInlineMessage(form, message, type = "success") {
  if (!form) {
    showToast(message, type);
    return;
  }

  const existing = form.querySelector(".form-inline-message");
  if (existing) existing.remove();

  const msg = document.createElement("div");
  msg.className = "form-inline-message";
  msg.setAttribute("role", "status");
  msg.setAttribute("aria-live", "polite");
  msg.textContent = message;

  const bg = type === "error" ? "#dc2626" : "#f6c84c";
  const color = type === "error" ? "#fff" : "#222";

  msg.style.cssText = [
    "width:100%",
    "box-sizing:border-box",
    `background:${bg}`,
    `color:${color}`,
    "padding:14px 16px",
    "border-radius:8px",
    "font-weight:700",
    "margin-bottom:14px",
    "box-shadow:0 6px 18px rgba(0,0,0,0.12)",
    "text-align:center",
    "z-index:10000",
    "transition:all 220ms ease",
    "opacity:1",
    "transform:translateY(0)"
  ].join(";");

  form.insertBefore(msg, form.firstChild);

  setTimeout(() => {
    msg.style.opacity = "0";
    msg.style.transform = "translateY(-6px)";
    setTimeout(() => {
      if (msg && msg.parentNode) msg.parentNode.removeChild(msg);
    }, 240);
  }, 6000);
}

async function sendForm(form, formData) {
  const endpoint = form && form.action ? form.action : "";
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" }
    });

    let text = null;
    try { text = await res.text(); } catch (err) {}

    let json = null;
    try { json = text ? JSON.parse(text) : null; } catch (err) { json = null; }

    return { ok: res.ok, status: res.status, json, text };
  } catch (err) {
    console.error("sendForm network error", err);
    return { ok: false, status: 0, json: null, text: null, error: err };
  }
}

function initAjaxForm({ id, requiredFields, successMessage }) {
  const form = document.getElementById(id);
  if (!form) {
    console.warn(`initAjaxForm: no form with id "${id}" on the page`);
    return;
  }

  console.log(`initAjaxForm: attaching handler to #${id}`);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    showToast("Sending request…", "success");

    const formData = new FormData(form);

    const missing = requiredFields.filter((k) =>
      !((formData.get(k) || "").toString().trim().length > 0)
    );

    if (missing.length > 0) {
      showInlineMessage(form, "Please fill in all required fields.", "error");
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
    const originalBtnText = submitBtn && submitBtn.tagName === "BUTTON" ? submitBtn.textContent : null;
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.setAttribute("aria-busy", "true");
      if (submitBtn.tagName === "BUTTON") submitBtn.textContent = "Sending…";
    }

    const result = await sendForm(form, formData);
    console.log("RESULT:", result);

    if (result.ok) {
      showInlineMessage(form, successMessage, "success");
      form.reset();
      try { form.scrollIntoView({ behavior: "smooth", block: "center" }); } catch (err) {}
    } else {
      let msg = "Submission failed. Please try again.";
      if (result.json && result.json.error) msg = result.json.error;
      else if (result.status === 0) msg = "Network error. Please try again later.";
      else if (result.status >= 400 && result.status < 500) msg = `Submission rejected (${result.status}).`;
      showInlineMessage(form, msg, "error");
      console.warn("Form submit response", result.status, result.json || result.text);
    }

    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.removeAttribute("aria-busy");
      if (submitBtn.tagName === "BUTTON" && originalBtnText !== null) submitBtn.textContent = originalBtnText;
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("custom-order-form")) {
    initAjaxForm({
      id: "custom-order-form",
      requiredFields: [
        "fullname",
        "email",
        "phone",
        "occasion",
        "neededBy",
        "budget",
        "delivery",
        "consent"
      ],
      successMessage: "Thanks — your request was sent."
    });
  }

  if (document.getElementById("funeral-order-form")) {
    initAjaxForm({
      id: "funeral-order-form",
      requiredFields: [
        "fullname",
        "email",
        "phone",
        "arrangementType",
        "consent"
      ],
      successMessage: "Thanks — your funeral request was sent."
    });
  }
  if (document.getElementById("contact-form")) {
  initAjaxForm({
    id: "contact-form",
    requiredFields: ["name", "email", "message", "consent"],
    successMessage: "Thanks — your message was sent."
  });
}

});
