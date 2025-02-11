const bt = document.getElementById('battery');  
function updateBatteryStatus(battery) {  
  bt.innerHTML = `${Math.floor(battery.level * 100)}%`; 
  if (battery.charging) {    
    bt.innerHTML += ' (Its in 👀)';  
  }    }  
function batteryUpdate() {   
  navigator.getBattery().then(battery => {     
    updateBatteryStatus(battery);    
    battery.addEventListener('levelchange', () => updateBatteryStatus(battery));      
    battery.addEventListener('chargingchange', () => updateBatteryStatus(battery));    
  });   
}    
document.addEventListener('DOMContentLoaded', batteryUpdate);
