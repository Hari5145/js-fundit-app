import reddit from "./redditapi";

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

searchForm.addEventListener("submit", e => {
	const searchTerm = searchInput.value;
	const sortBy = document.querySelector('[name="sortby"]:checked').value;

	const searchLimit = document.getElementById("limit").value;
	if (searchTerm == "") {
		showMessage("Please add a search term", "alert-danger");
	}
	if (searchTerm !== "") {
		showMessage("Congrats, successfully searched..", "alert-success");
	}

	searchInput.value = "";

	reddit.search(searchTerm, sortBy, searchLimit).then(results => {
		let output = '<div class="card-column">';

		results.forEach(post => {
			const image = post.preview
				? post.preview.images[0].source.url
				: "https://smirknewmedia.com/wp-content/uploads/2018/03/snoo.jpg";
			output += `
      <div class="card" >
  <img src="${image}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${post.title}</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="${post.url}" target="_blank" class="btn btn-primary">Read More...</a>
  </div>
</div>
      `;
		});
		output += "</div>";
		document.getElementById("results").innerHTML = output;
	});

	e.preventDefault();
});

function showMessage(message, className) {
	const div = document.createElement("div");
	div.className = `alert ${className} `;
	div.appendChild(document.createTextNode(message));
	const searchContainer = document.getElementById("search-container");
	const search = document.getElementById("search");
	searchContainer.insertBefore(div, search);

	setTimeout(() => document.querySelector(".alert").remove(), 2000);
}
