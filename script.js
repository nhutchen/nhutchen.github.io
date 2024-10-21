function filterData(event) {
  event.preventDefault();
  
  const startdate = new Date(document.getElementById("startdate").value);
  const enddate = new Date(document.getElementById("enddate").value);
  const tableRows = document.querySelectorAll('#pitchTable tbody tr');

  tableRows.forEach(row => {
      const dateCell = row.cells[1].innerText; // Assuming the second cell contains the date
      const rowDate = new Date(dateCell);

      if (rowDate >= startdate && rowDate <= enddate) {
          row.style.display = ''; // Show the row
      } else {
          row.style.display = 'none'; // Hide the row
      }
  });
}


async function fetchPitchData() {
  try {
      const response = await fetch('https://compute.samford.edu/zohauth/clients/datajson/1');
      const data = await response.json();
      populateTable(data);
  } catch (error) {
      console.error('Error fetching data:', error);
  }
}

function populateTable(data) {
  const tableBody = document.querySelector('#pitchTable tbody');
  tableBody.innerHTML = ''; // Clear existing data

  data.forEach(pitch => {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td><a href="details.html?id=${pitch.PitchNo}">Pitch ${pitch.PitchNo}</a></td>
          <td>${pitch.Date}</td>
          <td>${pitch.Time}</td>
          <td>${pitch.Batter}</td>
          <td>${pitch.Balls}</td>
          <td>${pitch.Strikes}</td>
          <td>${pitch.Outs}</td>
          <td>${pitch.PitchCall}</td>
          <td>${pitch.KorBB || ''}</td>
          <td>${pitch.RelSpeed || ''}</td>
          <td>${pitch.SpinRate || ''}</td>
          <td>${pitch.SpinAxis || ''}</td>
      `;
      tableBody.appendChild(row);
  });
}

// Fetch data on page load
fetchPitchData();