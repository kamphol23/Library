
const url ='https://www.forverkliga.se/JavaScript/api/crud.php';

$(document).ready(function() {
let soonGone = document.getElementById('checkId');
let theBooks = document.getElementById('bookName');
let theAuthor = document.getElementById('bookAuthor');
let oldId = document.getElementById('changeId');
let apiKey = document.getElementById('apiId');



$("#requestKey").click(event=> {
	$.ajax("https://www.forverkliga.se/JavaScript/api/crud.php?requestKey")
	.done(data => {
    	let objekt = JSON.parse(data);
		console.log('Nyckelens data' + objekt.key);
		$('#keyDisplay').text('your key : ' +objekt.key);
	});
});

$('#summitKey').click(event =>{

  modal.style.display = "none";


})

//Adding a book and sentdig a book title and a author name
$('#summitBook').click(event=>{
getBooks();
 const settings = {
   method: 'GET',
   data: {
	 op: 'insert',
	 key: apiKey.value,
	 title: theBooks.value,
     author: theAuthor.value
   }
};

 $.ajax(url, settings).done(data=>{
	console.log(data);
	let object = JSON.parse(data);

	console.log(object);
 });
	$('#dataStatus').text( object.status);

});


//The button for showing the books inside the list
$('#bokButton').click(event=>{
	amountOfErrors=0
	$('#dataStatus_2').text('');
	getBooks();

});




let amountOfErrors=0;
//writing out all the books that are inside the API---------->
function getBooks(numberOfTries=2){
	const settings = {
		method: 'GET',
		data: {
			op: 'select',
			key: apiKey.value
		}
	};


 	$.ajax(url, settings).done(data=>{
	  let object = JSON.parse(data);
		// let mess = object. message;
	  let bookList = object.data;
	  let apiStatus = object.status;
		console.log('getBooks den körs ', object);

		if(apiStatus == "error"){
			amountOfErrors ++;
		$('#dataStatus_2').text( 'Status : ' + apiStatus + ' | ' +' Amout of errors: ' + amountOfErrors);
			if(numberOfTries < 1)
				return;
			getBooks(numberOfTries - 1);

			return
		}


	console.log('statusen är :', apiStatus );

	$('#bokMod').html('<strong> modify </strong>');
	$('#bokHylla').html('<strong> Title </strong>');
	$('#bokNum').html('<strong> Delete </strong>');
	$('#bokAuthor').html('<strong> Author </strong>');








//loops through each list inside data--------->
console.log('är boooklist undefined?', bookList, object);
  bookList.forEach(book => {

// Make buttons for both delete and modify.
	let modify = $(`<br> <Button value="${book.id}"> modify </button>`);

	modify.click(function(){
	$('#changeId').append(` <button id='bookReplaceing' value='${book.id}'>Done</button> `);
	$('#changeId').append(` <input id='changeTitle' type='text' placeHolder='${book.title}'> `);
	$('#changeId').append(` <input id='changeAuthor' type='text' placeHolder='${book.author}'> `);

	let newBookAuthor = document.getElementById('changeAuthor');
	let newBookTitle = document.getElementById('changeTitle');

	$('#bookReplaceing').click(event =>{

			const settings = {
				method: 'GET',
				data: {
					op: 'update',
					key: apiKey.value,
					id: book.id ,
					title: newBookTitle.value ,
					author: newBookAuthor.value
				}
			};

			getBooks();
		 $.ajax(url, settings).done(data=>{
		 	let object = JSON.parse(data);
		 	console.log('Den nya boken' + object);
		document.getElementById('changeId').style.display = 'none';
		 });

		});

	})




		// Function for the delete Buttom
	let checkBox = $(` <br> <Button value="${book.id}"> Delete </button> `);
		checkBox.click(function(){
			const settings = {
			 method: 'GET',

			 data:{
				 op: 'delete',
				 key: apiKey.value,
				 id: book.id
			 }
			};




			$.ajax(url, settings).done(data =>{
			console.log('Delete button' + data);
			getBooks();
			});

			console.log(apiKey.value);
			console.log(book.id);
			console.log('Check box körs')
			// sendDeleteRequest(book.id);
		})
		$('#bokMod').append(modify);
		$('#bokNum').append(checkBox);
		$('#bokHylla').append(`<li> ${book.title}</li>`);
		$('#bokAuthor').append(`<li>${book.author}</li>`);



  })
 });
}











let modal = document.getElementById('myModal');
let btn = document.getElementById("myBtn");
let span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}


window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}



	});
