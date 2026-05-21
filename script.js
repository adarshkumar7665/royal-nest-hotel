const locInput = document.getElementById("locationInput");
const dropdown = document.getElementById("locationDropdown");
const search = document.getElementById("locationSearch");
const searchBtn = document.getElementById("searchBtn");
const roomTypeInput = document.getElementById("roomType");

searchBtn.addEventListener("click", () => {

  const selectedRoom =
    roomTypeInput.value.toLowerCase();

  const selectedLocation =
    locInput.value.toLowerCase();

  const rooms =
    document.querySelectorAll(".room");

  let found = false;

  rooms.forEach(room => {

    const roomType =
      room.dataset.room.toLowerCase();

    const roomLocation =
      room.dataset.location.toLowerCase();

    const roomMatch =
      !selectedRoom ||
      roomType.includes(selectedRoom);

    const locationMatch =
      !selectedLocation ||
      roomLocation.includes(selectedLocation);

    if (roomMatch && locationMatch) {

      room.style.display = "block";

      found = true;

    } else {

      room.style.display = "none";

    }

  });

  if (found) {

    document.getElementById("rooms")
      .scrollIntoView({
        behavior: "smooth"
      });

  } else {

    showToast(
      "No matching rooms found",
      "warning"
    );

  }

});

locInput.addEventListener("focus", () => {
  dropdown.style.display = "block";
});

locInput.addEventListener("click", () => {
  dropdown.style.display = "block";
});

dropdown.querySelectorAll(":scope > div").forEach(item => {

  item.addEventListener("click", () => {

    locInput.value = item.innerText;

    dropdown.style.display = "none";

  });

});

search.addEventListener("input", () => {

  const q = search.value.toLowerCase();

  dropdown.querySelectorAll(":scope > div")
    .forEach(d => {

      d.style.display =
        d.innerText.toLowerCase().includes(q)
          ? "block"
          : "none";

    });

});

document.addEventListener("click", (e) => {

  if (!e.target.closest(".location-box")) {

    dropdown.style.display = "none";

  }

});

const authBtn =
  document.getElementById("authBtn");

const userInfo =
  localStorage.getItem("loggedInUser");

let currentUser = null;

if (userInfo) {

  try {

    currentUser =
      JSON.parse(userInfo);

  } catch (e) {

    currentUser = null;

  }

}

if (currentUser) {

  authBtn.textContent = "Logout";

  authBtn.classList.add("logout");

  const nameTag =
    document.createElement("p");

  nameTag.textContent =
    currentUser.name || currentUser.email;

  nameTag.style.color = "#d4af37";

  nameTag.style.fontSize = "10px";

  nameTag.style.marginTop = "4px";

  authBtn.insertAdjacentElement(
    "afterend",
    nameTag
  );

  authBtn.addEventListener("click", () => {

    localStorage.removeItem(
      "loggedInUser"
    );

    window.location.href = "index.html";

  });

} else {

  authBtn.addEventListener("click", () => {

    window.location.href = "index.html";

  });

}

window.addEventListener("load", () => {

  setTimeout(() => {

    document.getElementById("loader")
      .classList.add("hide");

  }, 1800);

});

window.addEventListener("scroll", () => {

  const scrollTop =
    document.documentElement.scrollTop;

  const scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  const progress =
    (scrollTop / scrollHeight) * 100;

  document.getElementById("progressBar")
    .style.width = progress + "%";

});

new Swiper(".luxurySwiper", {

  loop: true,

  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

});
const menuToggle =
document.getElementById("menuToggle");

const closeMenu =
document.getElementById("closeMenu");

const navLinks =
document.getElementById("nav-links");

if(menuToggle && closeMenu && navLinks){

  menuToggle.addEventListener(
    "click",
    ()=>{

      navLinks.classList.add(
        "active"
      );

      closeMenu.classList.add(
        "show"
      );

      document.body.classList.add(
        "menu-open"
      );

    }
  );

  closeMenu.addEventListener(
    "click",
    ()=>{

      navLinks.classList.remove(
        "active"
      );

      closeMenu.classList.remove(
        "show"
      );

      document.body.classList.remove(
        "menu-open"
      );

    }
  );

  document
  .querySelectorAll("#nav-links a")
  .forEach(link=>{

    link.addEventListener(
      "click",
      ()=>{

        navLinks.classList.remove(
          "active"
        );

        closeMenu.classList.remove(
          "show"
        );

        document.body.classList.remove(
          "menu-open"
        );

      }
    );

  });

}