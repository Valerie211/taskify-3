export const formattedDate = (timestamp)=>{
   
const date = new Date(timestamp);

// Array of month names
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// Get the month, day, and year from the date object
const month = months[date.getMonth()];
const day = date.getDate();
const year = date.getFullYear();

// Pad the day with leading zeros if needed
const paddedDay = day < 10 ? `0${day}` : day;

// Form the final date string in the desired format
const formattedDate = `${month} ${paddedDay}, ${year}`;

console.log(formattedDate); // Output: March 23, 2024
return formattedDate;
}
