document.getElementById("contact-form").addEventListener("submit", async function (event) {
    event.preventDefault(); // מונע רענון של הדף

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    try {
        const response = await fetch("/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, message })
        });

        const result = await response.json();
        alert(result.message);     // הצגת הודעה למשתמש

        // ניקוי השדות אחרי שליחה מוצלחת
        document.getElementById("contact-form").reset();
    } catch (error) {
        console.error("❌ Error:", error);
        alert("Failed to send message. Please try again.");
    }
});
document.addEventListener("DOMContentLoaded", async function () {
    try {
        console.log("🔄 Fetching user info...");
        const response = await fetch("https://ariel-halevy-di5e.onrender.com/track");

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const userData = await response.json();
        console.log("✅ User data received:", userData);

        // 🕒 חישוב הזמן לפי אזור הזמן של המשתמש
        let userTime = "Unknown";
        if (userData.timezone) {
            try {
                userTime = new Intl.DateTimeFormat("en-GB", {
                    timeZone: userData.timezone,
                    dateStyle: "full",
                    timeStyle: "long"
                }).format(new Date());
            } catch (error) {
                console.error("❌ Failed to format user time:", error);
            }
        }

        // ⌨️ אפקט "כתיבה במסוף" להצגת הנתונים בצורה מרשימה
        const terminalText = `
==============================
🔎 SYSTEM MONITORING DASHBOARD
==============================

🌍 IP Address: ${userData.ip}
📍 Location: ${userData.location}
🖥️ Browser: ${userData.browser}
💻 Operating System: ${userData.os}
📱 Device: ${userData.device}
⏳ Local Time: ${userTime}
🔮 Insight: ${userData.insight}

==============================
✅ Data retrieved successfully
==============================
`;

        typeEffect(document.getElementById("user-info"), terminalText, 20);

    } catch (error) {
        console.error("❌ Error fetching user data:", error);
        document.getElementById("user-info").innerText = `Error loading user info: ${error.message}`;
    }
});

// ⌨️ פונקציה לאפקט הקלדה כמו במסוף
function typeEffect(element, text, speed) {
    let index = 0;
    element.innerText = ""; // מנקה את התוכן הקודם
    function type() {
        if (index < text.length) {
            element.innerText += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }
    type();
}
function showDetails(projectCard) {
    const details = projectCard.querySelector(".project-details");
    details.style.opacity = "1";
    details.style.transform = "translateY(0)";
}

function hideDetails(projectCard) {
    const details = projectCard.querySelector(".project-details");
    details.style.opacity = "0";
    details.style.transform = "translateY(20px)";
}
document.addEventListener("DOMContentLoaded", function () {
    const projectCards = document.querySelectorAll(".project-card");

    projectCards.forEach(card => {
        card.addEventListener("mouseover", function () {
            this.querySelector(".project-details").style.transform = "translateY(0)";
        });

        card.addEventListener("mouseleave", function () {
            this.querySelector(".project-details").style.transform = "translateY(100%)";
        });
    });
});
