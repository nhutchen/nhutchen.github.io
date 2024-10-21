function filterData() {
  event.preventDefault();
  var startdate = document.getElementById("startdate").value;
  var enddate = document.getElementById("enddate").value;
  console.log(startdate);
  console.log(enddate);
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
          <td>${pitch.ReleaseSpeed || ''}</td>
          <td>${pitch.SpinRate || ''}</td>
          <td>${pitch.SpinAxis || ''}</td>
      `;
      tableBody.appendChild(row);
  });
}

// Fetch data on page load
fetchPitchData();