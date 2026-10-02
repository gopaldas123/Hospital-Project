document.addEventListener("DOMContentLoaded", function () {
  const forms = document.querySelectorAll("form");
  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const msg =
        form.dataset.success || "Your request has been submitted successfully.";
      alert(msg);
      form.reset();
    });
  });

  const appointmentForm = document.getElementById("appointmentForm");
  if (appointmentForm) {
    appointmentForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const appointment = {
        id: "APT" + Date.now(),
        patient: document.getElementById("patientName").value,
        doctor: document.getElementById("doctor").value,
        date: document.getElementById("date").value,
        time: document.getElementById("time").value,
        status: "Pending",
      };
      localStorage.setItem("hospitalAppointment", JSON.stringify(appointment));
      document.getElementById("appointmentResult").innerHTML =
        `<div class="alert alert-success mt-3">
                Appointment booked successfully! Your Appointment ID is <strong>${appointment.id}</strong>.
                </div>`;
      appointmentForm.reset();
    });
  }

  const statusForm = document.getElementById("statusForm");
  if (statusForm) {
    statusForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const id = document.getElementById("appointmentId").value.trim();
      const data = JSON.parse(
        localStorage.getItem("hospitalAppointment") || "null",
      );
      const box = document.getElementById("statusResult");
      if (data && data.id === id) {
        box.innerHTML = `<div class="alert alert-info">
                <h5>Appointment Found</h5>
                <p><strong>Patient:</strong> ${data.patient}</p>
                <p><strong>Doctor:</strong> ${data.doctor}</p>
                <p><strong>Date:</strong> ${data.date}</p>
                <p><strong>Time:</strong> ${data.time}</p>
                <p><strong>Status:</strong> <span class="badge bg-warning">${data.status}</span></p>
                </div>`;
      } else {
        box.innerHTML = `<div class="alert alert-danger">Appointment not found.</div>`;
      }
    });
  }

  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;
      if (email === "admin@lifecare.com" && password === "admin123") {
        window.location.href = "admin.html";
      } else {
        document.getElementById("loginMessage").innerHTML =
          `<div class="alert alert-danger">Invalid demo login. Use admin@lifecare.com / admin123</div>`;
      }
    });
  }

  const search = document.getElementById("doctorSearch");
  if (search) {
    search.addEventListener("input", function () {
      const q = this.value.toLowerCase();
      document.querySelectorAll(".doctor-item").forEach((card) => {
        card.style.display = card.innerText.toLowerCase().includes(q)
          ? ""
          : "none";
      });
    });
  }
});
