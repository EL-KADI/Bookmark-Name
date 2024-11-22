var siteName = document.getElementById("Bookmarke Name");
var siteUrl = document.getElementById("Bookmarke Web");
var siteInf = [];

if (localStorage.getItem("siteInfSave") != null) {
  siteInf = JSON.parse(localStorage.getItem("siteInfSave"));
  display();
  clearForm();
}

function openModal() {
  document.getElementById("errorModal").style.display = "block";
}

function closeModal() {
  document.getElementById("errorModal").style.display = "none";
}

function siteInfo() {
  var name = siteName.value;
  var url = siteUrl.value;

  if (name.length < 3 || !isValidURL(url)) {
    openModal();
    return;
  }
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "http://" + url;
  }

  var site = {
    name: name,
    url: url,
  };

  siteInf.push(site);

  localStorage.setItem("siteInfSave", JSON.stringify(siteInf));

  display();
  clearForm();
}

function isValidURL(url) {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?([\\da-z.-]+)\\.([a-z.]{2,6})([\\w/-]*)*\\/?.*$",
    "i"
  );
  return pattern.test(url);
}

function display() {
  var x = ``;

  for (var i = 0; i < siteInf.length; i += 1) {
    x += `  
      <div class="col-3 pt-4">
        <div class="inner d-flex justify-content-center align-content-center bg-white">
          <h6 class="e-f-o mt-auto mb-auto custom-m">${i + 1}</h6>
        </div>
      </div>
      <div class="col-3 pt-4">
        <div class="inner d-flex justify-content-center align-content-center bg-white">
          <h6 class="e-f-o mt-auto mb-auto text-center custom-m">
            ${siteInf[i].name}
          </h6>
        </div>
      </div>
      <div class="col-3 pt-4">
        <div class="inner d-flex justify-content-center align-content-center bg-white">
          <a href="${siteInf[i].url}" target="_blank">
            <button type="button" class="btn btn-info btn-submit mt-auto mb-auto">
              <i class="fa-solid fa-eye pe-2"></i>Visit
            </button>
          </a>
        </div>
      </div>
      <div class="col-3 pt-4">
        <div class="inner d-flex justify-content-center align-content-center bg-white">
          <button type="button" class="btn btn-success btn-submit mt-auto mb-auto" onclick="deleteCont(${i})">
            <i class="fa-solid fa-trash-can pe-sm-2"></i>Delete
          </button>
        </div>
      </div>`;
  }

  document.getElementById("rowData").innerHTML = x;
}

function deleteCont(index) {
  siteInf.splice(index, 1);
  display();
  localStorage.setItem("siteInfSave", JSON.stringify(siteInf));
}
function validateInput() {
  input = document.getElementById("Bookmarke Web");
  value = input.value;

  if (value === "") {
    input.classList.remove("valid", "invalid");
  } else {
    regex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\/[^\s]*)?$/;

    if (regex.test(value)) {
      input.classList.add("valid");
      input.classList.remove("invalid");
    } else {
      input.classList.add("invalid");
      input.classList.remove("valid");
    }
  }
}
function validateInputOne() {
  input = document.getElementById("Bookmarke Name");
  value = input.value;

  if (value === "") {
    input.classList.remove("valid", "invalid");
  } else {
    regex = /^[a-zA-Z0-9]{3}/;

    if (regex.test(value)) {
      input.classList.add("valid");
      input.classList.remove("invalid");
    } else {
      input.classList.add("invalid");
      input.classList.remove("valid");
    }
  }
}
function clearForm() {
  siteName.value = "";
  siteUrl.value = "";
  siteName.classList.remove("valid");
  siteUrl.classList.remove("valid");
}
