const locInput = document.getElementById("locationInput");
const dropdown = document.getElementById("locationDropdown");
const search = document.getElementById("locationSearch");
const searchBtn = document.getElementById("searchBtn");
const roomTypeInput = document.getElementById("roomType");

// ===== PREMIUM ROOM SEARCH =====

searchBtn.addEventListener(
  "click",
  ()=>{

    const selectedRoom =
      roomTypeInput.value
      .toLowerCase()
      .trim();

    const selectedLocation =
      locInput.value
      .toLowerCase()
      .trim();

    const rooms =
      document.querySelectorAll(
        ".room"
      );

    let found = false;

    rooms.forEach(room=>{

      const roomType =
        room.dataset.room
        .toLowerCase();

      const roomLocation =
        room.dataset.location
        .toLowerCase();

      const roomMatch =
        !selectedRoom ||
        roomType.includes(
          selectedRoom
        );

      const locationMatch =
        !selectedLocation ||
        roomLocation.includes(
          selectedLocation
        );

      if(
        roomMatch &&
        locationMatch
      ){

        room.style.display =
          "block";

        room.style.opacity = "0";

        setTimeout(()=>{

          room.style.opacity = "1";

        },150);

        found = true;

      }else{

        room.style.display =
          "none";

      }

    });

    // NO ROOM

    if(!found){

      showToast(
        "No matching rooms found",
        "warning"
      );

    }else{

      document
      .getElementById("rooms")
      .scrollIntoView({
        behavior:"smooth"
      });

      showToast(
        "Rooms filtered successfully"
      );

    }

    // RESET

    if(
      !selectedRoom &&
      !selectedLocation
    ){

      rooms.forEach(room=>{

        room.style.display =
          "block";

      });

    }

  }
);
  
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
// ===== GALLERY LIGHTBOX =====

const lightbox =
document.getElementById("lightbox");

const lightboxImg =
document.getElementById("lightboxImg");

const closeLightbox =
document.querySelector(".close-lightbox");

document
.querySelectorAll(".swiper-slide img")
.forEach(img=>{

  img.addEventListener(
    "click",
    ()=>{

      lightbox.classList.add("active");

      lightboxImg.src = img.src;

    }
  );

});

closeLightbox.addEventListener(
  "click",
  ()=>{

    lightbox.classList.remove("active");

  }
);

lightbox.addEventListener(
  "click",
  (e)=>{

    if(e.target === lightbox){

      lightbox.classList.remove(
        "active"
      );

    }

  }
);
// ===== SCROLL REVEAL =====

const reveals =
document.querySelectorAll(".reveal");

window.addEventListener(
  "scroll",
  revealSections
);

function revealSections(){

  const trigger =
    window.innerHeight * 0.85;

  reveals.forEach(section=>{

    const top =
      section.getBoundingClientRect().top;

    if(top < trigger){

      section.classList.add("active");

    }

  });

}

revealSections();


// ===== COUNTER =====

const counters =
document.querySelectorAll(".counter");

const speed = 200;

counters.forEach(counter=>{

  const updateCounter = ()=>{

    const target =
      +counter.dataset.target;

    const count =
      +counter.innerText;

    const increment =
      target / speed;

    if(count < target){

      counter.innerText =
        Math.ceil(count + increment);

      setTimeout(updateCounter,15);

    }else{

      counter.innerText = target;

    }

  };

  updateCounter();

});
function showToast(message,type="success"){

  const toastBox =
    document.getElementById("toastBox");

  const toast =
    document.createElement("div");

  toast.classList.add("toast",type);

  let icon =
    "fa-circle-check";

  if(type==="error"){
    icon="fa-circle-xmark";
  }

  if(type==="warning"){
    icon="fa-triangle-exclamation";
  }

  toast.innerHTML=`
    <i class="fas ${icon}"></i>
    ${message}
  `;

  toastBox.appendChild(toast);

  setTimeout(()=>{

    toast.style.opacity="0";

    toast.style.transform=
      "translateX(120px)";

    setTimeout(()=>{
      toast.remove();
    },400);

  },3000);

}
// ===== WISHLIST SYSTEM =====

const wishlistButtons =
document.querySelectorAll(
  ".wishlist-btn"
);

let savedWishlist =
JSON.parse(
  localStorage.getItem(
    "wishlistRooms"
  )
) || [];

wishlistButtons.forEach(btn=>{

  const roomName =
    btn.dataset.room;

  // PAGE LOAD

  if(
    savedWishlist.includes(
      roomName
    )
  ){

    btn.classList.add(
      "active"
    );

  }

  btn.addEventListener(
    "click",
    ()=>{

      btn.classList.toggle(
        "active"
      );

      if(
        btn.classList.contains(
          "active"
        )
      ){

        savedWishlist.push(
          roomName
        );

        showToast(
          `${roomName} added to wishlist`
        );

      }else{

        savedWishlist =
        savedWishlist.filter(
          item=>item!==roomName
        );

        showToast(
          `${roomName} removed from wishlist`,
          "warning"
        );

      }

      localStorage.setItem(
        "wishlistRooms",
        JSON.stringify(
          savedWishlist
        )
      );

    }
  );

});
// ===== REAL BOOKING VALIDATION =====

const bookingForm =
document.getElementById(
  "bookingForm"
);

if(bookingForm){

  bookingForm.addEventListener(
    "submit",
    (e)=>{

      e.preventDefault();

      const checkIn =
document.getElementById(
  "checkInDate"
).value;

const checkOut =
document.getElementById(
  "checkOutDate"
).value;

const guests =
document.getElementById(
  "bookingGuests"
).value;

const roomType =
document.getElementById(
  "bookingRoomType"
).value;
      const today =
      new Date()
      .toISOString()
      .split("T")[0];

      // EMPTY CHECK

      if(
        !checkIn ||
        !checkOut ||
        !guests ||
        !roomType ||
!bookingLocation.value
      ){

        showToast(
          "Please fill all booking details",
          "warning"
        );

        return;
      }

      // PAST DATE

      if(checkIn < today){

        showToast(
          "Check-in date cannot be in the past",
          "error"
        );

        return;
      }

      // CHECKOUT VALIDATION

      if(checkOut <= checkIn){

        showToast(
          "Check-out must be after check-in",
          "error"
        );

        return;
      }

      // GUEST VALIDATION

      if(guests < 1){

        showToast(
          "At least 1 guest required",
          "warning"
        );

        return;
      }

      // SAVE BOOKING

      const bookingData = {

        roomType,
        checkIn,
        checkOut,
        guests

      };

      let bookings =
      JSON.parse(
        localStorage.getItem(
          "hotelBookings"
        )
      ) || [];

      bookings.push(
        bookingData
      );

      localStorage.setItem(
        "hotelBookings",
        JSON.stringify(bookings)
      );

      // SUCCESS

      showToast(
        "Booking Successful!"
      );
// ===== INVOICE DATA =====

document.getElementById(
  "invoiceId"
).innerText =
  "RN" +
  Math.floor(
    Math.random()*100000
  );

document.getElementById(
  "invoiceName"
).innerText =
  document.getElementById(
    "bookingName"
  ).value;

document.getElementById(
  "invoiceRoom"
).innerText =
  roomType;

document.getElementById(
  "invoiceDate"
).innerText =
  checkIn;

let totalPrice = 0;
const checkInObj =
new Date(checkIn);

const checkOutObj =
new Date(checkOut);

const totalNights =
Math.ceil(
(checkOutObj - checkInObj)
/
(1000*60*60*24)
);

const subtotal =
totalPrice * totalNights;

const gst =
subtotal * 0.18;

const grandTotal =
subtotal + gst;
if(
  roomType.includes(
    "1500"
  )
){
  totalPrice = 1500;
}

else if(
  roomType.includes(
    "2500"
  )
){
  totalPrice = 2500;
}

else if(
  roomType.includes(
    "3500"
  )
){
  totalPrice = 3500;
}

else{
  totalPrice = 5000;
}

document.getElementById(
  "invoicePrice"
).innerText =
  totalPrice;
  document.getElementById(
  "invoiceNights"
).innerText =
  totalNights;

document.getElementById(
  "invoiceGST"
).innerText =
  gst.toFixed(0);

document.getElementById(
  "invoiceTotal"
).innerText =
  grandTotal.toFixed(0);
      // RESET FORM

      bookingForm.reset();

      // OPTIONAL POPUP

      const popup =
      document.getElementById(
        "bookingPopup"
      );

      if(popup){

        popup.classList.add(
          "active"
        );

      }

    }
  );

}
// ===== CUSTOM ROOM SELECT =====

const roomSelectBtn =
document.getElementById(
  "roomSelectBtn"
);

const roomOptions =
document.getElementById(
  "roomOptions"
);

const bookingRoomType =
document.getElementById(
  "bookingRoomType"
);

if(roomSelectBtn){

  roomSelectBtn.addEventListener(
    "click",
    ()=>{

      roomOptions.classList.toggle(
        "active"
      );

    }
  );

  roomOptions
  .querySelectorAll("div")
  .forEach(option=>{

    option.addEventListener(
      "click",
      ()=>{

        const value =
          option.dataset.value;

        bookingRoomType.value =
          value;

        roomSelectBtn.innerHTML =
          `${value} <span>▼</span>`;
          updateBookingSummary();

        roomOptions.classList.remove(
          "active"
        );

      }
    );

  });

}
// ===== CLOSE BOOKING POPUP =====

const closeInvoice =
document.getElementById(
  "closeInvoice"
);

const bookingPopup =
document.getElementById(
  "bookingPopup"
);

if(closeInvoice){

  closeInvoice.addEventListener(
    "click",
    ()=>{

      bookingPopup.classList.remove(
        "active"
      );

    }
  );

}
// ===== LOCATION SELECT =====

const locationSelectBtn =
document.getElementById(
  "locationSelectBtn"
);

const locationOptions =
document.getElementById(
  "locationOptions"
);

const bookingLocation =
document.getElementById(
  "bookingLocation"
);

if(locationSelectBtn){

  locationSelectBtn.addEventListener(
    "click",
    ()=>{

      locationOptions.classList.toggle(
        "active"
      );

    }
  );

  locationOptions
  .querySelectorAll("div")
  .forEach(option=>{

    option.addEventListener(
      "click",
      ()=>{

        const value =
          option.dataset.value;

        bookingLocation.value =
          value;

        locationSelectBtn.innerHTML =
          `${value} <span>▼</span>`;

        locationOptions.classList.remove(
          "active"
        );

      }
    );

  });

}
const bookingLocationSearch =
document.getElementById(
  "bookingLocationSearch"
);

if(bookingLocationSearch){

  bookingLocationSearch.addEventListener(
    "input",
    ()=>{

      const value =
      bookingLocationSearch.value
      .toLowerCase();

      locationOptions
      .querySelectorAll("div")
      .forEach(city=>{

        city.style.display =
        city.innerText
        .toLowerCase()
        .includes(value)
        ? "block"
        : "none";

      });

    }
  );

}
// ===== SHOW BOOKINGS =====

const bookingList =
document.getElementById(
  "bookingList"
);

function loadBookings(){

  if(!bookingList) return;

  let bookings =
  JSON.parse(
    localStorage.getItem(
      "hotelBookings"
    )
  ) || [];

  bookingList.innerHTML = "";

  // EMPTY

  if(bookings.length===0){

    bookingList.innerHTML = `
    
    <div class="empty-booking">

      <i class="fas fa-bed"></i>

      <h3>No Bookings Yet</h3>

      <p>
        Your booked rooms will appear here.
      </p>

      <a href="#real-booking"
      class="empty-booking-btn">

        Book Now

      </a>

    </div>
    
    `;

    return;
  }

  // BOOKINGS

  bookings.forEach(
    (booking,index)=>{

      bookingList.innerHTML += `
      
      <div class="booking-card">

        <h3>
          ${booking.roomType}
        </h3>

        <p>
          <strong>Check In:</strong>
          ${booking.checkIn}
        </p>

        <p>
          <strong>Check Out:</strong>
          ${booking.checkOut}
        </p>

        <p>
          <strong>Guests:</strong>
          ${booking.guests}
        </p>

        <div class="booking-status">
          Confirmed
        </div>

        <br>

        <button
        class="delete-booking-btn"
        onclick="deleteBooking(${index})">

          Cancel Booking

        </button>

      </div>
      
      `;

    }
  );

}

// ===== DELETE BOOKING =====

function deleteBooking(index){

  let bookings =
  JSON.parse(
    localStorage.getItem(
      "hotelBookings"
    )
  ) || [];

  bookings.splice(index,1);

  localStorage.setItem(
    "hotelBookings",
    JSON.stringify(bookings)
  );

  showToast(
    "Booking Removed",
    "warning"
  );

  loadBookings();

}

// LOAD

loadBookings();
// ===== CONTACT FORM =====

const contactForm =
document.getElementById(
  "contactForm"
);

if(contactForm){

  contactForm.addEventListener(
    "submit",
    (e)=>{

      e.preventDefault();

      const name =
      document.getElementById(
        "contactName"
      ).value.trim();

      const email =
      document.getElementById(
        "contactEmail"
      ).value.trim();

      const message =
      document.getElementById(
        "contactMessage"
      ).value.trim();

      // VALIDATION

      if(
        !name ||
        !email ||
        !message
      ){

        showToast(
          "Please fill all fields",
          "warning"
        );

        return;
      }

      // EMAIL CHECK

      if(
        !email.includes("@") ||
        !email.includes(".")
      ){

        showToast(
          "Enter valid email",
          "error"
        );

        return;
      }

      // SAVE MESSAGE

      const contactData = {

        name,
        email,
        message

      };

      let messages =
      JSON.parse(
        localStorage.getItem(
          "contactMessages"
        )
      ) || [];

      messages.push(
        contactData
      );

      localStorage.setItem(
        "contactMessages",
        JSON.stringify(messages)
      );

      // SUCCESS

      showToast(
        "Message Sent Successfully!"
      );

      // RESET

      contactForm.reset();

    }
  );

}
// ===== ROOM MODAL =====

const roomModal =
document.getElementById(
  "roomModal"
);

const modalTitle =
document.getElementById(
  "modalTitle"
);

const modalDesc =
document.getElementById(
  "modalDesc"
);

const modalPrice =
document.getElementById(
  "modalPrice"
);

const modalImg =
document.getElementById(
  "modalImage"
);

function openRoomModal(
  title,
  desc,
  price,
  image
){

  modalTitle.innerText =
    title;

  modalDesc.innerText =
    desc;

  modalPrice.innerText =
    price;

  modalImg.src =
    image;

  roomModal.classList.add(
    "active"
  );

  document.body.style.overflow =
    "hidden";

}

// CLOSE BUTTON

function closeRoomModal(){

  roomModal.classList.remove(
    "active"
  );

  document.body.style.overflow =
    "auto";

}

// OUTSIDE CLICK

roomModal.addEventListener(
  "click",
  (e)=>{

    if(
      e.target === roomModal
    ){

      closeRoomModal();

    }

  }
);

// ESC KEY

document.addEventListener(
  "keydown",
  (e)=>{

    if(
      e.key === "Escape"
    ){

      closeRoomModal();

    }

  }
);
// ===== AUTO ROOM BOOKING =====

function bookSelectedRoom(){

  const roomName =
    modalTitle.innerText;

  // AUTO SELECT ROOM

  bookingRoomType.value =
    roomName;

  roomSelectBtn.innerHTML =
    `${roomName} <span>▼</span>`;

  // SCROLL

  document
  .getElementById(
    "real-booking"
  )
  .scrollIntoView({
    behavior:"smooth"
  });

  // CLOSE MODAL

  closeRoomModal();

  // TOAST

  showToast(
    `${roomName} selected`
  );

}