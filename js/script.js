/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing

//Global Variables
const studentList = document.getElementsByClassName('student-item cf');
const itemsPerPage = 10;
const page = document.querySelector('.page');
const header = document.querySelector('.page-header');

//DOM Elements for search bar
const div = document.createElement('div');
div.className = 'student-search';
const input = document.createElement('input');
input.type = 'text';
input.placeholder = 'Find a Student';
const button = document.createElement('button');
button.textContent = 'search';
header.appendChild(div);
div.appendChild(input);
div.appendChild(button);

//empty div to hold a 'no result' message if no student exists
const noResult = document.createElement('div');
page.appendChild(noResult);

  //empty array to hold search results
  const newList = [];


//function to hide all but the desired number of students per page
const showPage = (list, page) => {
   const startIndex = (page * itemsPerPage) - itemsPerPage;
   const endIndex = (page * 10) - 1;
   for (let i = 0; i < studentList.length; i += 1) {
      if (i >= startIndex && i <= endIndex) {
         list[i].style.display = 'block';
      } else {
         list[i].style.display = 'none';
      }
   }   
}

showPage(studentList, 1);

//function which creates the number of pages and anchor tags based on the list
const appendPageLinks = (list) => {
   //creates the div and determines number of pages needed
   const pages = Math.ceil(list.length / itemsPerPage);
   const div = document.createElement('div');
   div.className = 'pagination';
   page.appendChild(div);
   const ul = document.createElement('ul');
   div.appendChild(ul);

   //loop to create the list items and anchor tags for each 
   
   for (let i = 0; i < pages; i += 1) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.textContent = i + 1;
      a.href = '#';
      ul.appendChild(li);
      li.appendChild(a);
      const links = document.querySelectorAll("a");

   // loop to assign a class of active to the first index in the list   
      for (let i = 0; i < links.length; i += 1) {
         links[0].className = "active";
   
   // when the user clicks to the next page, it removes the active class from the current index and assigns it to the event (page) targeted.      
      ul.addEventListener('click', (e) => {
         links[i].classList.remove('active');
         e.target.className = 'active';

         showPage(studentList, e.target.textContent);
         });
      }
   }   
};

appendPageLinks(studentList);

// function to search the directory of students from the list based on the user input
const searchDir = (search, name) => {

   // set the noResult div to an empty string
   noResult.textContent = '';

   // loop to compare the names and search input
   for (let i = 0; i < name.length; i += 1){
      name[i].style.display = 'none';
      const searchInput = search.value.toLowerCase();
      const studentName = name[i].textContent.toLowerCase();

      //if the search matches a name - add it to the empty array
      if (searchInput !== 0 && studentName.includes(searchInput)) {
         name[i].style.display = '';
         newList.push(name[i]);
         newList.length = 0;
         
      } 
      if (searchInput == 0 && studentName == 0) {
         noResult.textContent = 'Sorry, no student found'; //not working :(
      }
   }
   appendPageLinks(newList);
   
};



button.addEventListener('click', (event) => {
   event.preventDefault();
   searchDir(input, studentList);   
});

/* submit listener */
input.addEventListener('keyup', () => {
   searchDir(input, studentList);
});